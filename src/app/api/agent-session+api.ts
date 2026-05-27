/**
 * Proxy to the Vision Agent HTTP server.
 * All secrets (VISION_AGENT_URL, STREAM_API_KEY, STREAM_API_SECRET) stay server-side.
 *
 * POST  /api/agent-session  { callId }       → starts agent session, returns { sessionId }
 * DELETE /api/agent-session  { callId, sessionId } → stops agent session
 */

const VISION_AGENT_URL = process.env.VISION_AGENT_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  const { callId } = await request.json() as { callId: string };

  console.log("[agent-session] POST request for callId:", callId);

  if (!callId) {
    return Response.json({ error: "Missing callId" }, { status: 400 });
  }

  console.log("[agent-session] forwarding to", `${VISION_AGENT_URL}/calls/${callId}/sessions`);

  let res: Response;
  try {
    res = await fetch(`${VISION_AGENT_URL}/calls/${callId}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
  } catch (err) {
    console.error("[agent-session] fetch threw:", err);
    return Response.json({ error: "Cannot reach Vision Agent server" }, { status: 502 });
  }

  console.log("[agent-session] Vision Agent response status:", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("[agent-session] Vision Agent start error:", res.status, text);
    return Response.json({ error: "Failed to start agent session" }, { status: 502 });
  }

  const data = (await res.json()) as { session_id: string };
  console.log("[agent-session] session started:", data.session_id);
  return Response.json({ sessionId: data.session_id });
}

export async function DELETE(request: Request) {
  const { callId, sessionId } = await request.json() as {
    callId: string;
    sessionId: string;
  };

  if (!callId || !sessionId) {
    return Response.json({ error: "Missing callId or sessionId" }, { status: 400 });
  }

  const res = await fetch(
    `${VISION_AGENT_URL}/calls/${callId}/sessions/${sessionId}`,
    { method: "DELETE" }
  );

  if (!res.ok) {
    console.error("Vision Agent stop error:", res.status);
  }

  return Response.json({ ok: true });
}
