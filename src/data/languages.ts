import type { Language } from "@/types/learning";

export const LANGUAGES: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    totalUnits: 5,
    learners: "28.4M learners",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    totalUnits: 5,
    learners: "19.4M learners",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    totalUnits: 5,
    learners: "12.7M learners",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    totalUnits: 5,
    learners: "8.1M learners",
  },
];

export function getLanguage(code: string) {
  return LANGUAGES.find((l) => l.code === code) ?? null;
}
