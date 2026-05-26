import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
  error?: string;
}

const CODE_LENGTH = 6;
const EMPTY_CODE = Array(CODE_LENGTH).fill("") as string[];

export default function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
  onResend,
  error,
}: Props) {
  const [code, setCode] = useState<string[]>(EMPTY_CODE);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  function handleShow() {
    setCode(EMPTY_CODE.slice());
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  async function handleChange(text: string) {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH).split("");
    const next = Array(CODE_LENGTH)
      .fill("")
      .map((_, i) => digits[i] ?? "") as string[];
    setCode(next);

    if (digits.length === CODE_LENGTH) {
      setLoading(true);
      try {
        await onVerify(digits.join(""));
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleResend() {
    if (!onResend) return;
    setCode(EMPTY_CODE.slice());
    await onResend();
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  const filled = code.filter(Boolean).length;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      onShow={handleShow}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
          className="bg-black/45"
        />

        {/* Sheet */}
        <View className="bg-white rounded-t-3xl px-6 pt-3 pb-10 items-center">
          {/* Handle */}
          <View className="w-10 h-1 rounded-full bg-border mb-4" />

          {/* Close button */}
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            className="absolute top-5 right-5"
          >
            <Ionicons name="close" size={22} color={colors.textSecondary} />
          </TouchableOpacity>

          {/* Mail icon */}
          <View className="w-16 h-16 rounded-full bg-surface items-center justify-center mb-4">
            <Ionicons name="mail-outline" size={30} color={colors.linguaPurple} />
          </View>

          <Text
            className="text-[22px] mb-2 text-center"
            style={{ fontFamily: "Poppins-Bold", color: colors.textPrimary }}
          >
            Check your email
          </Text>
          <Text
            className="text-sm text-center leading-relaxed mb-8"
            style={{ fontFamily: "Poppins-Regular", color: colors.textSecondary }}
          >
            We sent a 6-digit code to{"\n"}
            <Text style={{ fontFamily: "Poppins-SemiBold", color: colors.textPrimary }}>
              {email || "your email"}
            </Text>
          </Text>

          {/* Hidden real input — drives the number pad */}
          <TextInput
            ref={inputRef}
            value={code.join("")}
            onChangeText={handleChange}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            caretHidden
            editable={!loading}
            style={styles.hiddenInput}
          />

          {/* Visual digit boxes */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            className="flex-row gap-2.5 mb-2"
          >
            {code.map((digit, i) => (
              <View
                key={i}
                className="w-12 h-14 rounded-xl items-center justify-center"
                style={{
                  borderWidth: i === filled && filled < CODE_LENGTH ? 2 : 1.5,
                  borderColor: digit || i === filled ? colors.linguaPurple : colors.border,
                  backgroundColor: digit ? colors.background : colors.surface,
                }}
              >
                {loading && i === CODE_LENGTH - 1 ? (
                  <ActivityIndicator size="small" color={colors.linguaPurple} />
                ) : (
                  <Text
                    className="text-[22px]"
                    style={{ fontFamily: "Poppins-SemiBold", color: colors.textPrimary }}
                  >
                    {digit}
                  </Text>
                )}
              </View>
            ))}
          </TouchableOpacity>

          {/* Error message */}
          {error ? (
            <Text
              className="text-sm text-center mb-5"
              style={{ fontFamily: "Poppins-Regular", color: colors.error }}
            >
              {error}
            </Text>
          ) : (
            <View className="mb-5" />
          )}

          {/* Resend row */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleResend}
            disabled={!onResend}
            className="flex-row items-center gap-1.5"
          >
            <Ionicons name="refresh-outline" size={15} color={colors.textSecondary} />
            <Text
              className="text-sm"
              style={{ fontFamily: "Poppins-Regular", color: colors.textSecondary }}
            >
              Didn&apos;t receive it?{" "}
              <Text style={{ fontFamily: "Poppins-SemiBold", color: colors.linguaPurple }}>
                Resend code
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
});
