import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.STREAM_API_KEY!;
const apiSecret = process.env.STREAM_API_SECRET!;

export async function POST(request: Request) {
  const { userId, userName, lessonId, languageCode } = await request.json() as {
    userId: string;
    userName: string;
    lessonId: string;
    languageCode: string;
  };

  if (!userId || !lessonId) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const client = new StreamClient(apiKey, apiSecret);

  const token = client.generateUserToken({ user_id: userId });

  const callId = `lesson-${lessonId}-${userId}`;
  const call = client.video.call("audio_room", callId);

  await call.getOrCreate({
    data: {
      members: [{ user_id: userId, role: "host" }],
      custom: {
        lessonId,
        languageCode,
        userName,
      },
      settings_override: {
        audio: { mic_default_on: true, default_device: "speaker" as const },
        video: { camera_default_on: false },
      },
    },
  });

  return Response.json({ token, callId, apiKey });
}
