import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { colors } from "@/theme";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
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

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function handleSignUp() {
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
          Create your account
        </Text>
        <Text
          className="text-sm mb-1"
          style={{ fontFamily: "Poppins-Regular", color: colors.textSecondary }}
        >
          Start your language journey today ✨
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

        {/* Password field */}
        <View className="gap-1.5 mt-3">
          <Text
            className="text-[13px] mb-1"
            style={{ fontFamily: "Poppins-Medium", color: colors.textSecondary }}
          >
            Password
          </Text>
          <View
            className="flex-row items-center rounded-xl px-4"
            style={{
              borderWidth: 1.5,
              borderColor: passwordFocused ? colors.linguaPurple : colors.border,
              paddingVertical: 14,
              backgroundColor: colors.background,
            }}
          >
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={{
                flex: 1,
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                color: colors.textPrimary,
                padding: 0,
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)} activeOpacity={0.7}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up button */}
        <TouchableOpacity
          className="btn btn--primary mt-6"
          activeOpacity={0.85}
          onPress={handleSignUp}
        >
          <Text className="btn__label text-white">Sign Up</Text>
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
          onPress={() => router.push("/(auth)/sign-in" as never)}
          activeOpacity={0.7}
          className="mt-2"
        >
          <Text
            className="text-sm text-center"
            style={{ fontFamily: "Poppins-Regular", color: colors.textSecondary }}
          >
            Already have an account?{" "}
            <Text style={{ fontFamily: "Poppins-SemiBold", color: colors.linguaPurple }}>
              Log in
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
