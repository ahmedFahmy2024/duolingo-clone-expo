import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback, memo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore, type LessonStatus } from "@/store/progressStore";
import { getLanguage } from "@/data/languages";
import { getUnitsForLanguage } from "@/data/units";
import { getLessonsForUnit } from "@/data/lessons";
import { images } from "@/constants/images";
import type { Unit, Lesson } from "@/types/learning";

function getLessonImageUri(lesson: Lesson): string {
  return `https://picsum.photos/seed/${lesson.id}/112/112`;
}

type Tab = "lessons" | "practice";

// ─── Lesson card ──────────────────────────────────────────────────────────────

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  status: LessonStatus;
  onPress: (lessonId: string) => void;
}

const LessonCard = memo(function LessonCard({
  lesson,
  index,
  status,
  onPress,
}: LessonCardProps) {
  const isActive = status === "in_progress";
  const isCompleted = status === "completed";

  const handlePress = useCallback(() => {
    onPress(lesson.id);
  }, [lesson.id, onPress]);

  const statusClass = isCompleted
    ? "lesson-card__status lesson-card__status--completed"
    : isActive
    ? "lesson-card__status lesson-card__status--in-progress"
    : "lesson-card__status lesson-card__status--locked";

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
      <View
        className={`lesson-card${isActive ? " lesson-card--active" : ""}`}
        // Shadow is a StyleSheet exception: Platform.select is needed for iOS/Android difference
        style={styles.cardShadow}
      >
        {/* Thumbnail — Image dimensions are a StyleSheet exception */}
        <View className="lesson-card__image-wrap">
          <Image
            source={{ uri: getLessonImageUri(lesson) }}
            style={styles.lessonImage}
            resizeMode="cover"
          />
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text
            className={`lesson-card__number${isActive ? " lesson-card__number--active" : ""}`}
          >
            Lesson {index + 1}
          </Text>
          <Text
            className={`lesson-card__title${isActive ? " lesson-card__title--active" : ""}`}
            numberOfLines={1}
          >
            {lesson.title}
          </Text>
          <Text
            className={`lesson-card__meta${isActive ? " lesson-card__meta--active" : ""}`}
          >
            {lesson.xpReward} XP · {lesson.activities.length} activities
          </Text>
          {isActive && (
            <View className="lesson-card__in-progress-badge">
              <Text className="lesson-card__in-progress-label">In progress</Text>
            </View>
          )}
        </View>

        {/* Status icon */}
        <View className={statusClass}>
          {isCompleted ? (
            <Ionicons name="checkmark" size={16} color="#fff" />
          ) : isActive ? (
            <Ionicons name="play" size={13} color="#fff" />
          ) : (
            <Ionicons name="lock-closed" size={13} color="#9CA3AF" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

// ─── Lessons tab ──────────────────────────────────────────────────────────────

interface LessonsTabProps {
  units: Unit[];
  getLessonStatus: (id: string) => LessonStatus;
  onLessonPress: (lessonId: string) => void;
}

type ListRow =
  | { kind: "unit-header"; unit: Unit; completed: number; total: number }
  | { kind: "lesson"; lesson: Lesson; index: number };

const LessonsTab = memo(function LessonsTab({
  units,
  getLessonStatus,
  onLessonPress,
}: LessonsTabProps) {
  const rows: ListRow[] = [];
  units.forEach((unit, unitIdx) => {
    const lessons = getLessonsForUnit(unit.id);
    const completed = lessons.filter(
      (l) => getLessonStatus(l.id) === "completed"
    ).length;

    if (unitIdx > 0) {
      rows.push({ kind: "unit-header", unit, completed, total: lessons.length });
    }

    lessons.forEach((lesson, lessonIdx) => {
      rows.push({ kind: "lesson", lesson, index: lessonIdx });
    });
  });

  const renderItem = useCallback(
    ({ item }: { item: ListRow }) => {
      if (item.kind === "unit-header") {
        return (
          <View className="unit-section__header">
            <Text className="unit-section__label">{item.unit.title}</Text>
            <Text className="unit-section__progress">
              {item.completed}/{item.total}
            </Text>
          </View>
        );
      }
      return (
        <LessonCard
          lesson={item.lesson}
          index={item.index}
          status={getLessonStatus(item.lesson.id)}
          onPress={onLessonPress}
        />
      );
    },
    [getLessonStatus, onLessonPress]
  );

  const keyExtractor = useCallback(
    (item: ListRow) =>
      item.kind === "unit-header" ? `header-${item.unit.id}` : item.lesson.id,
    []
  );

  // FlatList contentContainerStyle is a StyleSheet exception
  return (
    <FlatList
      data={rows}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
    />
  );
});

// ─── Practice tab ─────────────────────────────────────────────────────────────

const PracticeTab = memo(function PracticeTab() {
  return (
    <View className="practice-empty">
      <Ionicons name="barbell-outline" size={48} color="#D1D5DB" />
      <Text className="practice-empty__title">Practice coming soon</Text>
      <Text className="practice-empty__subtitle">
        Review past lessons and sharpen your skills here.
      </Text>
    </View>
  );
});

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function LearnScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("lessons");

  const { selectedLanguage } = useLanguageStore();
  const { getLessonStatus, setInProgress, seedMockProgress } = useProgressStore();

  const language = selectedLanguage ? getLanguage(selectedLanguage) : null;
  const units = selectedLanguage ? getUnitsForLanguage(selectedLanguage) : [];
  const currentUnit = units[0] ?? null;

  useEffect(() => {
    if (!currentUnit) return;
    const lessons = getLessonsForUnit(currentUnit.id);
    if (lessons.length < 3) return;
    seedMockProgress([lessons[0].id, lessons[1].id], lessons[2].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUnit?.id]);

  const handleLessonPress = useCallback(
    (lessonId: string) => {
      if (getLessonStatus(lessonId) !== "completed") {
        setInProgress(lessonId);
      }
    },
    [getLessonStatus, setInProgress]
  );

  if (!language || !currentUnit) {
    return (
      // SafeAreaView is a StyleSheet exception
      <SafeAreaView style={styles.safeArea}>
        <View className="flex-1 items-center justify-center">
          <Text className="text--body-md text-text-secondary">
            No language selected.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentUnitLessons = getLessonsForUnit(currentUnit.id);
  const completedCount = currentUnitLessons.filter(
    (l) => getLessonStatus(l.id) === "completed"
  ).length;

  return (
    // SafeAreaView is a StyleSheet exception
    <SafeAreaView style={styles.safeArea}>
      {/* ── Unit header — backgroundColor is dynamic (runtime value), StyleSheet exception */}
      <View
        className="unit-header"
        style={{ backgroundColor: currentUnit.color }}
      >
        <View className="unit-header__nav">
          <TouchableOpacity className="unit-header__icon-btn" activeOpacity={0.75}>
            <Ionicons name="chevron-back" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity className="unit-header__icon-btn" activeOpacity={0.75}>
            <Ionicons name="bookmark-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text className="unit-header__subtitle">
          Unit {currentUnit.order} · {completedCount}/{currentUnitLessons.length} lessons
        </Text>
        <Text className="unit-header__title">{currentUnit.title}</Text>

        {/* Image dimensions + resizeMode are StyleSheet exceptions */}
        <Image
          source={images.palace}
          style={styles.mascotImage}
          resizeMode="contain"
        />
      </View>

      {/* ── Tab bar ── */}
      <View className="lessons-tab-bar">
        {(["lessons", "practice"] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`lessons-tab${activeTab === tab ? " lessons-tab--active" : ""}`}
            activeOpacity={0.8}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`lessons-tab__label${activeTab === tab ? " lessons-tab__label--active" : ""}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Content ── */}
      {activeTab === "lessons" ? (
        <LessonsTab
          units={units}
          getLessonStatus={getLessonStatus}
          onLessonPress={handleLessonPress}
        />
      ) : (
        <PracticeTab />
      )}
    </SafeAreaView>
  );
}

// ─── StyleSheet — only legitimate exceptions per AGENTS.md ───────────────────
const styles = StyleSheet.create({
  // SafeAreaView: className not supported
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // Image: resizeMode + fixed pixel dimensions not coverable by className
  mascotImage: {
    width: 120,
    height: 120,
    position: "absolute",
    right: 8,
    bottom: 0,
  },
  lessonImage: {
    width: 56,
    height: 56,
  },
  // FlatList: contentContainerStyle prop, not className
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  listSeparator: {
    height: 12,
  },
  // Shadow: Platform.select iOS/Android difference — no NativeWind equivalent
  cardShadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
});
