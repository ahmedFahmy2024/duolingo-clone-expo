import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants/images";
import { LANGUAGES } from "@/data/languages";
import { colors } from "@/theme";
import type { Language, LanguageCode } from "@/types/learning";
import { useLanguageStore } from "@/store/languageStore";

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const setSelectedLanguage = useLanguageStore((s) => s.setSelectedLanguage);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<LanguageCode | null>(null);

  const filtered = LANGUAGES.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleConfirm() {
    if (!selected) return;
    setSelectedLanguage(selected);
    router.replace("/");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="w-9 h-9 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text--h4 flex-1 text-center">
          Choose a language
        </Text>
        <View className="w-9" />
      </View>

      {/* Search */}
      <View className="px-5 mb-5">
        <View className="search-input">
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <TextInput
            className="search-input__text"
            placeholder="Search languages"
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Language List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text className="text--h4 mb-3">Popular</Text>
        }
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <LanguageRow
            item={item}
            isSelected={selected === item.code}
            onPress={() => setSelected(item.code)}
          />
        )}
        ListFooterComponent={
          <View className="h-3" />
        }
      />

      {/* Confirm button */}
      <View className="px-5 pb-4">
        <TouchableOpacity
          className="btn btn--secondary"
          activeOpacity={0.85}
          onPress={handleConfirm}
          disabled={!selected}
          style={[styles.confirmBtn, !selected && styles.confirmBtnDisabled]}
        >
          <Ionicons name="checkmark-circle" size={22} color={colors.linguaPurple} />
          <Text className="btn__label ml-2" style={{ color: colors.textPrimary }}>
            Confirm selection
          </Text>
        </TouchableOpacity>
      </View>

      {/* Earth illustration — full width, no padding */}
      <Image
        source={images.earth}
        style={styles.earthImage}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
}

function LanguageRow({
  item,
  isSelected,
  onPress,
}: {
  item: Language;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className={isSelected ? "language-card language-card--selected" : "language-card"}
      activeOpacity={0.75}
      onPress={onPress}
    >
      {/* Flag */}
      <Text className="language-card__flag">{item.flag}</Text>

      {/* Name + learners */}
      <View className="flex-1 ml-3">
        <Text className="text--h4">{item.name}</Text>
        <Text className="text--body-sm">{item.learners}</Text>
      </View>

      {/* Trailing indicator */}
      {isSelected ? (
        <View className="language-card__check">
          <Ionicons name="checkmark" size={16} color={colors.white} />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // SafeAreaView does not support className — inline style required
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // TextInput: padding:0 and flex:1 need style prop
  searchInput: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#001132",
    flex: 1,
    padding: 0,
  },
  // FlatList contentContainerStyle prop — no className equivalent
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  // Image requires style prop — full bleed, no surrounding padding
  earthImage: {
    width: "100%",
    height: 160,
  },
  // TouchableOpacity uses style prop for pressed-state variants
  confirmBtn: {
    width: "100%",
  },
  confirmBtnDisabled: {
    opacity: 0.45,
  },
});
