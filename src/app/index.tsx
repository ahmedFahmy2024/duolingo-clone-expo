import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";
import { colors } from "@/theme";

export default function Index() {
  const router = useRouter();
  const { isSignedIn, isLoaded, signOut } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/onboarding" />;

  async function handleSignOut() {
    await signOut();
    router.replace("/onboarding");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-start justify-between">
          <View className="gap-1">
            <Text className="text--h1">lingua</Text>
            <Text className="text--body-md" style={{ color: colors.textSecondary }}>
              Design system loaded ✓
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSignOut}
            activeOpacity={0.7}
            className="mt-1 px-3 py-1.5 rounded-lg border border-border"
          >
            <Text
              className="text-sm"
              style={{ fontFamily: "Poppins-Medium", color: colors.textSecondary }}
            >
              Log out
            </Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Links */}
        <View className="gap-3">
          <Text className="text--h3">Screens</Text>
          <TouchableOpacity
            className="btn btn--primary"
            onPress={() => router.push("/onboarding")}
            activeOpacity={0.85}
          >
            <Text className="btn__label" style={{ color: colors.white }}>
              Onboarding Screen
            </Text>
          </TouchableOpacity>
        </View>

        {/* Color Swatches */}
        <View className="gap-3">
          <Text className="text--h3">Colors</Text>

          <View className="flex-row gap-2 flex-wrap">
            {[
              { label: "Purple", color: colors.linguaPurple },
              { label: "Deep Purple", color: colors.linguaDeepPurple },
              { label: "Blue", color: colors.linguaBlue },
              { label: "Green", color: colors.linguaGreen },
            ].map(({ label, color }) => (
              <View key={label} className="items-center gap-1">
                <View
                  className="w-14 h-14 rounded-xl"
                  style={{ backgroundColor: color }}
                />
                <Text className="text--caption">{label}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row gap-2 flex-wrap">
            {[
              { label: "Success", color: colors.success },
              { label: "Warning", color: colors.warning },
              { label: "Streak", color: colors.streak },
              { label: "Error", color: colors.error },
            ].map(({ label, color }) => (
              <View key={label} className="items-center gap-1">
                <View
                  className="w-14 h-14 rounded-xl"
                  style={{ backgroundColor: color }}
                />
                <Text className="text--caption">{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Typography Scale */}
        <View className="gap-3">
          <Text className="text--h3">Typography</Text>
          <View className="card gap-3">
            <Text className="text--h1">H1 — 32px Bold</Text>
            <Text className="text--h2">H2 — 24px SemiBold</Text>
            <Text className="text--h3">H3 — 20px SemiBold</Text>
            <Text className="text--h4">H4 — 16px Medium</Text>
            <Text className="text--body-lg">Body Large — 16px Regular</Text>
            <Text className="text--body-md">Body Medium — 14px Regular</Text>
            <Text className="text--body-sm">Body Small — 13px Regular</Text>
            <Text className="text--caption">Caption — 11px Regular</Text>
          </View>
        </View>

        {/* Badges */}
        <View className="gap-3">
          <Text className="text--h3">Badges</Text>
          <View className="flex-row gap-2 flex-wrap">
            <View className="badge badge--success">
              <Text className="badge__label" style={{ color: colors.success }}>
                Success
              </Text>
            </View>
            <View className="badge badge--warning">
              <Text className="badge__label" style={{ color: colors.warning }}>
                Warning
              </Text>
            </View>
            <View className="badge badge--error">
              <Text className="badge__label" style={{ color: colors.error }}>
                Error
              </Text>
            </View>
            <View className="badge badge--streak">
              <Text className="badge__label" style={{ color: colors.streak }}>
                Streak
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="gap-3">
          <Text className="text--h3">Progress</Text>
          <View className="progress-bar">
            <View className="progress-bar__fill" style={{ width: "65%" }} />
          </View>
          <View className="progress-bar">
            <View
              className="progress-bar__fill--success progress-bar__fill"
              style={{ width: "85%" }}
            />
          </View>
          <View className="progress-bar">
            <View
              className="progress-bar__fill--streak progress-bar__fill"
              style={{ width: "40%" }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
