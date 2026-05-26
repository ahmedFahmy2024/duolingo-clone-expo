import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-50">
      <View className="bg-white rounded-2xl p-8 shadow-md w-72 items-center gap-4">
        <View className="bg-blue-500 rounded-full w-16 h-16 items-center justify-center">
          <Text className="text-white text-3xl">🦜</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-800">NativeWind Works!</Text>
        <Text className="text-sm text-gray-500 text-center">
          Tailwind classes are running on React Native.
        </Text>
        <View className="bg-blue-500 rounded-xl px-6 py-3 w-full items-center">
          <Text className="text-white font-semibold text-base">Get Started</Text>
        </View>
      </View>
    </View>
  );
}
