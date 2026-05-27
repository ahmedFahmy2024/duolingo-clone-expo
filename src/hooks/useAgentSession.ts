import { useCallback, useEffect, useRef, useState } from "react";

export type AgentStatus = "idle" | "connecting" | "connected" | "failed";

interface UseAgentSessionResult {
  agentStatus: AgentStatus;
  startAgent: (callId: string) => Promise<void>;
  stopAgent: () => Promise<void>;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

export function useAgentSession(): UseAgentSessionResult {
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");

  const callIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const stopAgent = useCallback(async () => {
    const callId = callIdRef.current;
    const sessionId = sessionIdRef.current;
    if (!callId || !sessionId) return;

    callIdRef.current = null;
    sessionIdRef.current = null;
    setAgentStatus("idle");

    try {
      await fetch(`${BASE_URL}/api/agent-session`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callId, sessionId }),
      });
    } catch (err) {
      console.error("stopAgent error", err);
    }
  }, []);

  const startAgent = useCallback(async (callId: string) => {
    setAgentStatus("connecting");
    callIdRef.current = callId;

    try {
      const res = await fetch(`${BASE_URL}/api/agent-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callId }),
      });

      if (!res.ok) {
        throw new Error(`Agent session start failed: ${res.status}`);
      }

      const { sessionId } = (await res.json()) as { sessionId: string };
      sessionIdRef.current = sessionId;
      setAgentStatus("connected");
    } catch (err) {
      console.error("startAgent error", err);
      setAgentStatus("failed");
    }
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      const callId = callIdRef.current;
      const sessionId = sessionIdRef.current;
      if (!callId || !sessionId) return;
      // Fire-and-forget cleanup
      fetch(`${BASE_URL}/api/agent-session`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callId, sessionId }),
      }).catch(() => {});
    };
  }, []);

  return { agentStatus, startAgent, stopAgent };
}
