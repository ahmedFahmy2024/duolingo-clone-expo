import { useEffect, useRef, useState, useCallback } from "react";
import {
  StreamVideoClient,
  Call,
  CallingState,
} from "@stream-io/video-react-native-sdk";
import { useUser } from "@clerk/expo";

export type CallStatus =
  | "idle"
  | "connecting"
  | "joined"
  | "muted"
  | "ended"
  | "error";

interface UseStreamCallResult {
  call: Call | null;
  callStatus: CallStatus;
  isMuted: boolean;
  callingState: CallingState;
  errorMessage: string | null;
  startCall: () => Promise<void>;
  endCall: () => Promise<void>;
  toggleMute: () => Promise<void>;
  streamVideoClient: StreamVideoClient | null;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

export function useStreamCall(lessonId: string, languageCode: string): UseStreamCallResult {
  const { user } = useUser();

  const [call, setCall] = useState<Call | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [callingState, setCallingState] = useState<CallingState>(CallingState.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient | null>(null);

  // Keep a ref in sync with state so async callbacks always see the latest call
  const callRef = useRef<Call | null>(null);
  useEffect(() => {
    callRef.current = call;
  }, [call]);

  const endCall = useCallback(async () => {
    try {
      const c = callRef.current;
      if (c) {
        await c.leave();
      }
      setCall(null);
      setCallStatus("ended");
      setCallingState(CallingState.LEFT);
    } catch (err) {
      console.error("endCall error", err);
    }
  }, []);

  const toggleMute = useCallback(async () => {
    const c = callRef.current;
    if (!c) return;
    try {
      await c.microphone.toggle();
      setIsMuted((prev) => !prev);
    } catch (err) {
      console.error("toggleMute error", err);
    }
  }, []);

  const startCall = useCallback(async () => {
    if (!user) {
      setErrorMessage("You must be signed in to start a lesson.");
      setCallStatus("error");
      return;
    }

    setCallStatus("connecting");
    setErrorMessage(null);

    try {
      const userId = user.id;
      const userName =
        user.fullName ??
        user.primaryEmailAddress?.emailAddress ??
        userId;

      const res = await fetch(`${BASE_URL}/api/stream-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userName, lessonId, languageCode }),
      });

      if (!res.ok) {
        throw new Error(`Token fetch failed: ${res.status}`);
      }

      const { token, callId, apiKey } = (await res.json()) as {
        token: string;
        callId: string;
        apiKey: string;
      };

      const client = StreamVideoClient.getOrCreateInstance({
        apiKey,
        user: { id: userId, name: userName },
        tokenProvider: () => Promise.resolve(token),
      });
      setStreamVideoClient(client);

      const newCall = client.call("audio_room", callId);

      newCall.state.callingState$.subscribe((state) => {
        setCallingState(state);
      });

      await newCall.join({ create: false });
      await newCall.camera.disable();

      setCall(newCall);
      setCallStatus("joined");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to connect";
      setErrorMessage(msg);
      setCallStatus("error");
      console.error("startCall error", err);
    }
  }, [user, lessonId, languageCode]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      const c = callRef.current;
      if (c) {
        c.leave().catch(() => {});
      }
    };
  }, []);

  return {
    call,
    callStatus,
    isMuted,
    callingState,
    errorMessage,
    startCall,
    endCall,
    toggleMute,
    streamVideoClient,
  };
}
