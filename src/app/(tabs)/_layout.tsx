import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { CustomTabBar } from "@/components/navigation/CustomTabBar";
import { useLanguageStore } from "@/store/languageStore";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { selectedLanguage, _hasHydrated } = useLanguageStore();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/onboarding" />;
  if (!_hasHydrated) return null;
  if (!selectedLanguage) return <Redirect href="/language-selection" />;

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    />
  );
}
