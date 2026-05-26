import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";
import { getLesson } from "@/data/lessons";
import { getLanguage } from "@/data/languages";
import { images } from "@/constants/images";
import { useStreamCall } from "@/hooks/useStreamCall";
import type { CallStatus } from "@/hooks/useStreamCall";

// ─── Feedback scores ──────────────────────────────────────────────────────────

type FeedbackScore = {
  label: string;
  value: string;
  variant: "excellent" | "great" | "good";
};

const FEEDBACK_SCORES: FeedbackScore[] = [
  { label: "Speaking", value: "Excellent", variant: "excellent" },
  { label: "Pronunciation", value: "Great", variant: "great" },
  { label: "Grammar", value: "Good", variant: "good" },
];

// ─── Status indicator ─────────────────────────────────────────────────────────

function statusLabel(status: CallStatus): string {
  switch (status) {
    case "connecting": return "Connecting…";
    case "joined":     return "Live";
    case "muted":      return "Muted";
    case "ended":      return "Ended";
    case "error":      return "Error";
    default:           return "Offline";
  }
}

function statusColor(status: CallStatus): string {
  switch (status) {
    case "joined":     return "#21C168";
    case "muted":      return "#FFCB00";
    case "connecting": return "#4D88FF";
    case "ended":      return "#FF4D4F";
    case "error":      return "#FF4D4F";
    default:           return "#6B7280";
  }
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useUser();

  const lesson = id ? getLesson(id) : null;
  const language = lesson ? getLanguage(lesson.languageCode) : null;

  const {
    callStatus,
    isMuted,
    errorMessage,
    startCall,
    endCall,
    toggleMute,
  } = useStreamCall(lesson?.id ?? "", lesson?.languageCode ?? "");

  const isInCall = callStatus === "joined" || callStatus === "muted";
  const isConnecting = callStatus === "connecting";
  const isEnded = callStatus === "ended";

  // Resolve teacher phrase from lesson data
  const teacherPhrase: { text: string; translation: string } = (() => {
    const fallbackTranslation =
      lesson?.phrases?.[0]?.translation ??
      lesson?.vocabulary?.[0]?.translation ??
      "Hello!";
    if (lesson?.aiTeacherPrompt) {
      return { text: lesson.aiTeacherPrompt.intro, translation: fallbackTranslation };
    }
    if (lesson?.phrases?.[0]) {
      return { text: lesson.phrases[0].phrase, translation: lesson.phrases[0].translation };
    }
    if (lesson?.vocabulary?.[0]) {
      return { text: lesson.vocabulary[0].word, translation: lesson.vocabulary[0].translation };
    }
    return { text: "¡Hola!", translation: "Hello!" };
  })();

  const handleBack = useCallback(() => router.back(), [router]);

  const handleEndCall = useCallback(async () => {
    await endCall();
    router.back();
  }, [endCall, router]);

  const userName =
    user?.fullName ??
    user?.primaryEmailAddress?.emailAddress ??
    "You";

  if (!lesson || !language) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View className="flex-1 items-center justify-center">
          <Text className="text--body-md">Lesson not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ── Nav bar ── */}
      <View className="audio-lesson__nav">
        <TouchableOpacity
          className="audio-lesson__nav-back"
          activeOpacity={0.75}
          onPress={handleBack}
        >
          <Ionicons name="chevron-back" size={20} color="#fff" />
          <Text className="audio-lesson__nav-title">AI Teacher</Text>
        </TouchableOpacity>

        <View className="audio-lesson__nav-actions">
          {/* Live / status indicator */}
          <View className="flex-row items-center gap-2">
            <View
              className="audio-lesson__status-dot"
              style={{ backgroundColor: statusColor(callStatus) }}
            />
            <Text
              className="audio-lesson__status-label"
              style={{ color: statusColor(callStatus) }}
            >
              {statusLabel(callStatus)}
            </Text>
          </View>

          {/* XP chip */}
          <View
            className="flex-row items-center gap-1 px-2 py-1 rounded-full"
            style={styles.xpChip}
          >
            <Ionicons name="flash" size={13} color="#FFCB00" />
            <Text style={styles.xpChipText}>{lesson.xpReward}</Text>
          </View>

          {/* Language flag */}
          <View className="audio-lesson__nav-icon-btn">
            <Text style={styles.flagText}>{language.flag}</Text>
          </View>
        </View>
      </View>

      {/* ── Teacher area ── */}
      <View className="audio-lesson__teacher-area">
        <View className="audio-lesson__mascot-wrap">
          <Image
            source={images.mascotWelcome}
            style={styles.mascotImage}
            resizeMode="contain"
          />

          {/* Connecting overlay on mascot */}
          {isConnecting && (
            <View className="audio-lesson__state-overlay">
              <ActivityIndicator size="large" color="#6C4EF5" />
              <Text className="audio-lesson__state-label">Connecting…</Text>
            </View>
          )}

          {/* Ended overlay on mascot */}
          {isEnded && (
            <View className="audio-lesson__state-overlay">
              <Ionicons name="call-outline" size={36} color="#FF4D4F" />
              <Text className="audio-lesson__state-label">Call Ended</Text>
            </View>
          )}
        </View>

        {/* User PiP — shown when in call */}
        <View className="audio-lesson__pip">
          {isInCall ? (
            <>
              <View style={styles.pipAvatar}>
                <Ionicons name="person" size={20} color="#fff" />
              </View>
              {isMuted && (
                <View style={styles.mutedBadge}>
                  <Ionicons name="mic-off" size={10} color="#fff" />
                </View>
              )}
            </>
          ) : (
            <Ionicons name="person" size={36} color="rgba(255,255,255,0.4)" />
          )}
        </View>
      </View>

      {/* ── User info badge (shown when in call) ── */}
      {isInCall && (
        <View className="audio-lesson__user-badge">
          <View className="audio-lesson__user-avatar">
            <Ionicons name="person" size={12} color="#fff" />
          </View>
          <Text className="audio-lesson__user-name">{userName}</Text>
          {isMuted && (
            <Ionicons name="mic-off" size={12} color="rgba(255,255,255,0.6)" />
          )}
        </View>
      )}

      {/* ── Error banner ── */}
      {callStatus === "error" && errorMessage && (
        <View className="audio-lesson__error-banner">
          <Ionicons name="alert-circle" size={16} color="#FF4D4F" />
          <Text className="audio-lesson__error-text" numberOfLines={2}>
            {errorMessage}
          </Text>
        </View>
      )}

      {/* ── Speech bubble ── */}
      <View className="audio-lesson__bubble" style={styles.bubbleShadow}>
        <View className="audio-lesson__bubble-text">
          <Text className="audio-lesson__bubble-phrase" numberOfLines={3}>
            {teacherPhrase.text}
          </Text>
          <Text className="audio-lesson__bubble-translation" numberOfLines={2}>
            {teacherPhrase.translation}
          </Text>
        </View>
        <View className="audio-lesson__bubble-speaker">
          <Ionicons
            name={isInCall ? "volume-high" : "volume-mute"}
            size={18}
            color="#6C4EF5"
          />
        </View>
      </View>

      {/* ── Join button (idle / ended / error state) ── */}
      {!isInCall && !isConnecting && (
        <TouchableOpacity
          className="audio-lesson__join-btn"
          activeOpacity={0.85}
          onPress={startCall}
        >
          <Ionicons name="call" size={18} color="#fff" />
          <Text className="audio-lesson__join-btn-label">
            {callStatus === "ended" || callStatus === "error"
              ? "Rejoin Lesson"
              : "Start Lesson"}
          </Text>
        </TouchableOpacity>
      )}

      {/* ── Controls (visible while in call or connecting) ── */}
      {(isInCall || isConnecting) && (
        <View className="audio-lesson__controls">
          {/* Mic toggle */}
          <TouchableOpacity
            className="audio-lesson__ctrl-btn"
            activeOpacity={0.8}
            onPress={toggleMute}
            disabled={isConnecting}
          >
            <View
              className={`audio-lesson__ctrl-icon${isMuted ? "" : " audio-lesson__ctrl-icon--mic-active"}`}
            >
              <Ionicons
                name={isMuted ? "mic-off" : "mic"}
                size={22}
                color="#fff"
              />
            </View>
            <Text className="audio-lesson__ctrl-label">
              {isMuted ? "Unmute" : "Mute"}
            </Text>
          </TouchableOpacity>

          {/* Subtitles (UI only) */}
          <TouchableOpacity
            className="audio-lesson__ctrl-btn"
            activeOpacity={0.8}
          >
            <View className="audio-lesson__ctrl-icon">
              <Ionicons name="text" size={22} color="#6C4EF5" />
            </View>
            <Text className="audio-lesson__ctrl-label">Subtitles</Text>
          </TouchableOpacity>

          {/* Speaker (UI only) */}
          <TouchableOpacity
            className="audio-lesson__ctrl-btn"
            activeOpacity={0.8}
          >
            <View className="audio-lesson__ctrl-icon">
              <Ionicons name="volume-high" size={22} color="#fff" />
            </View>
            <Text className="audio-lesson__ctrl-label">Speaker</Text>
          </TouchableOpacity>

          {/* End call */}
          <TouchableOpacity
            className="audio-lesson__ctrl-btn"
            activeOpacity={0.8}
            onPress={handleEndCall}
          >
            <View className="audio-lesson__ctrl-icon audio-lesson__ctrl-icon--end">
              <Ionicons
                name="call"
                size={22}
                color="#fff"
                style={styles.endCallIcon}
              />
            </View>
            <Text className="audio-lesson__ctrl-label">End</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Feedback scores ── */}
      <View className="audio-lesson__feedback">
        {FEEDBACK_SCORES.map((item, idx) => (
          <View key={item.label} className="flex-row items-center gap-4">
            <View className="audio-lesson__feedback-item">
              <Text className="audio-lesson__feedback-label">{item.label}</Text>
              <Text
                className={`audio-lesson__feedback-score audio-lesson__feedback-score--${item.variant}`}
              >
                {isInCall ? item.value : "—"}
              </Text>
            </View>
            {idx < FEEDBACK_SCORES.length - 1 && (
              <View className="audio-lesson__feedback-divider" />
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ─── StyleSheet — only legitimate exceptions per AGENTS.md ───────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0A1A",
  },
  mascotImage: {
    width: 200,
    height: 200,
  },
  bubbleShadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
    },
    android: { elevation: 4 },
    default: {},
  }),
  xpChip: {
    backgroundColor: "rgba(255, 203, 0, 0.15)",
  },
  xpChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFCB00",
    fontFamily: "Poppins-SemiBold",
  },
  endCallIcon: {
    transform: [{ rotate: "135deg" }],
  },
  flagText: {
    fontSize: 16,
  },
  // PiP avatar circle
  pipAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(108, 78, 245, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  // Muted badge over PiP
  mutedBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FF4D4F",
    alignItems: "center",
    justifyContent: "center",
  },
});
