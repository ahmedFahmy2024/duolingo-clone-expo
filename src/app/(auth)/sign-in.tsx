import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { colors } from "@/theme";
import { useSignIn, useSSO } from "@clerk/expo";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const isLoading = fetchStatus === "fetching";

  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => { void WebBrowser.coolDownAsync(); };
  }, []);

  async function handleSignIn() {
    if (!email.trim()) return;
    setVerifyError("");
    const { error: createError } = await signIn.create({ identifier: email.trim() });
    if (createError) {
      setVerifyError(createError.longMessage ?? createError.message);
      return;
    }
    const { error: sendError } = await signIn.emailCode.sendCode();
    if (sendError) {
      setVerifyError(sendError.longMessage ?? sendError.message);
      return;
    }
    setModalVisible(true);
  }

  async function handleVerify(code: string) {
    setVerifyError("");
    const { error: verifyError } = await signIn.emailCode.verifyCode({ code });
    if (verifyError) {
      setVerifyError(verifyError.longMessage ?? verifyError.message);
      return;
    }
    const { error: finalizeError } = await signIn.finalize();
    if (finalizeError) {
      setVerifyError(finalizeError.longMessage ?? finalizeError.message);
      return;
    }
    setModalVisible(false);
    router.replace("/");
  }

  async function handleResend() {
    setVerifyError("");
    const { error } = await signIn.emailCode.sendCode();
    if (error) setVerifyError(error.longMessage ?? error.message);
  }

  async function handleSSO(strategy: "oauth_google" | "oauth_apple") {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri({ scheme: "dulaingo", path: "oauth-callback" }),
      });
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err: unknown) {
      setVerifyError(getClerkError(err));
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="mt-2 mb-6 w-9 h-9 justify-center"
        >
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Headline */}
        <Text
          className="text-[28px] mb-1.5"
          style={{ fontFamily: "Poppins-Bold", color: colors.textPrimary }}
        >
          Welcome back
        </Text>
        <Text
          className="text-sm mb-1"
          style={{ fontFamily: "Poppins-Regular", color: colors.textSecondary }}
        >
          Sign in to continue learning ✨
        </Text>

        {/* Mascot */}
        <View className="items-center my-5">
          <Image source={images.mascotAuth} className="w-36 h-36" resizeMode="contain" />
        </View>

        {/* Email field */}
        <View className="gap-1.5">
          <Text
            className="text-[13px] mb-1"
            style={{ fontFamily: "Poppins-Medium", color: colors.textSecondary }}
          >
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="alex@gmail.com"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            style={{
              borderWidth: 1.5,
              borderColor: emailFocused ? colors.linguaPurple : colors.border,
              borderRadius: 12,
              paddingVertical: 14,
              paddingHorizontal: 16,
              fontSize: 14,
              fontFamily: "Poppins-Regular",
              color: colors.textPrimary,
              backgroundColor: colors.background,
            }}
          />
        </View>

        {/* Inline error (before modal opens) */}
        {verifyError && !modalVisible ? (
          <Text
            className="text-sm mt-2"
            style={{ fontFamily: "Poppins-Regular", color: colors.error }}
          >
            {verifyError}
          </Text>
        ) : null}

        {/* Log In button */}
        <TouchableOpacity
          className="btn btn--primary mt-6"
          activeOpacity={0.85}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          <Text className="btn__label text-white">{isLoading ? "Sending…" : "Log In"}</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-5 gap-3">
          <View className="flex-1 h-px bg-border" />
          <Text
            className="text-[13px]"
            style={{ fontFamily: "Poppins-Regular", color: colors.textSecondary }}
          >
            or continue with
          </Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        {/* Social buttons */}
        <SocialButton
          label="Continue with Google"
          icon={<FontAwesome name="google" size={20} color="#EA4335" />}
          onPress={() => handleSSO("oauth_google")}
        />
        <SocialButton
          label="Continue with Apple"
          icon={<FontAwesome name="apple" size={20} color={colors.textPrimary} />}
          onPress={() => handleSSO("oauth_apple")}
        />

        {/* Footer */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-up" as never)}
          activeOpacity={0.7}
          className="mt-2"
        >
          <Text
            className="text-sm text-center"
            style={{ fontFamily: "Poppins-Regular", color: colors.textSecondary }}
          >
            Don&apos;t have an account?{" "}
            <Text style={{ fontFamily: "Poppins-SemiBold", color: colors.linguaPurple }}>
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <VerificationModal
        visible={modalVisible}
        email={email}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerify}
        onResend={handleResend}
        error={verifyError}
      />
    </SafeAreaView>
  );
}

function SocialButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="flex-row items-center border border-border rounded-[14px] py-3.5 px-5 mb-2.5 gap-3.5 bg-white"
    >
      <View className="w-6 items-center">{icon}</View>
      <Text
        className="text-sm"
        style={{ fontFamily: "Poppins-Medium", color: colors.textPrimary }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function getClerkError(err: unknown): string {
  if (
    err &&
    typeof err === "object" &&
    "errors" in err &&
    Array.isArray((err as { errors: { longMessage?: string; message: string }[] }).errors)
  ) {
    const first = (err as { errors: { longMessage?: string; message: string }[] }).errors[0];
    return first?.longMessage ?? first?.message ?? "Something went wrong.";
  }
  return "Something went wrong.";
}
