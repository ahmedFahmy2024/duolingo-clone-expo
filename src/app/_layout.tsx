import "../../global.css";

import { ClerkProvider, useUser, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack } from "expo-router";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { PostHogProvider } from "posthog-react-native";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const postHogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const postHogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST;
const streamApiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

// ─── StreamVideo wrapper — only mounts client when Clerk user is ready ────────

function StreamVideoWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const userId = user.id;
    const userName =
      user.fullName ??
      user.primaryEmailAddress?.emailAddress ??
      userId;

    // Token provider used by every call this user joins. The lesson screen
    // posts the full lesson payload to /api/stream-token before starting the
    // call so the agent has the lesson context; here we just need a valid
    // token so the SDK can authenticate the connection up-front.
    const tokenProvider = async (): Promise<string> => {
      const res = await fetch("/api/stream-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userName, lessonId: "__auth__", languageCode: "en" }),
      });
      const data = (await res.json()) as { token: string };
      return data.token;
    };

    let active = true;
    // Use getOrCreateInstance so the same client is shared with every hook
    // (StreamVideo provider + useStreamCall must agree on a single client,
    // otherwise the audio mixer mounts on the wrong instance).
    const client = StreamVideoClient.getOrCreateInstance({
      apiKey: streamApiKey,
      user: { id: userId, name: userName },
      tokenProvider,
    });

    Promise.resolve().then(() => {
      if (active) setVideoClient(client);
    });

    return () => {
      active = false;
      // Don't disconnect here on unmount — the singleton is reused across
      // route transitions and disconnecting kills in-flight calls.
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isLoaded]);

  if (!videoClient) {
    return <>{children}</>;
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}

// ─── AppInitializer component ──────────────────────────────────────────────

function AppInitializer({
  children,
  fontsLoaded,
  fontError,
}: {
  children: React.ReactNode;
  fontsLoaded: boolean;
  fontError: Error | null;
}) {
  const { isLoaded: clerkLoaded } = useAuth();
  const langHydrated = useLanguageStore((s) => s._hasHydrated);
  const progHydrated = useProgressStore((s) => s._hasHydrated);

  const isReady = fontsLoaded && clerkLoaded && langHydrated && progHydrated;

  useEffect(() => {
    if (isReady || fontError) {
      SplashScreen.hideAsync();
    }
  }, [isReady, fontError]);

  if (!isReady && !fontError) {
    return null;
  }

  return <>{children}</>;
}

// ─── Root layout ─────────────────────────────────────────────────────────────

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!postHogKey) {
    console.warn("EXPO_PUBLIC_POSTHOG_KEY is not set — PostHog analytics disabled.");
  }

  return (
    <PostHogProvider
      apiKey={postHogKey ?? ""}
      options={postHogHost ? { host: postHogHost } : undefined}
    >
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <AppInitializer fontsLoaded={fontsLoaded} fontError={fontError}>
          <StreamVideoWrapper>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }} />
          </StreamVideoWrapper>
        </AppInitializer>
      </ClerkProvider>
    </PostHogProvider>
  );
}
