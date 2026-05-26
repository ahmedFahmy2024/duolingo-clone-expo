import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text--h3 text-text-primary">Home</Text>
      </View>
    </SafeAreaView>
  );
}
