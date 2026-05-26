import { images } from "@/constants/images";
import { colors } from "@/theme";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo Row */}
      <View className="flex-row items-center justify-center gap-2 px-6 pt-4">
        <Image source={images.mascotLogo} className="w-9 h-9" resizeMode="contain" />
        <Text style={{ color: colors.textPrimary, fontFamily: "Poppins-Bold" }} className="text-2xl font-bold">
          lingua
        </Text>
      </View>

      {/* Headline */}
      <View className="px-6 mt-8">
        <Text style={{ fontFamily: "Poppins-Bold", color: colors.textPrimary }} className="text-[32px] font-bold leading-tight">
          Your AI language{"\n"}
          <Text style={{ color: colors.linguaPurple, fontFamily: "Poppins-Bold" }} className="text-[32px] font-bold">
            teacher
          </Text>
          <Text style={{ fontFamily: "Poppins-Bold", color: colors.textPrimary }} className="text-[32px] font-bold">.</Text>
        </Text>
        <Text style={{ color: colors.textSecondary, fontFamily: "Poppins-Regular" }} className="text-sm mt-3 leading-relaxed">
          Real conversations, personalized{"\n"}lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Mascot Illustration with Speech Bubbles */}
      <View className="flex-1 items-center justify-center mt-4 relative">
        {/* Hello bubble — left */}
        <View className="absolute left-5 top-[15%] bg-white rounded-[20px] px-4 py-2 z-10" style={styles.bubble}>
          <Text style={{ fontFamily: "Poppins-SemiBold", color: colors.textPrimary }} className="text-sm font-semibold">
            Hello!
          </Text>
        </View>

        {/* ¡Hola! bubble — top right */}
        <View className="absolute right-5 top-[5%] bg-white rounded-[20px] px-4 py-2 z-10" style={styles.bubble}>
          <Text style={{ fontFamily: "Poppins-SemiBold", color: colors.textPrimary }} className="text-sm font-semibold">
            ¡Hola!
          </Text>
        </View>

        <Image
          source={images.mascotWelcome}
          className="w-72 h-72"
          resizeMode="contain"
        />

        {/* 你好! bubble — bottom right */}
        <View className="absolute right-6 bottom-[15%] bg-white rounded-[20px] px-4 py-2 z-10" style={styles.bubble}>
          <Text style={{ fontFamily: "Poppins-SemiBold", color: "#E53935" }} className="text-sm font-semibold">
            你好!
          </Text>
        </View>
      </View>

      {/* CTA Button */}
      <View className="px-6 pb-6 mt-auto">
        <TouchableOpacity
          className="btn btn--primary"
          activeOpacity={0.85}
          onPress={() => router.push("/(auth)/sign-in" as never)}
        >
          <Text className="btn__label text-white">Get Started</Text>
          <Text style={{ color: colors.white }} className="text-2xl font-semibold leading-none ml-2">›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  bubble: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
