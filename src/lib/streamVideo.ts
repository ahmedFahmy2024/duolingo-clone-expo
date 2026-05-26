import { StreamVideoClient } from "@stream-io/video-react-native-sdk";

let _client: StreamVideoClient | null = null;

export function getStreamVideoClient(): StreamVideoClient | null {
  return _client;
}

export function createStreamVideoClient(
  userId: string,
  userName: string,
  tokenProvider: () => Promise<string>
): StreamVideoClient {
  if (_client) {
    _client.disconnectUser().catch(() => {});
  }
  _client = StreamVideoClient.getOrCreateInstance({
    apiKey: process.env.EXPO_PUBLIC_STREAM_API_KEY!,
    user: { id: userId, name: userName },
    tokenProvider,
  });
  return _client;
}

export async function disconnectStreamVideoClient(): Promise<void> {
  if (_client) {
    await _client.disconnectUser().catch(() => {});
    _client = null;
  }
}
