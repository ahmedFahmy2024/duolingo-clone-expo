// ─── Language ────────────────────────────────────────────────────────────────

export type LanguageCode = "es" | "fr" | "ja" | "de";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string; // emoji flag
  totalUnits: number;
  learners: string; // formatted learner count e.g. "28.4M learners"
}

// ─── Vocabulary & Phrases ─────────────────────────────────────────────────────

export interface VocabItem {
  word: string;
  translation: string;
  pronunciation?: string; // romanized / IPA hint
  example?: string; // sentence using the word in target language
  exampleTranslation?: string;
}

export interface PhraseItem {
  phrase: string;
  translation: string;
  pronunciation?: string;
  context?: string; // short note: "used when greeting someone"
}

// ─── Activity ─────────────────────────────────────────────────────────────────

export type ActivityType =
  | "multiple_choice" // pick the correct translation
  | "match_pairs" // drag-match word ↔ translation
  | "fill_blank" // complete the sentence
  | "listen_repeat" // audio → repeat (future)
  | "translate_sentence"; // type full translation

export interface MultipleChoiceActivity {
  type: "multiple_choice";
  prompt: string; // e.g. "What does 'hola' mean?"
  options: string[]; // 4 choices
  correctIndex: number;
}

export interface MatchPairsActivity {
  type: "match_pairs";
  pairs: { left: string; right: string }[];
}

export interface FillBlankActivity {
  type: "fill_blank";
  sentence: string; // use ___ as the blank
  answer: string;
  hint?: string;
}

export interface ListenRepeatActivity {
  type: "listen_repeat";
  targetText: string;
  audioKey?: string; // reserved for future TTS / audio asset key
}

export interface TranslateSentenceActivity {
  type: "translate_sentence";
  sourceText: string;
  sourceLanguage: "en" | LanguageCode;
  acceptedAnswers: string[]; // multiple valid translations
}

export type Activity =
  | MultipleChoiceActivity
  | MatchPairsActivity
  | FillBlankActivity
  | ListenRepeatActivity
  | TranslateSentenceActivity;

// ─── AI Teacher Prompt ────────────────────────────────────────────────────────

export interface AITeacherPrompt {
  /**
   * System-level instruction sent to the Vision Agent / LLM for this lesson.
   * Describes the teacher persona, topic focus, and interaction style.
   */
  systemPrompt: string;
  /**
   * Opening line the AI teacher speaks at the start of the lesson.
   */
  intro: string;
  /**
   * Key teaching points the AI should cover during the session.
   */
  teachingPoints: string[];
  /**
   * Suggested questions the AI can ask the learner to check comprehension.
   */
  checkQuestions: string[];
}

// ─── Lesson ───────────────────────────────────────────────────────────────────

export type LessonType = "vocabulary" | "phrases" | "grammar" | "ai_teacher";

export interface Lesson {
  id: string; // e.g. "es-u1-l1"
  unitId: string;
  languageCode: LanguageCode;
  type: LessonType;
  title: string;
  description: string;
  xpReward: number;
  /** Ordered list of activities that make up this lesson. */
  activities: Activity[];
  /** Optional vocabulary reference shown in the lesson */
  vocabulary?: VocabItem[];
  /** Optional phrase reference shown in the lesson */
  phrases?: PhraseItem[];
  /** Goals displayed to the learner before the lesson starts */
  goals: string[];
  /** Present only on ai_teacher lessons */
  aiTeacherPrompt?: AITeacherPrompt;
}

// ─── Unit ─────────────────────────────────────────────────────────────────────

export interface Unit {
  id: string; // e.g. "es-u1"
  languageCode: LanguageCode;
  order: number; // 1-based display order
  title: string;
  description: string;
  color: string; // hex — used for unit card accent
  lessonIds: string[];
}
