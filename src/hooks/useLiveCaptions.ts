import {
  useCallStateHooks,
  type CallClosedCaption,
} from "@stream-io/video-react-native-sdk";

const AGENT_USER_ID = "luna-teacher";

export type Caption = {
  id: string;
  text: string;
  speakerName: string;
  isAI: boolean;
};

interface UseLiveCaptionsResult {
  captions: Caption[];
  isCaptioning: boolean;
}

/**
 * Must be called inside a <StreamCall> context.
 * Returns the live caption queue with speaker metadata.
 */
export function useLiveCaptions(): UseLiveCaptionsResult {
  const { useCallClosedCaptions, useIsCallCaptioningInProgress } = useCallStateHooks();
  const rawCaptions: CallClosedCaption[] = useCallClosedCaptions();
  const isCaptioning = useIsCallCaptioningInProgress();

  const captions: Caption[] = rawCaptions.map((c) => {
    const isAI = c.speaker_id === AGENT_USER_ID || c.user?.id === AGENT_USER_ID;
    return {
      id: c.id,
      text: c.text,
      speakerName: isAI ? "Luna" : (c.user?.name ?? "You"),
      isAI,
    };
  });

  return { captions, isCaptioning };
}
