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
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const client = new StreamClient(apiKey, apiSecret);

  // Upsert the agent user so it can join calls
  await client.upsertUsers([
    { id: AGENT_USER_ID, name: "Luna", role: "admin" },
  ]);

  const token = client.generateUserToken({ user_id: userId });

  const callId = `lesson-${lessonId}-${userId}`;
  const call = client.video.call("audio_room", callId);

  await call.getOrCreate({
    data: {
      members: [
        { user_id: userId, role: "host" },
        { user_id: AGENT_USER_ID, role: "admin" },
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
        video: { camera_default_on: false },
      },
    },
  });

  return Response.json({ token, callId, apiKey });
}
