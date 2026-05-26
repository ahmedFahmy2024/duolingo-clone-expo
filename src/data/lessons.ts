import type { Lesson } from "@/types/learning";

export const LESSONS: Lesson[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // SPANISH — Unit 1: Greetings & Basics
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "es-u1-l1",
    unitId: "es-u1",
    languageCode: "es",
    type: "vocabulary",
    title: "Hello & Goodbye",
    description: "Learn the most common Spanish greetings.",
    xpReward: 10,
    goals: [
      "Say hello and goodbye in Spanish",
      "Use formal and informal greetings",
      "Respond when someone greets you",
    ],
    vocabulary: [
      { word: "hola", translation: "hello", pronunciation: "OH-lah" },
      { word: "adiós", translation: "goodbye", pronunciation: "ah-DYOS" },
      { word: "buenos días", translation: "good morning", pronunciation: "BWEH-nos DEE-as" },
      { word: "buenas noches", translation: "good night", pronunciation: "BWEH-nas NOH-ches" },
      {
        word: "por favor",
        translation: "please",
        pronunciation: "por fah-VOR",
        example: "Un café, por favor.",
        exampleTranslation: "A coffee, please.",
      },
      { word: "gracias", translation: "thank you", pronunciation: "GRAH-syahs" },
      { word: "de nada", translation: "you're welcome", pronunciation: "deh NAH-dah" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What does 'hola' mean?",
        options: ["goodbye", "hello", "please", "thank you"],
        correctIndex: 1,
      },
      {
        type: "multiple_choice",
        prompt: "How do you say 'good morning' in Spanish?",
        options: ["buenas noches", "adiós", "buenos días", "de nada"],
        correctIndex: 2,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "hola", right: "hello" },
          { left: "adiós", right: "goodbye" },
          { left: "gracias", right: "thank you" },
          { left: "de nada", right: "you're welcome" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "___, me llamo Ana.",
        answer: "Hola",
        hint: "Use the casual greeting",
      },
    ],
  },

  {
    id: "es-u1-l2",
    unitId: "es-u1",
    languageCode: "es",
    type: "phrases",
    title: "Introductions",
    description: "Tell people your name and ask theirs.",
    xpReward: 10,
    goals: [
      "Introduce yourself in Spanish",
      "Ask someone's name",
      "Say where you are from",
    ],
    phrases: [
      {
        phrase: "Me llamo ___.",
        translation: "My name is ___.",
        pronunciation: "meh YAH-moh",
        context: "Introduce yourself by name",
      },
      {
        phrase: "¿Cómo te llamas?",
        translation: "What is your name?",
        pronunciation: "KOH-moh teh YAH-mahs",
        context: "Ask someone's name informally",
      },
      {
        phrase: "¿De dónde eres?",
        translation: "Where are you from?",
        pronunciation: "deh DON-deh EH-res",
      },
      {
        phrase: "Soy de ___.",
        translation: "I am from ___.",
        pronunciation: "soy deh",
      },
      {
        phrase: "Mucho gusto.",
        translation: "Nice to meet you.",
        pronunciation: "MOO-choh GOO-stoh",
      },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "How do you say 'My name is ...' in Spanish?",
        options: ["¿Cómo te llamas?", "Me llamo ___.", "Soy de ___.", "Mucho gusto."],
        correctIndex: 1,
      },
      {
        type: "translate_sentence",
        sourceText: "What is your name?",
        sourceLanguage: "en",
        acceptedAnswers: ["¿Cómo te llamas?", "¿Cuál es tu nombre?"],
      },
      {
        type: "fill_blank",
        sentence: "Mucho ___, me llamo Carlos.",
        answer: "gusto",
        hint: "Nice to meet you",
      },
    ],
  },

  {
    id: "es-u1-l3",
    unitId: "es-u1",
    languageCode: "es",
    type: "ai_teacher",
    title: "AI Conversation Practice",
    description: "Practice greetings with your AI Spanish teacher.",
    xpReward: 20,
    goals: [
      "Hold a short greeting conversation in Spanish",
      "Use vocabulary from lessons 1 and 2",
      "Build confidence speaking",
    ],
    activities: [
      {
        type: "listen_repeat",
        targetText: "Hola, ¿cómo te llamas?",
        audioKey: "es-greeting-intro",
      },
      {
        type: "listen_repeat",
        targetText: "Me llamo ___. Mucho gusto.",
        audioKey: "es-greeting-response",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Luna, a friendly and encouraging Spanish teacher for beginners. " +
        "The student has just completed Unit 1 on greetings. " +
        "Speak slowly and clearly, using simple Spanish with English translations when needed. " +
        "Guide the student through a natural greeting conversation. " +
        "Correct mistakes gently and celebrate small wins. " +
        "Keep the session under 5 minutes and focus on confidence building.",
      intro:
        "¡Hola! I'm Luna, your Spanish teacher. Today we'll practice greetings together. Ready? Let's start!",
      teachingPoints: [
        "Formal vs informal greetings (Buenos días vs Hola)",
        "Introducing yourself with 'Me llamo'",
        "Responding to 'Mucho gusto' correctly",
        "Asking someone's name with '¿Cómo te llamas?'",
      ],
      checkQuestions: [
        "How would you greet a friend in the morning?",
        "If someone says 'Mucho gusto', what do you say back?",
        "Can you introduce yourself to me in Spanish?",
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SPANISH — Unit 2: Family & People
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "es-u2-l1",
    unitId: "es-u2",
    languageCode: "es",
    type: "vocabulary",
    title: "Family Members",
    description: "Learn Spanish words for family members.",
    xpReward: 10,
    goals: [
      "Name family members in Spanish",
      "Use el/la articles correctly",
      "Describe your family",
    ],
    vocabulary: [
      { word: "la familia", translation: "the family" },
      { word: "la madre", translation: "the mother", example: "Mi madre es amable.", exampleTranslation: "My mother is kind." },
      { word: "el padre", translation: "the father" },
      { word: "el hermano", translation: "the brother" },
      { word: "la hermana", translation: "the sister" },
      { word: "el hijo", translation: "the son" },
      { word: "la hija", translation: "the daughter" },
      { word: "los abuelos", translation: "the grandparents" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What does 'la hermana' mean?",
        options: ["the mother", "the daughter", "the sister", "the grandmother"],
        correctIndex: 2,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "la madre", right: "the mother" },
          { left: "el padre", right: "the father" },
          { left: "el hermano", right: "the brother" },
          { left: "la hija", right: "the daughter" },
        ],
      },
      {
        type: "translate_sentence",
        sourceText: "My family is big.",
        sourceLanguage: "en",
        acceptedAnswers: ["Mi familia es grande.", "Mi familia es muy grande."],
      },
    ],
  },

  {
    id: "es-u2-l2",
    unitId: "es-u2",
    languageCode: "es",
    type: "phrases",
    title: "Talking About Family",
    description: "Describe your family and relationships.",
    xpReward: 10,
    goals: [
      "Describe family size",
      "State family member names",
      "Ask about someone's family",
    ],
    phrases: [
      { phrase: "Tengo ___ hermanos.", translation: "I have ___ siblings.", context: "Use a number" },
      { phrase: "¿Tienes hermanos?", translation: "Do you have siblings?" },
      { phrase: "Mi madre se llama ___.", translation: "My mother's name is ___." },
      { phrase: "Somos una familia grande.", translation: "We are a big family." },
    ],
    activities: [
      {
        type: "fill_blank",
        sentence: "Tengo dos ___.",
        answer: "hermanos",
        hint: "siblings",
      },
      {
        type: "multiple_choice",
        prompt: "How do you ask 'Do you have siblings?' in Spanish?",
        options: [
          "¿Tienes amigos?",
          "¿Tienes hermanos?",
          "¿Cómo se llaman?",
          "¿Cuántos años tienes?",
        ],
        correctIndex: 1,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FRENCH — Unit 1: Greetings & Basics
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "fr-u1-l1",
    unitId: "fr-u1",
    languageCode: "fr",
    type: "vocabulary",
    title: "Hello & Goodbye",
    description: "Essential French greetings for every day.",
    xpReward: 10,
    goals: [
      "Greet someone in French",
      "Say goodbye in several ways",
      "Use please and thank you",
    ],
    vocabulary: [
      { word: "bonjour", translation: "hello / good day", pronunciation: "bohn-ZHOOR" },
      { word: "bonsoir", translation: "good evening", pronunciation: "bohn-SWAHR" },
      { word: "au revoir", translation: "goodbye", pronunciation: "oh ruh-VWAHR" },
      { word: "salut", translation: "hi / bye (informal)", pronunciation: "sah-LUE" },
      { word: "s'il vous plaît", translation: "please (formal)", pronunciation: "seel voo PLEH" },
      { word: "merci", translation: "thank you", pronunciation: "mehr-SEE" },
      { word: "de rien", translation: "you're welcome", pronunciation: "duh RYAHN" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What does 'bonjour' mean?",
        options: ["goodbye", "good evening", "hello", "please"],
        correctIndex: 2,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "bonjour", right: "hello" },
          { left: "au revoir", right: "goodbye" },
          { left: "merci", right: "thank you" },
          { left: "de rien", right: "you're welcome" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "___, je m'appelle Marie.",
        answer: "Bonjour",
        hint: "Common daytime greeting",
      },
    ],
  },

  {
    id: "fr-u1-l2",
    unitId: "fr-u1",
    languageCode: "fr",
    type: "phrases",
    title: "Introductions",
    description: "Introduce yourself in French.",
    xpReward: 10,
    goals: [
      "Say your name in French",
      "Ask someone their name",
      "Say how you are",
    ],
    phrases: [
      { phrase: "Je m'appelle ___.", translation: "My name is ___.", pronunciation: "zhuh mah-PEL" },
      { phrase: "Comment vous appelez-vous ?", translation: "What is your name? (formal)", pronunciation: "koh-MAHN voo zah-play-VOO" },
      { phrase: "Comment tu t'appelles ?", translation: "What is your name? (informal)" },
      { phrase: "Comment allez-vous ?", translation: "How are you? (formal)", pronunciation: "koh-MAHN tah-lay-VOO" },
      { phrase: "Je vais bien, merci.", translation: "I am fine, thank you.", pronunciation: "zhuh veh BYAHN mehr-SEE" },
      { phrase: "Enchanté(e).", translation: "Nice to meet you.", pronunciation: "ahn-shahn-TAY" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "How do you say 'My name is ...' in French?",
        options: ["Je vais bien.", "Enchanté.", "Je m'appelle ___.", "Comment tu t'appelles ?"],
        correctIndex: 2,
      },
      {
        type: "translate_sentence",
        sourceText: "Nice to meet you.",
        sourceLanguage: "en",
        acceptedAnswers: ["Enchanté.", "Enchantée.", "Enchanté(e)."],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // JAPANESE — Unit 1: Greetings & Basics
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "ja-u1-l1",
    unitId: "ja-u1",
    languageCode: "ja",
    type: "vocabulary",
    title: "Hello & Goodbye",
    description: "Your first Japanese greetings.",
    xpReward: 10,
    goals: [
      "Greet someone in Japanese",
      "Use time-of-day greetings correctly",
      "Say goodbye politely",
    ],
    vocabulary: [
      { word: "こんにちは", translation: "hello / good afternoon", pronunciation: "kon-ni-chi-wa" },
      { word: "おはよう", translation: "good morning (casual)", pronunciation: "o-ha-yo" },
      { word: "おはようございます", translation: "good morning (polite)", pronunciation: "o-ha-yo go-za-i-mas" },
      { word: "こんばんは", translation: "good evening", pronunciation: "kon-ban-wa" },
      { word: "さようなら", translation: "goodbye (formal)", pronunciation: "sa-yo-na-ra" },
      { word: "じゃあね", translation: "bye (casual)", pronunciation: "jya-a-ne" },
      { word: "ありがとう", translation: "thank you (casual)", pronunciation: "a-ri-ga-to" },
      { word: "ありがとうございます", translation: "thank you (polite)", pronunciation: "a-ri-ga-to go-za-i-mas" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What does 'こんにちは' mean?",
        options: ["good morning", "good evening", "hello / good afternoon", "goodbye"],
        correctIndex: 2,
      },
      {
        type: "multiple_choice",
        prompt: "Which is the polite way to say 'good morning'?",
        options: ["おはよう", "じゃあね", "おはようございます", "こんばんは"],
        correctIndex: 2,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "こんにちは", right: "hello" },
          { left: "さようなら", right: "goodbye" },
          { left: "ありがとう", right: "thank you" },
          { left: "こんばんは", right: "good evening" },
        ],
      },
    ],
  },

  {
    id: "ja-u1-l2",
    unitId: "ja-u1",
    languageCode: "ja",
    type: "phrases",
    title: "Introductions",
    description: "Introduce yourself in Japanese.",
    xpReward: 10,
    goals: [
      "Say your name in Japanese",
      "Use はじめまして to meet someone",
      "Ask someone's name politely",
    ],
    phrases: [
      { phrase: "はじめまして。", translation: "Nice to meet you.", pronunciation: "ha-ji-me-ma-shi-te", context: "First-time meeting" },
      { phrase: "わたしは ___ です。", translation: "I am ___.", pronunciation: "wa-ta-shi-wa ___ des" },
      { phrase: "おなまえは？", translation: "What is your name?", pronunciation: "o-na-ma-e-wa", context: "Casual" },
      { phrase: "おなまえはなんですか？", translation: "What is your name? (polite)", pronunciation: "o-na-ma-e-wa nan-des-ka" },
      { phrase: "よろしくおねがいします。", translation: "Pleased to meet you / Please treat me well.", pronunciation: "yo-ro-shi-ku o-ne-ga-i-shi-mas" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What do you say when meeting someone for the first time?",
        options: ["さようなら", "はじめまして", "おはよう", "じゃあね"],
        correctIndex: 1,
      },
      {
        type: "fill_blank",
        sentence: "わたしは ___ です。",
        answer: "Sakura",
        hint: "Insert a name",
      },
      {
        type: "translate_sentence",
        sourceText: "I am Yuki.",
        sourceLanguage: "en",
        acceptedAnswers: ["わたしは ゆき です。", "わたしはゆきです。", "ゆきです。"],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GERMAN — Unit 1: Greetings & Basics
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "de-u1-l1",
    unitId: "de-u1",
    languageCode: "de",
    type: "vocabulary",
    title: "Hello & Goodbye",
    description: "Essential German greetings.",
    xpReward: 10,
    goals: [
      "Greet someone in German",
      "Know formal vs informal greetings",
      "Say goodbye in German",
    ],
    vocabulary: [
      { word: "Hallo", translation: "hello (informal)", pronunciation: "HA-loh" },
      { word: "Guten Morgen", translation: "good morning", pronunciation: "GOO-ten MOR-gen" },
      { word: "Guten Tag", translation: "good day (formal)", pronunciation: "GOO-ten TAHK" },
      { word: "Guten Abend", translation: "good evening", pronunciation: "GOO-ten AH-bent" },
      { word: "Auf Wiedersehen", translation: "goodbye (formal)", pronunciation: "owf VEE-der-zay-en" },
      { word: "Tschüss", translation: "bye (informal)", pronunciation: "CHUES" },
      { word: "Danke", translation: "thank you", pronunciation: "DAHN-keh" },
      { word: "Bitte", translation: "please / you're welcome", pronunciation: "BI-teh" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What does 'Guten Morgen' mean?",
        options: ["good evening", "good night", "good morning", "good day"],
        correctIndex: 2,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "Hallo", right: "hello" },
          { left: "Auf Wiedersehen", right: "goodbye" },
          { left: "Danke", right: "thank you" },
          { left: "Bitte", right: "please / you're welcome" },
        ],
      },
      {
        type: "fill_blank",
        sentence: "___ Tag! Wie heißen Sie?",
        answer: "Guten",
        hint: "Formal daytime greeting (first word only)",
      },
    ],
  },

  {
    id: "de-u1-l2",
    unitId: "de-u1",
    languageCode: "de",
    type: "phrases",
    title: "Introductions",
    description: "Introduce yourself in German.",
    xpReward: 10,
    goals: [
      "Say your name in German",
      "Ask someone's name formally and informally",
      "Say where you are from",
    ],
    phrases: [
      { phrase: "Ich heiße ___.", translation: "My name is ___.", pronunciation: "ikh HY-seh" },
      { phrase: "Wie heißen Sie?", translation: "What is your name? (formal)", pronunciation: "vee HY-sen zee" },
      { phrase: "Wie heißt du?", translation: "What is your name? (informal)", pronunciation: "vee HYst doo" },
      { phrase: "Woher kommen Sie?", translation: "Where are you from? (formal)", pronunciation: "VOH-hair KOM-en zee" },
      { phrase: "Ich komme aus ___.", translation: "I come from ___.", pronunciation: "ikh KOM-eh ows" },
      { phrase: "Freut mich.", translation: "Nice to meet you.", pronunciation: "froyt mikh" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "How do you say 'My name is ...' in German?",
        options: ["Freut mich.", "Ich komme aus ___.", "Wie heißt du?", "Ich heiße ___."],
        correctIndex: 3,
      },
      {
        type: "translate_sentence",
        sourceText: "Nice to meet you.",
        sourceLanguage: "en",
        acceptedAnswers: ["Freut mich.", "Es freut mich.", "Schön, Sie kennenzulernen."],
      },
      {
        type: "fill_blank",
        sentence: "Ich ___ aus Deutschland.",
        answer: "komme",
        hint: "I come from ...",
      },
    ],
  },
];

export function getLesson(lessonId: string) {
  return LESSONS.find((l) => l.id === lessonId) ?? null;
}

export function getLessonsForUnit(unitId: string) {
  return LESSONS.filter((l) => l.unitId === unitId);
}

export function getLessonsForLanguage(languageCode: string) {
  return LESSONS.filter((l) => l.languageCode === languageCode);
}
