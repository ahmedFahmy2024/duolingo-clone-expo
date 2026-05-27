import { useEffect, useRef, useState, useCallback } from "react";
import {
  StreamVideoClient,
  Call,
  CallingState,
} from "@stream-io/video-react-native-sdk";
import { useUser } from "@clerk/expo";
import type { Lesson } from "@/types/learning";

export type CallStatus =
  | "idle"
  | "connecting"
  | "joined"
  | "muted"
  | "ended"
  | "error";

interface UseStreamCallResult {
  call: Call | null;
  callId: string | null;
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

const LOG = (...args: unknown[]) => console.log("[useStreamCall]", ...args);

export function useStreamCall(lesson: Lesson | null): UseStreamCallResult {
  const { user } = useUser();

  const [call, setCall] = useState<Call | null>(null);
  const [callId, setCallId] = useState<string | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [callingState, setCallingState] = useState<CallingState>(CallingState.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient | null>(null);

  const callRef = useRef<Call | null>(null);
  useEffect(() => {
    callRef.current = call;
  }, [call]);

  const endCall = useCallback(async () => {
    LOG("endCall: invoked");
    try {
      const c = callRef.current;
      if (c) {
        await c.leave();
        LOG("endCall: call left");
      }
      setCall(null);
      setCallStatus("ended");
      setCallingState(CallingState.LEFT);
    } catch (err) {
      LOG("endCall: ERROR", err);
      console.error("endCall error", err);
    }
    // Don't disconnect the shared client here — it's reused across lessons.
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
    LOG("startCall: invoked");
    if (!user) {
      LOG("startCall: no user — aborting");
      setErrorMessage("You must be signed in to start a lesson.");
      setCallStatus("error");
      return;
    }
    if (!lesson) {
      LOG("startCall: no lesson — aborting");
      setErrorMessage("No lesson selected.");
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

      LOG("startCall: requesting token", { userId, userName, lessonId: lesson.id });

      const res = await fetch(`${BASE_URL}/api/stream-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userName,
          lessonId: lesson.id,
          languageCode: lesson.languageCode,
          goals: lesson.goals,
          vocabulary: lesson.vocabulary ?? [],
          phrases: lesson.phrases ?? [],
          aiTeacherPrompt: lesson.aiTeacherPrompt ?? null,
        }),
      });

      LOG("startCall: token response status", res.status);

      if (!res.ok) {
        const body = await res.text();
        LOG("startCall: token request failed body:", body);
        throw new Error(`Token fetch failed: ${res.status}`);
      }

      const { token, callId: newCallId, apiKey } = (await res.json()) as {
        token: string;
        callId: string;
        apiKey: string;
      };

      LOG("startCall: got token", {
        tokenPrefix: token.slice(0, 16) + "...",
        callId: newCallId,
        apiKey,
      });

      setCallId(newCallId);

      // CRITICAL: use the SAME client instance the <StreamVideo> provider mounted
      // in _layout.tsx. Creating a new client here causes the SDK's audio mixer
      // to attach to the wrong instance — the call connects but remote audio
      // never reaches the device speaker.
      LOG("startCall: getting shared StreamVideoClient singleton");
      const client = StreamVideoClient.getOrCreateInstance({
        apiKey,
        user: { id: userId, name: userName },
        tokenProvider: () => Promise.resolve(token),
      });
      setStreamVideoClient(client);

      const newCall = client.call("default", newCallId);
      LOG("startCall: call object created", { type: "default", id: newCallId });

      // Subscribe to state changes for visibility
      newCall.state.callingState$.subscribe((state) => {
        LOG("callingState ->", state);
        setCallingState(state);
      });
      newCall.state.participants$.subscribe((participants) => {
        LOG("participants ->", participants.map((p) => ({
          userId: p.userId,
          isLocal: p.isLocalParticipant,
          publishedTracks: p.publishedTracks,
          audioLevel: p.audioLevel,
        })));
      });

      // create:true is idempotent — safe even though the server already
      // called getOrCreate, and avoids a race where the call isn't fully
      // propagated before the client joins.
      LOG("startCall: calling join()");
      await newCall.join({ create: true });
      LOG("startCall: join() resolved");

      LOG("startCall: disabling camera");
      await newCall.camera.disable();

      // audio_room requires the participant to actively publish their mic
      // so the agent (and other participants) can hear them.
      LOG("startCall: enabling microphone");
      await newCall.microphone.enable();
      LOG("startCall: microphone status", {
        enabled: newCall.microphone.state.status,
        selectedDevice: newCall.microphone.state.selectedDevice,
      });

      setCall(newCall);
      setCallStatus("joined");
      LOG("startCall: fully joined and publishing");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to connect";
      setErrorMessage(msg);
      setCallStatus("error");
      LOG("startCall: ERROR", err);
      console.error("startCall error", err);
    }
  }, [user, lesson]);

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
    callId,
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
