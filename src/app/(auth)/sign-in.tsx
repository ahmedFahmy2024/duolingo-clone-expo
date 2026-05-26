import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { colors } from "@/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function handleSignIn() {
    if (!email.trim()) return;
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="mt-2 mb-6 w-9 h-9 justify-center"
        >
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Headline */}
        <Text
          className="text-[28px] mb-1.5"
          style={{ fontFamily: "Poppins-Bold", color: colors.textPrimary }}
        >
          Welcome back
        </Text>
        <Text
          className="text-sm mb-1"
          style={{ fontFamily: "Poppins-Regular", color: colors.textSecondary }}
        >
          Sign in to continue learning ✨
        </Text>

        {/* Mascot */}
        <View className="items-center my-5">
          <Image source={images.mascotAuth} className="w-36 h-36" resizeMode="contain" />
        </View>

        {/* Email field */}
        <View className="gap-1.5">
          <Text
            className="text-[13px] mb-1"
            style={{ fontFamily: "Poppins-Medium", color: colors.textSecondary }}
          >
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="alex@gmail.com"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            style={{
              borderWidth: 1.5,
              borderColor: emailFocused ? colors.linguaPurple : colors.border,
              borderRadius: 12,
              paddingVertical: 14,
              paddingHorizontal: 16,
              fontSize: 14,
              fontFamily: "Poppins-Regular",
              color: colors.textPrimary,
              backgroundColor: colors.background,
            }}
          />
        </View>

        {/* Log In button */}
        <TouchableOpacity
          className="btn btn--primary mt-6"
          activeOpacity={0.85}
          onPress={handleSignIn}
        >
          <Text className="btn__label text-white">Log In</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-5 gap-3">
          <View className="flex-1 h-px bg-border" />
          <Text
            className="text-[13px]"
            style={{ fontFamily: "Poppins-Regular", color: colors.textSecondary }}
          >
            or continue with
          </Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        {/* Social buttons */}
        <SocialButton label="Continue with Google" icon={<FontAwesome name="google" size={20} color="#EA4335" />} />
        <SocialButton label="Continue with Facebook" icon={<FontAwesome name="facebook" size={20} color="#1877F2" />} />
        <SocialButton label="Continue with Apple" icon={<FontAwesome name="apple" size={20} color={colors.textPrimary} />} />

        {/* Footer */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-up" as never)}
          activeOpacity={0.7}
          className="mt-2"
        >
          <Text
            className="text-sm text-center"
            style={{ fontFamily: "Poppins-Regular", color: colors.textSecondary }}
          >
            Don&apos;t have an account?{" "}
            <Text style={{ fontFamily: "Poppins-SemiBold", color: colors.linguaPurple }}>
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <VerificationModal
        visible={modalVisible}
        email={email}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

function SocialButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row items-center border border-border rounded-[14px] py-3.5 px-5 mb-2.5 gap-3.5 bg-white"
    >
      <View className="w-6 items-center">{icon}</View>
      <Text
        className="text-sm"
        style={{ fontFamily: "Poppins-Medium", color: colors.textPrimary }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
