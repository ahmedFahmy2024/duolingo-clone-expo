import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.STREAM_API_KEY!;
const apiSecret = process.env.STREAM_API_SECRET!;

const AGENT_USER_ID = "luna-teacher";

export async function POST(request: Request) {
  const { userId, userName, lessonId, languageCode, goals, vocabulary, phrases, aiTeacherPrompt } =
    await request.json() as {
      userId: string;
      userName: string;
      lessonId: string;
      languageCode: string;
      goals?: string[];
      vocabulary?: { word: string; translation: string; pronunciation?: string }[];
      phrases?: { phrase: string; translation: string }[];
      aiTeacherPrompt?: {
        systemPrompt: string;
        intro: string;
        teachingPoints: string[];
        checkQuestions: string[];
      };
    };

  if (!userId || !lessonId) {
    console.log("[stream-token] MISSING FIELDS", { userId, lessonId });
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  console.log("[stream-token] request", { userId, userName, lessonId, languageCode });

  if (!apiKey || !apiSecret) {
    console.log("[stream-token] MISSING ENV", { hasApiKey: !!apiKey, hasApiSecret: !!apiSecret });
    return Response.json({ error: "Server missing Stream credentials" }, { status: 500 });
  }

  const client = new StreamClient(apiKey, apiSecret);

  // Upsert both the agent and the human user so they can join the call.
  // Stream requires every user that joins a call to exist in its user database first.
  try {
    await client.upsertUsers([
      { id: AGENT_USER_ID, name: "Luna", role: "admin" },
      { id: userId, name: userName ?? userId, role: "user" },
    ]);
    console.log("[stream-token] upserted users", [AGENT_USER_ID, userId]);
  } catch (err) {
    console.log("[stream-token] upsertUsers ERROR", err);
    throw err;
  }

  const token = client.generateUserToken({ user_id: userId });
  console.log("[stream-token] token generated", token.slice(0, 20) + "...");

  // Use "default" call type — Vision Agents framework was designed for this
  // type. audio_room has backstage/publish-role semantics that prevent the
  // agent and the React Native client from seeing each other in the same SFU
  // session, even when both join the same call ID.
  // Use "v2-" prefix so we don't collide with stale audio_room calls under
  // the same name from previous sessions.
  const callId = `lesson-v2-${lessonId}-${userId}`;
  const call = client.video.call("default", callId);

  console.log("[stream-token] calling getOrCreate for", callId);
  await call.getOrCreate({
    data: {
      created_by_id: userId,
      members: [
        { user_id: userId, role: "user" },
        { user_id: AGENT_USER_ID, role: "user" },
      ],
      custom: {
        lessonId,
        languageCode,
        userName,
        goals: goals ?? [],
        vocabulary: vocabulary ?? [],
        phrases: phrases ?? [],
        aiTeacherPrompt: aiTeacherPrompt ?? null,
      },
      settings_override: {
        audio: { mic_default_on: true, default_device: "speaker" as const },
      },
    },
  });

  console.log("[stream-token] getOrCreate ok");

  // Debug: log the actual server-side call state so we can see backstage,
  // live status, members, and current session participants.
  try {
    const state = await call.get();
    const c = state.call;
    console.log("[stream-token] call state:", {
      backstage: c.backstage,
      session_id: c.session?.id,
      participants_in_session: c.session?.participants?.map((p) => p.user.id) ?? [],
      participant_count: c.session?.participants_count_by_role,
      settings_backstage: c.settings.backstage,
    });
  } catch (err) {
    console.log("[stream-token] call.get() failed:", (err as Error)?.message);
  }

  return Response.json({ token, callId, apiKey });
}
