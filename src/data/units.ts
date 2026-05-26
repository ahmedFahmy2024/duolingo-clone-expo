import type { Unit } from "@/types/learning";

export const UNITS: Unit[] = [
  // ─── Spanish ───────────────────────────────────────────────────────────────
  {
    id: "es-u1",
    languageCode: "es",
    order: 1,
    title: "Greetings & Basics",
    description: "Say hello, introduce yourself, and count to ten.",
    color: "#58CC02",
    lessonIds: ["es-u1-l1", "es-u1-l2", "es-u1-l3"],
  },
  {
    id: "es-u2",
    languageCode: "es",
    order: 2,
    title: "Family & People",
    description: "Talk about your family and the people around you.",
    color: "#FF9600",
    lessonIds: ["es-u2-l1", "es-u2-l2"],
  },

  // ─── French ────────────────────────────────────────────────────────────────
  {
    id: "fr-u1",
    languageCode: "fr",
    order: 1,
    title: "Greetings & Basics",
    description: "Bonjour! Learn your first French words and phrases.",
    color: "#1CB0F6",
    lessonIds: ["fr-u1-l1", "fr-u1-l2"],
  },

  // ─── Japanese ──────────────────────────────────────────────────────────────
  {
    id: "ja-u1",
    languageCode: "ja",
    order: 1,
    title: "Greetings & Basics",
    description: "Start with konnichiwa and the most essential Japanese words.",
    color: "#FF4B4B",
    lessonIds: ["ja-u1-l1", "ja-u1-l2"],
  },

  // ─── German ────────────────────────────────────────────────────────────────
  {
    id: "de-u1",
    languageCode: "de",
    order: 1,
    title: "Greetings & Basics",
    description: "Hallo! Master everyday German greetings and introductions.",
    color: "#CE82FF",
    lessonIds: ["de-u1-l1", "de-u1-l2"],
  },
];

export function getUnitsForLanguage(languageCode: string) {
  return UNITS.filter((u) => u.languageCode === languageCode).sort(
    (a, b) => a.order - b.order
  );
}

export function getUnit(unitId: string) {
  return UNITS.find((u) => u.id === unitId) ?? null;
}
