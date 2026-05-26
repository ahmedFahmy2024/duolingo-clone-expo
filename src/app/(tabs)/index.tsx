import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { getLanguage } from "@/data/languages";
import { getUnitsForLanguage } from "@/data/units";
import { images } from "@/constants/images";

const DAILY_GOAL_XP = 20;
const STREAK_COUNT = 12;

const TODAY_PLAN = [
  {
    id: "lesson",
    iconName: "book-outline" as const,
    iconWrapClass: "plan-card__icon-wrap plan-card__icon-wrap--lesson",
    iconColor: "#6C4EF5",
    title: "Lesson",
    subtitle: "At the café",
    done: true,
  },
  {
    id: "ai-conversation",
    iconName: "headset-outline" as const,
    iconWrapClass: "plan-card__icon-wrap plan-card__icon-wrap--ai",
    iconColor: "#6C4EF5",
    title: "AI Conversation",
    subtitle: "Talk about your day",
    done: false,
  },
  {
    id: "new-words",
    iconName: "chatbubble-outline" as const,
    iconWrapClass: "plan-card__icon-wrap plan-card__icon-wrap--words",
    iconColor: "#EF4444",
    title: "New words",
    subtitle: "10 words",
    done: false,
  },
];

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguage } = useLanguageStore();
  const { totalXP } = useProgressStore();

  const language = selectedLanguage ? getLanguage(selectedLanguage) : null;
  const units = selectedLanguage ? getUnitsForLanguage(selectedLanguage) : [];
  const currentUnit = units[0] ?? null;

  const firstName = user?.firstName ?? user?.username ?? "Learner";
  // Dynamic runtime value — StyleSheet exception applies
  const xpPercent = Math.min((totalXP / DAILY_GOAL_XP) * 100, 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <View className="flex-row items-center gap-2">
            <Text style={styles.flagEmoji}>{language?.flag ?? "🌍"}</Text>
            <Text className="text--h4">Hola, {firstName}! 👋</Text>
          </View>
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Image source={images.streakFire} style={styles.fireIcon} />
              <Text className="text--body-md font-bold text-streak">
                {STREAK_COUNT}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={24} color="#001132" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 gap-4">
          {/* ── Daily Goal Card ── */}
          <View className="daily-goal">
            <View className="flex-1 gap-2">
              <Text className="daily-goal__label">Daily goal</Text>
              <Text className="daily-goal__xp">
                {totalXP}{" "}
                <Text className="daily-goal__xp-total">/ {DAILY_GOAL_XP} XP</Text>
              </Text>
              {/* Progress bar — width is dynamic, so style= is the exception */}
              <View className="progress-bar mt-1">
                <View
                  className="progress-bar__fill--streak"
                  style={{ width: `${xpPercent}%`, height: "100%", borderRadius: 999 }}
                />
              </View>
            </View>
            <Image source={images.treasure} className="daily-goal__image" />
          </View>

          {/* ── Continue Learning Banner ── */}
          {language && currentUnit && (
            <View className="continue-banner">
              <View className="flex-1 gap-1">
                <Text className="continue-banner__label">Continue learning</Text>
                <Text className="continue-banner__language">{language.name}</Text>
                <Text className="continue-banner__level">
                  A1 · {currentUnit.title}
                </Text>
                <TouchableOpacity className="continue-banner__btn" activeOpacity={0.85}>
                  <Text className="continue-banner__btn-label">Continue</Text>
                </TouchableOpacity>
              </View>
              <Image source={images.palace} className="continue-banner__image" />
            </View>
          )}

          {/* ── Today's Plan ── */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text--h4">Today&apos;s plan</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text--body-md font-semibold text-lingua-purple">
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <View className="plan-card">
              {TODAY_PLAN.map((item, idx) => (
                <View key={item.id}>
                  <View className="plan-card__row">
                    <View className={item.iconWrapClass}>
                      <Ionicons name={item.iconName} size={20} color={item.iconColor} />
                    </View>
                    <View className="flex-1">
                      <Text className="text--body-md font-semibold">{item.title}</Text>
                      <Text className="text--body-sm">{item.subtitle}</Text>
                    </View>
                    {item.done ? (
                      <View className="plan-card__check">
                        <Ionicons name="checkmark" size={14} color="#fff" />
                      </View>
                    ) : (
                      <View className="plan-card__circle" />
                    )}
                  </View>
                  {idx < TODAY_PLAN.length - 1 && <View className="divider" />}
                </View>
              ))}
            </View>
          </View>

          {/* ── Next Up ── */}
          <View className="gap-3">
            <Text className="next-up__section-label">Next up</Text>
            <View className="next-up__card">
              <View className="flex-1">
                <Text className="next-up__title">AI Video Call</Text>
                <Text className="next-up__subtitle">Practice speaking</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <View className="next-up__avatar">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/80?img=47" }}
                    className="next-up__avatar-img"
                  />
                </View>
                <TouchableOpacity className="next-up__video-btn" activeOpacity={0.85}>
                  <Ionicons name="videocam" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// StyleSheet is ONLY used here for legitimate exceptions per AGENTS.md:
// - SafeAreaView (className not supported)
// - ScrollView contentContainerStyle
// - Dynamic runtime value (xpPercent width is handled inline above)
// - Image resizeMode and fixed pixel dimensions not coverable by className
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  flagEmoji: {
    fontSize: 28,
  },
  fireIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
