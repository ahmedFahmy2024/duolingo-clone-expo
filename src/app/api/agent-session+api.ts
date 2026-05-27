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

  if (!callId) {
    return Response.json({ error: "Missing callId" }, { status: 400 });
  }

  const res = await fetch(`${VISION_AGENT_URL}/calls/${callId}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Vision Agent start error:", res.status, text);
    return Response.json({ error: "Failed to start agent session" }, { status: 502 });
  }

  const data = (await res.json()) as { session_id: string };
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
