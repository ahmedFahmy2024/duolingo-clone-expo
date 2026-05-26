import { useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import type { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

const CIRCLE_SIZE = 48;
const TAB_COUNT = 5;

type TabConfig = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const TAB_CONFIG: TabConfig[] = [
  { label: "Home", icon: "home-outline", activeIcon: "home" },
  { label: "Learn", icon: "book-outline", activeIcon: "book" },
  { label: "AI Teacher", icon: "school-outline", activeIcon: "school" },
  { label: "Chat", icon: "chatbubble-outline", activeIcon: "chatbubble" },
  { label: "Profile", icon: "person-outline", activeIcon: "person" },
];

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  // Both shared values live on the UI thread — safe to read in worklets
  const circleX = useSharedValue(0);
  const barWidth = useSharedValue(0);

  // Update circle position whenever active tab changes (after mount)
  useEffect(() => {
    if (barWidth.get() === 0) return;
    const itemWidth = barWidth.get() / TAB_COUNT;
    const target = itemWidth * state.index + itemWidth / 2 - CIRCLE_SIZE / 2;
    circleX.set(withSpring(target, { damping: 20, stiffness: 200, mass: 0.8 }));
  }, [state.index, circleX, barWidth]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: circleX.get() }],
  }));

  function onLayout(event: { nativeEvent: { layout: { width: number } } }) {
    const width = event.nativeEvent.layout.width;
    barWidth.set(width);
    // Snap circle to correct position immediately on first layout
    const itemWidth = width / TAB_COUNT;
    circleX.set(itemWidth * state.index + itemWidth / 2 - CIRCLE_SIZE / 2);
  }

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom > 0 ? insets.bottom : 8 },
      ]}
      onLayout={onLayout}
    >
      <Animated.View style={[styles.activeCircle, circleStyle]} />

      {state.routes.map((route: { key: string; name: string }, index: number) => {
        const config = TAB_CONFIG[index];
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        function onPress() {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            style={styles.tabItem}
          >
            {/* Icon box — always CIRCLE_SIZE so it aligns with the circle */}
            <View style={styles.tabContent}>
              <Ionicons
                name={isFocused ? config.activeIcon : config.icon}
                size={22}
                color={isFocused ? colors.white : colors.textSecondary}
              />
            </View>
            {/* Label sits below the icon box, only when inactive */}
            {!isFocused && (
              <Text style={styles.label} numberOfLines={1}>
                {config.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  activeCircle: {
    position: "absolute",
    // container paddingTop(8) + tabItem height(64)/2 - CIRCLE_SIZE/2 = 8+32-24 = 16
    top: 16,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.linguaPurple,
    zIndex: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 8,
    zIndex: 1,
  },
  tabContent: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    fontFamily: "Poppins-Medium",
    color: colors.textSecondary,
    lineHeight: 13,
  },
});
