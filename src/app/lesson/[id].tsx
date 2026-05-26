import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getLesson } from "@/data/lessons";
import { getLanguage } from "@/data/languages";
import { images } from "@/constants/images";

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

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [micActive, setMicActive] = useState(false);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);

  const lesson = id ? getLesson(id) : null;
  const language = lesson ? getLanguage(lesson.languageCode) : null;

  // Resolve the current phrase to display from aiTeacherPrompt or first phrase/vocab.
  // AITeacherPrompt has no translation field, so derive one from phrases/vocab fallbacks.
  const teacherPhrase: { text: string; translation: string } = (() => {
    const fallbackTranslation =
      lesson?.phrases?.[0]?.translation ??
      lesson?.vocabulary?.[0]?.translation ??
      "Hello!";

    if (lesson?.aiTeacherPrompt) {
      return {
        text: lesson.aiTeacherPrompt.intro,
        translation: fallbackTranslation,
      };
    }
    if (lesson?.phrases?.[0]) {
      return {
        text: lesson.phrases[0].phrase,
        translation: lesson.phrases[0].translation,
      };
    }
    if (lesson?.vocabulary?.[0]) {
      return {
        text: lesson.vocabulary[0].word,
        translation: lesson.vocabulary[0].translation,
      };
    }
    return { text: "¡Hola!", translation: "Hello!" };
  })();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleEndCall = useCallback(() => {
    router.back();
  }, [router]);

  const toggleMic = useCallback(() => setMicActive((v) => !v), []);
  const toggleSubtitles = useCallback(() => setSubtitlesOn((v) => !v), []);
  const toggleSpeaker = useCallback(() => setSpeakerOn((v) => !v), []);

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

        {/* Online status + actions */}
        <View className="audio-lesson__nav-actions">
          {/* Online indicator */}
          <View className="flex-row items-center gap-2">
            <View className="audio-lesson__status-dot" />
            <Text className="audio-lesson__status-label">Online</Text>
          </View>

          {/* Camera toggle */}
          <TouchableOpacity
            className="audio-lesson__nav-icon-btn"
            activeOpacity={0.75}
          >
            <Ionicons name="videocam-outline" size={18} color="#fff" />
          </TouchableOpacity>

          {/* XP counter chip */}
          <View
            className="flex-row items-center gap-1 px-2 py-1 rounded-full"
            style={styles.xpChip}
          >
            <Ionicons name="flash" size={13} color="#FFCB00" />
            <Text style={styles.xpChipText}>{lesson.xpReward}</Text>
          </View>

          {/* Bell */}
          <TouchableOpacity
            className="audio-lesson__nav-icon-btn"
            activeOpacity={0.75}
          >
            <Ionicons name="notifications-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Teacher area ── */}
      <View className="audio-lesson__teacher-area">
        {/* Mascot / teacher illustration */}
        <View className="audio-lesson__mascot-wrap">
          <Image
            source={images.mascotWelcome}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </View>

        {/* Student PiP (picture-in-picture placeholder) */}
        <View className="audio-lesson__pip">
          <Ionicons name="person" size={36} color="rgba(255,255,255,0.4)" />
        </View>
      </View>

      {/* ── Speech bubble ── */}
      {subtitlesOn && (
        <View className="audio-lesson__bubble" style={styles.bubbleShadow}>
          <View className="audio-lesson__bubble-text">
            <Text className="audio-lesson__bubble-phrase" numberOfLines={3}>
              {teacherPhrase.text}
            </Text>
            <Text
              className="audio-lesson__bubble-translation"
              numberOfLines={2}
            >
              {teacherPhrase.translation}
            </Text>
          </View>
          <TouchableOpacity
            className="audio-lesson__bubble-speaker"
            activeOpacity={0.8}
            onPress={toggleSpeaker}
          >
            <Ionicons
              name={speakerOn ? "volume-high" : "volume-mute"}
              size={18}
              color="#6C4EF5"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* ── Controls ── */}
      <View className="audio-lesson__controls">
        {/* Camera */}
        <TouchableOpacity
          className="audio-lesson__ctrl-btn"
          activeOpacity={0.8}
        >
          <View className="audio-lesson__ctrl-icon">
            <Ionicons name="videocam-outline" size={22} color="#fff" />
          </View>
          <Text className="audio-lesson__ctrl-label">Camera</Text>
        </TouchableOpacity>

        {/* Mic */}
        <TouchableOpacity
          className="audio-lesson__ctrl-btn"
          activeOpacity={0.8}
          onPress={toggleMic}
        >
          <View
            className={`audio-lesson__ctrl-icon${micActive ? " audio-lesson__ctrl-icon--mic-active" : ""}`}
          >
            <Ionicons
              name={micActive ? "mic" : "mic-off"}
              size={22}
              color="#fff"
            />
          </View>
          <Text className="audio-lesson__ctrl-label">Mic</Text>
        </TouchableOpacity>

        {/* Subtitles */}
        <TouchableOpacity
          className="audio-lesson__ctrl-btn"
          activeOpacity={0.8}
          onPress={toggleSubtitles}
        >
          <View className="audio-lesson__ctrl-icon">
            <Ionicons
              name={subtitlesOn ? "text" : "text-outline"}
              size={22}
              color={subtitlesOn ? "#6C4EF5" : "#fff"}
            />
          </View>
          <Text className="audio-lesson__ctrl-label">Subtitles</Text>
        </TouchableOpacity>

        {/* End call */}
        <TouchableOpacity
          className="audio-lesson__ctrl-btn"
          activeOpacity={0.8}
          onPress={handleEndCall}
        >
          <View className="audio-lesson__ctrl-icon audio-lesson__ctrl-icon--end">
            <Ionicons name="call" size={22} color="#fff" style={styles.endCallIcon} />
          </View>
          <Text className="audio-lesson__ctrl-label">End Call</Text>
        </TouchableOpacity>
      </View>

      {/* ── Feedback scores ── */}
      <View className="audio-lesson__feedback">
        {FEEDBACK_SCORES.map((item, idx) => (
          <View key={item.label} className="flex-row items-center gap-4">
            <View className="audio-lesson__feedback-item">
              <Text className="audio-lesson__feedback-label">{item.label}</Text>
              <Text
                className={`audio-lesson__feedback-score audio-lesson__feedback-score--${item.variant}`}
              >
                {item.value}
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
  // SafeAreaView: className not supported
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0A1A",
  },
  // Image: fixed pixel dimensions not coverable by className
  mascotImage: {
    width: 200,
    height: 200,
  },
  // Shadow: Platform.select iOS/Android — no NativeWind equivalent
  bubbleShadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
  // Dynamic background for XP chip
  xpChip: {
    backgroundColor: "rgba(255, 203, 0, 0.15)",
  },
  xpChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFCB00",
    fontFamily: "Poppins-SemiBold",
  },
  // Transform: rotate for end-call icon
  endCallIcon: {
    transform: [{ rotate: "135deg" }],
  },
});
