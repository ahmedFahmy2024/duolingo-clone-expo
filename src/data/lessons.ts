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
        "You are Luna, a warm and upbeat Spanish teacher for beginners. " +
        "This lesson covers Unit 1 greetings and introductions only — stay strictly within that scope. " +
        "Speak mostly English. Introduce one Spanish word or phrase at a time with its English translation, " +
        "then ask the student to repeat it. Use contractions and short sentences. " +
        "If the student makes a mistake, correct it gently and ask them to try again before moving on. " +
        "Keep each reply to one or two sentences and wait for the student's response before continuing.",
      intro:
        "Hey! I'm Luna, your Spanish teacher. Today we're practising greetings — the stuff you'd use every single day. Ready to jump in?",
      teachingPoints: [
        "Hola vs Buenos días — casual vs morning greeting",
        "Me llamo ___ — introducing yourself",
        "¿Cómo te llamas? — asking someone's name",
        "Mucho gusto — nice to meet you",
      ],
      checkQuestions: [
        "How would you say hello to a friend?",
        "Can you introduce yourself to me in Spanish right now?",
        "If I say 'Mucho gusto', what do you say back?",
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

  {
    id: "fr-u1-l3",
    unitId: "fr-u1",
    languageCode: "fr",
    type: "vocabulary",
    title: "Numbers 1–10",
    description: "Count to ten in French.",
    xpReward: 10,
    goals: [
      "Count from one to ten in French",
      "Recognize written number words",
      "Use numbers in simple sentences",
    ],
    vocabulary: [
      { word: "un", translation: "one", pronunciation: "uhn" },
      { word: "deux", translation: "two", pronunciation: "duh" },
      { word: "trois", translation: "three", pronunciation: "twah" },
      { word: "quatre", translation: "four", pronunciation: "KAH-truh" },
      { word: "cinq", translation: "five", pronunciation: "sank" },
      { word: "six", translation: "six", pronunciation: "sees" },
      { word: "sept", translation: "seven", pronunciation: "set" },
      { word: "huit", translation: "eight", pronunciation: "weet" },
      { word: "neuf", translation: "nine", pronunciation: "nuhf" },
      { word: "dix", translation: "ten", pronunciation: "dees" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What does 'cinq' mean?",
        options: ["four", "five", "six", "seven"],
        correctIndex: 1,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "un", right: "one" },
          { left: "trois", right: "three" },
          { left: "sept", right: "seven" },
          { left: "dix", right: "ten" },
        ],
      },
    ],
  },

  {
    id: "fr-u1-l4",
    unitId: "fr-u1",
    languageCode: "fr",
    type: "vocabulary",
    title: "Colors",
    description: "Learn the colors in French.",
    xpReward: 10,
    goals: [
      "Name common colors in French",
      "Describe objects using color adjectives",
      "Understand color agreement rules",
    ],
    vocabulary: [
      { word: "rouge", translation: "red", pronunciation: "roozh" },
      { word: "bleu", translation: "blue", pronunciation: "bluh" },
      { word: "vert", translation: "green", pronunciation: "vehr" },
      { word: "jaune", translation: "yellow", pronunciation: "zhohn" },
      { word: "noir", translation: "black", pronunciation: "nwahr" },
      { word: "blanc", translation: "white", pronunciation: "blahn" },
      { word: "orange", translation: "orange", pronunciation: "oh-RAHNZH" },
      { word: "violet", translation: "purple", pronunciation: "vyoh-LEH" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What color is 'rouge'?",
        options: ["blue", "green", "red", "yellow"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Le ciel est ___.",
        answer: "bleu",
        hint: "The sky is ... (color of the sky)",
      },
    ],
  },

  {
    id: "fr-u1-l5",
    unitId: "fr-u1",
    languageCode: "fr",
    type: "phrases",
    title: "At the Café",
    description: "Order food and drinks at a French café.",
    xpReward: 15,
    goals: [
      "Order a drink or food in French",
      "Ask for the bill politely",
      "Understand a menu",
    ],
    phrases: [
      { phrase: "Un café, s'il vous plaît.", translation: "A coffee, please.", pronunciation: "uhn kah-FAY seel voo PLEH" },
      { phrase: "L'addition, s'il vous plaît.", translation: "The bill, please.", pronunciation: "lah-dee-SYOHN seel voo PLEH" },
      { phrase: "Je voudrais ___.", translation: "I would like ___.", pronunciation: "zhuh voo-DREH" },
      { phrase: "C'est combien ?", translation: "How much is it?", pronunciation: "seh kom-BYAHN" },
      { phrase: "Avez-vous une table ?", translation: "Do you have a table?", pronunciation: "ah-vay-VOO ewn TAH-bluh" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "How do you ask for the bill?",
        options: ["Un café, s'il vous plaît.", "Je voudrais un thé.", "L'addition, s'il vous plaît.", "C'est combien ?"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Je ___ un croissant.",
        answer: "voudrais",
        hint: "I would like...",
      },
    ],
  },

  {
    id: "fr-u1-l6",
    unitId: "fr-u1",
    languageCode: "fr",
    type: "ai_teacher",
    title: "AI Conversation Practice",
    description: "Practice your French with an AI conversation partner.",
    xpReward: 20,
    goals: [
      "Hold a short conversation in French",
      "Use greetings and introductions naturally",
      "Build speaking confidence",
    ],
    activities: [
      {
        type: "listen_repeat",
        targetText: "Bonjour! Comment allez-vous ?",
        audioKey: "fr-greeting-intro",
      },
      {
        type: "listen_repeat",
        targetText: "Je vais bien, merci. Et vous ?",
        audioKey: "fr-greeting-response",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Luna, a warm and energetic French teacher for absolute beginners. " +
        "This lesson covers Unit 1 French greetings and introductions only — stay strictly within that scope. " +
        "Speak mostly English. Introduce one French word or phrase at a time with its English meaning and a simple pronunciation tip, " +
        "then ask the student to repeat it. Use contractions and short natural sentences. " +
        "If the student makes a mistake, correct it gently and ask them to try once more before moving on. " +
        "Keep each reply to one or two sentences and wait for the student's response before continuing.",
      intro:
        "Hey there! I'm Luna, your French teacher. We're starting with the basics today — greetings you'll use straight away. Ready?",
      teachingPoints: [
        "Bonjour vs Salut — formal vs casual hello",
        "Je m'appelle ___ — saying your name",
        "Comment tu t'appelles ? — asking someone's name",
        "Enchanté(e) — nice to meet you",
      ],
      checkQuestions: [
        "How would you say hello to a stranger in French?",
        "Can you tell me your name in French?",
        "What do you say when you meet someone for the first time?",
      ],
    },
  },

  // ── French Unit 2: Daily Life ──────────────────────────────────────────────
  {
    id: "fr-u2-l1",
    unitId: "fr-u2",
    languageCode: "fr",
    type: "vocabulary",
    title: "Food & Drinks",
    description: "Essential vocabulary for food and drinks.",
    xpReward: 10,
    goals: ["Name common foods in French", "Order food at a restaurant", "Understand a French menu"],
    vocabulary: [
      { word: "le pain", translation: "bread", pronunciation: "luh pahn" },
      { word: "le fromage", translation: "cheese", pronunciation: "luh froh-MAZH" },
      { word: "le vin", translation: "wine", pronunciation: "luh vahn" },
      { word: "l'eau", translation: "water", pronunciation: "loh" },
      { word: "le poulet", translation: "chicken", pronunciation: "luh poo-LEH" },
      { word: "les légumes", translation: "vegetables", pronunciation: "leh leh-GEWM" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What does 'le pain' mean?",
        options: ["wine", "cheese", "bread", "water"],
        correctIndex: 2,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "le fromage", right: "cheese" },
          { left: "le vin", right: "wine" },
          { left: "l'eau", right: "water" },
          { left: "le poulet", right: "chicken" },
        ],
      },
    ],
  },

  {
    id: "fr-u2-l2",
    unitId: "fr-u2",
    languageCode: "fr",
    type: "vocabulary",
    title: "Days of the Week",
    description: "Learn the days of the week in French.",
    xpReward: 10,
    goals: ["Say all seven days in French", "Ask what day it is", "Discuss weekly plans"],
    vocabulary: [
      { word: "lundi", translation: "Monday", pronunciation: "luhn-DEE" },
      { word: "mardi", translation: "Tuesday", pronunciation: "mar-DEE" },
      { word: "mercredi", translation: "Wednesday", pronunciation: "mehr-kruh-DEE" },
      { word: "jeudi", translation: "Thursday", pronunciation: "zhuh-DEE" },
      { word: "vendredi", translation: "Friday", pronunciation: "vahn-druh-DEE" },
      { word: "samedi", translation: "Saturday", pronunciation: "sahm-DEE" },
      { word: "dimanche", translation: "Sunday", pronunciation: "dee-MAHNSH" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "Which day is 'vendredi'?",
        options: ["Thursday", "Saturday", "Friday", "Wednesday"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "fr-u2-l3",
    unitId: "fr-u2",
    languageCode: "fr",
    type: "phrases",
    title: "Family & Friends",
    description: "Talk about your family and friends in French.",
    xpReward: 10,
    goals: ["Name family members in French", "Describe relationships", "Talk about your family size"],
    phrases: [
      { phrase: "J'ai un frère.", translation: "I have a brother.", pronunciation: "zhay uhn frehr" },
      { phrase: "Ma famille est grande.", translation: "My family is big.", pronunciation: "mah fah-MEE eh GRAHND" },
      { phrase: "C'est mon ami.", translation: "This is my friend (male).", pronunciation: "seh mohn ah-MEE" },
    ],
    activities: [
      {
        type: "fill_blank",
        sentence: "J'ai une ___.",
        answer: "sœur",
        hint: "I have a sister",
      },
    ],
  },

  {
    id: "fr-u2-l4",
    unitId: "fr-u2",
    languageCode: "fr",
    type: "vocabulary",
    title: "Travel & Directions",
    description: "Navigate and ask for directions in French.",
    xpReward: 15,
    goals: ["Ask for directions in French", "Understand basic directions", "Name key places in a city"],
    vocabulary: [
      { word: "à gauche", translation: "to the left", pronunciation: "ah gohsh" },
      { word: "à droite", translation: "to the right", pronunciation: "ah drwat" },
      { word: "tout droit", translation: "straight ahead", pronunciation: "too drwah" },
      { word: "la gare", translation: "the train station", pronunciation: "lah gar" },
      { word: "l'hôtel", translation: "the hotel", pronunciation: "loh-TEL" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "How do you say 'to the left'?",
        options: ["tout droit", "à droite", "à gauche", "la gare"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "fr-u2-l5",
    unitId: "fr-u2",
    languageCode: "fr",
    type: "phrases",
    title: "Shopping",
    description: "Shop and ask about prices in French.",
    xpReward: 10,
    goals: ["Ask for a price in French", "Say what you want to buy", "Understand shop vocabulary"],
    phrases: [
      { phrase: "C'est combien ?", translation: "How much is it?", pronunciation: "seh kom-BYAHN" },
      { phrase: "Je prends ça.", translation: "I'll take this.", pronunciation: "zhuh prahn sah" },
      { phrase: "Avez-vous ça en rouge ?", translation: "Do you have this in red?", pronunciation: "ah-vay-VOO sah ahn roozh" },
    ],
    activities: [
      {
        type: "translate_sentence",
        sourceText: "How much is it?",
        sourceLanguage: "en",
        acceptedAnswers: ["C'est combien ?", "C'est combien?"],
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

  {
    id: "ja-u1-l3",
    unitId: "ja-u1",
    languageCode: "ja",
    type: "vocabulary",
    title: "Numbers 1–10",
    description: "Count to ten in Japanese.",
    xpReward: 10,
    goals: ["Count from one to ten in Japanese", "Recognize kanji numbers", "Use numbers in context"],
    vocabulary: [
      { word: "いち", translation: "one", pronunciation: "i-chi" },
      { word: "に", translation: "two", pronunciation: "ni" },
      { word: "さん", translation: "three", pronunciation: "san" },
      { word: "し / よん", translation: "four", pronunciation: "shi / yon" },
      { word: "ご", translation: "five", pronunciation: "go" },
      { word: "ろく", translation: "six", pronunciation: "ro-ku" },
      { word: "しち / なな", translation: "seven", pronunciation: "shi-chi / na-na" },
      { word: "はち", translation: "eight", pronunciation: "ha-chi" },
      { word: "く / きゅう", translation: "nine", pronunciation: "ku / kyuu" },
      { word: "じゅう", translation: "ten", pronunciation: "jyuu" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What does 'ご' mean?",
        options: ["four", "five", "six", "seven"],
        correctIndex: 1,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "いち", right: "one" },
          { left: "さん", right: "three" },
          { left: "ろく", right: "six" },
          { left: "じゅう", right: "ten" },
        ],
      },
    ],
  },

  {
    id: "ja-u1-l4",
    unitId: "ja-u1",
    languageCode: "ja",
    type: "vocabulary",
    title: "Colors",
    description: "Learn the colors in Japanese.",
    xpReward: 10,
    goals: ["Name colors in Japanese", "Use color adjectives", "Describe everyday objects"],
    vocabulary: [
      { word: "あか", translation: "red", pronunciation: "a-ka" },
      { word: "あお", translation: "blue", pronunciation: "a-o" },
      { word: "きいろ", translation: "yellow", pronunciation: "ki-i-ro" },
      { word: "しろ", translation: "white", pronunciation: "shi-ro" },
      { word: "くろ", translation: "black", pronunciation: "ku-ro" },
      { word: "みどり", translation: "green", pronunciation: "mi-do-ri" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What color is 'あか'?",
        options: ["blue", "green", "red", "yellow"],
        correctIndex: 2,
      },
    ],
  },

  {
    id: "ja-u1-l5",
    unitId: "ja-u1",
    languageCode: "ja",
    type: "phrases",
    title: "At a Restaurant",
    description: "Order food and ask for the bill in Japanese.",
    xpReward: 15,
    goals: ["Order food in Japanese", "Ask for the bill", "Express food preferences"],
    phrases: [
      { phrase: "これをください。", translation: "This one, please.", pronunciation: "ko-re-o ku-da-sa-i" },
      { phrase: "おかんじょうをください。", translation: "The bill, please.", pronunciation: "o-kan-jo-o-o ku-da-sa-i" },
      { phrase: "おいしい！", translation: "Delicious!", pronunciation: "o-i-shi-i" },
      { phrase: "メニューをみせてください。", translation: "Please show me the menu.", pronunciation: "me-nyuu-o mi-se-te ku-da-sa-i" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "How do you say 'Delicious!' in Japanese?",
        options: ["ありがとう", "おいしい！", "ください", "さようなら"],
        correctIndex: 1,
      },
    ],
  },

  {
    id: "ja-u1-l6",
    unitId: "ja-u1",
    languageCode: "ja",
    type: "ai_teacher",
    title: "AI Conversation Practice",
    description: "Practice Japanese conversation with your AI teacher.",
    xpReward: 20,
    goals: ["Hold a short conversation in Japanese", "Use greetings naturally", "Build speaking confidence"],
    activities: [
      {
        type: "listen_repeat",
        targetText: "こんにちは！おなまえはなんですか？",
        audioKey: "ja-greeting-intro",
      },
      {
        type: "listen_repeat",
        targetText: "わたしは ___ です。よろしく！",
        audioKey: "ja-greeting-response",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Luna, a warm and encouraging Japanese teacher for absolute beginners. " +
        "This lesson covers Unit 1 Japanese greetings and introductions only — stay strictly within that scope. " +
        "Speak mostly English. Introduce one Japanese word or phrase at a time with its English meaning and romaji pronunciation, " +
        "then ask the student to repeat it. Use contractions and short natural sentences. " +
        "If the student makes a mistake, correct it gently and ask them to try again before moving on. " +
        "Keep each reply to one or two sentences and wait for the student's response before continuing.",
      intro:
        "Hi! I'm Luna, your Japanese teacher. Japanese greetings are so fun — let's start with the ones you'd use every day. Ready?",
      teachingPoints: [
        "こんにちは (konnichiwa) — hello / good afternoon",
        "おはようございます (ohayou gozaimasu) — polite good morning",
        "はじめまして (hajimemashite) — nice to meet you",
        "わたしは ___ です (watashi wa ___ desu) — I am ___",
      ],
      checkQuestions: [
        "How do you say good morning politely in Japanese?",
        "Can you introduce yourself to me in Japanese?",
        "What do you say when you meet someone for the very first time?",
      ],
    },
  },

  // ── Japanese Unit 2: Numbers & Time ──────────────────────────────────────
  {
    id: "ja-u2-l1",
    unitId: "ja-u2",
    languageCode: "ja",
    type: "vocabulary",
    title: "Numbers 11–100",
    description: "Count beyond ten in Japanese.",
    xpReward: 10,
    goals: ["Count from 11 to 100", "Form compound numbers", "Use numbers in daily context"],
    vocabulary: [
      { word: "じゅういち", translation: "eleven", pronunciation: "jyuu-i-chi" },
      { word: "じゅうに", translation: "twelve", pronunciation: "jyuu-ni" },
      { word: "にじゅう", translation: "twenty", pronunciation: "ni-jyuu" },
      { word: "ひゃく", translation: "one hundred", pronunciation: "hya-ku" },
    ],
    activities: [
      { type: "multiple_choice", prompt: "What does 'にじゅう' mean?", options: ["twelve", "twenty", "two hundred", "thirty"], correctIndex: 1 },
    ],
  },

  {
    id: "ja-u2-l2",
    unitId: "ja-u2",
    languageCode: "ja",
    type: "phrases",
    title: "Telling the Time",
    description: "Ask and tell the time in Japanese.",
    xpReward: 10,
    goals: ["Ask what time it is", "Say the hour in Japanese", "Understand AM and PM"],
    phrases: [
      { phrase: "いまなんじですか？", translation: "What time is it now?", pronunciation: "i-ma nan-ji des-ka" },
      { phrase: "___ じです。", translation: "It is ___ o'clock.", pronunciation: "___ ji des" },
      { phrase: "ごぜん", translation: "AM (morning)", pronunciation: "go-zen" },
      { phrase: "ごご", translation: "PM (afternoon)", pronunciation: "go-go" },
    ],
    activities: [
      { type: "fill_blank", sentence: "いまさんじ___。", answer: "です", hint: "It is three o'clock" },
    ],
  },

  {
    id: "ja-u2-l3",
    unitId: "ja-u2",
    languageCode: "ja",
    type: "vocabulary",
    title: "Days of the Week",
    description: "Learn the days of the week in Japanese.",
    xpReward: 10,
    goals: ["Say all seven days in Japanese", "Ask what day it is", "Plan the week"],
    vocabulary: [
      { word: "げつようび", translation: "Monday", pronunciation: "ge-tsu-yo-o-bi" },
      { word: "かようび", translation: "Tuesday", pronunciation: "ka-yo-o-bi" },
      { word: "すいようび", translation: "Wednesday", pronunciation: "su-i-yo-o-bi" },
      { word: "もくようび", translation: "Thursday", pronunciation: "mo-ku-yo-o-bi" },
      { word: "きんようび", translation: "Friday", pronunciation: "ki-n-yo-o-bi" },
      { word: "どようび", translation: "Saturday", pronunciation: "do-yo-o-bi" },
      { word: "にちようび", translation: "Sunday", pronunciation: "ni-chi-yo-o-bi" },
    ],
    activities: [
      { type: "multiple_choice", prompt: "Which day is 'きんようび'?", options: ["Thursday", "Saturday", "Friday", "Wednesday"], correctIndex: 2 },
    ],
  },

  {
    id: "ja-u2-l4",
    unitId: "ja-u2",
    languageCode: "ja",
    type: "phrases",
    title: "Shopping",
    description: "Shop and bargain in Japanese.",
    xpReward: 10,
    goals: ["Ask for a price", "Say what you want to buy", "Thank the shopkeeper"],
    phrases: [
      { phrase: "いくらですか？", translation: "How much is it?", pronunciation: "i-ku-ra des-ka" },
      { phrase: "これをください。", translation: "I'll take this one.", pronunciation: "ko-re-o ku-da-sa-i" },
      { phrase: "たかいですね。", translation: "That's expensive.", pronunciation: "ta-ka-i des ne" },
    ],
    activities: [
      { type: "translate_sentence", sourceText: "How much is it?", sourceLanguage: "en", acceptedAnswers: ["いくらですか？", "いくらですか"] },
    ],
  },

  {
    id: "ja-u2-l5",
    unitId: "ja-u2",
    languageCode: "ja",
    type: "phrases",
    title: "Family & Friends",
    description: "Talk about family members in Japanese.",
    xpReward: 10,
    goals: ["Name family members in Japanese", "Describe your family", "Introduce family members"],
    phrases: [
      { phrase: "わたしのかぞく", translation: "my family", pronunciation: "wa-ta-shi-no ka-zo-ku" },
      { phrase: "おかあさん", translation: "mother", pronunciation: "o-kaa-san" },
      { phrase: "おとうさん", translation: "father", pronunciation: "o-too-san" },
      { phrase: "あに / おにいさん", translation: "older brother", pronunciation: "a-ni / o-nii-san" },
      { phrase: "あね / おねえさん", translation: "older sister", pronunciation: "a-ne / o-nee-san" },
    ],
    activities: [
      { type: "multiple_choice", prompt: "What does 'おかあさん' mean?", options: ["father", "sister", "mother", "brother"], correctIndex: 2 },
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

  {
    id: "de-u1-l3",
    unitId: "de-u1",
    languageCode: "de",
    type: "vocabulary",
    title: "Numbers 1–10",
    description: "Count to ten in German.",
    xpReward: 10,
    goals: ["Count from one to ten in German", "Recognize number words", "Use numbers in simple sentences"],
    vocabulary: [
      { word: "eins", translation: "one", pronunciation: "ayns" },
      { word: "zwei", translation: "two", pronunciation: "tsvay" },
      { word: "drei", translation: "three", pronunciation: "dry" },
      { word: "vier", translation: "four", pronunciation: "feer" },
      { word: "fünf", translation: "five", pronunciation: "fuenf" },
      { word: "sechs", translation: "six", pronunciation: "zeks" },
      { word: "sieben", translation: "seven", pronunciation: "ZEE-ben" },
      { word: "acht", translation: "eight", pronunciation: "ahkt" },
      { word: "neun", translation: "nine", pronunciation: "noyn" },
      { word: "zehn", translation: "ten", pronunciation: "tsayn" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What does 'fünf' mean?",
        options: ["four", "five", "six", "seven"],
        correctIndex: 1,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "eins", right: "one" },
          { left: "drei", right: "three" },
          { left: "sieben", right: "seven" },
          { left: "zehn", right: "ten" },
        ],
      },
    ],
  },

  {
    id: "de-u1-l4",
    unitId: "de-u1",
    languageCode: "de",
    type: "vocabulary",
    title: "Colors",
    description: "Learn the colors in German.",
    xpReward: 10,
    goals: ["Name colors in German", "Use color adjectives", "Describe objects by color"],
    vocabulary: [
      { word: "rot", translation: "red", pronunciation: "roht" },
      { word: "blau", translation: "blue", pronunciation: "blow" },
      { word: "grün", translation: "green", pronunciation: "grewn" },
      { word: "gelb", translation: "yellow", pronunciation: "gelp" },
      { word: "schwarz", translation: "black", pronunciation: "shvarts" },
      { word: "weiß", translation: "white", pronunciation: "vays" },
      { word: "orange", translation: "orange", pronunciation: "oh-RAN-zheh" },
      { word: "lila", translation: "purple", pronunciation: "LEE-lah" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "What color is 'blau'?",
        options: ["red", "green", "blue", "yellow"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Der Himmel ist ___.",
        answer: "blau",
        hint: "The sky is ... (color of the sky)",
      },
    ],
  },

  {
    id: "de-u1-l5",
    unitId: "de-u1",
    languageCode: "de",
    type: "phrases",
    title: "At the Café",
    description: "Order food and drinks at a German café.",
    xpReward: 15,
    goals: ["Order a drink or food in German", "Ask for the bill politely", "Be polite in a café"],
    phrases: [
      { phrase: "Einen Kaffee, bitte.", translation: "A coffee, please.", pronunciation: "EYE-nen KAF-fay BI-teh" },
      { phrase: "Die Rechnung, bitte.", translation: "The bill, please.", pronunciation: "dee RECH-noong BI-teh" },
      { phrase: "Ich möchte ___.", translation: "I would like ___.", pronunciation: "ikh MERKH-teh" },
      { phrase: "Was kostet das?", translation: "How much does this cost?", pronunciation: "vas KOS-tet das" },
    ],
    activities: [
      {
        type: "multiple_choice",
        prompt: "How do you ask for the bill in German?",
        options: ["Einen Kaffee, bitte.", "Ich möchte Wasser.", "Die Rechnung, bitte.", "Was kostet das?"],
        correctIndex: 2,
      },
      {
        type: "fill_blank",
        sentence: "Ich ___ ein Bier.",
        answer: "möchte",
        hint: "I would like...",
      },
    ],
  },

  {
    id: "de-u1-l6",
    unitId: "de-u1",
    languageCode: "de",
    type: "ai_teacher",
    title: "AI Conversation Practice",
    description: "Practice German with your AI conversation partner.",
    xpReward: 20,
    goals: ["Hold a short conversation in German", "Use greetings naturally", "Build speaking confidence"],
    activities: [
      {
        type: "listen_repeat",
        targetText: "Hallo! Wie heißt du?",
        audioKey: "de-greeting-intro",
      },
      {
        type: "listen_repeat",
        targetText: "Ich heiße ___. Freut mich!",
        audioKey: "de-greeting-response",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Luna, a warm and upbeat German teacher for absolute beginners. " +
        "This lesson covers Unit 1 German greetings and introductions only — stay strictly within that scope. " +
        "Speak mostly English. Introduce one German word or phrase at a time with its English translation and a pronunciation tip, " +
        "then ask the student to repeat it. Use contractions and short natural sentences. " +
        "If the student makes a mistake, correct it gently and ask them to try once more before moving on. " +
        "Keep each reply to one or two sentences and wait for the student's response before continuing.",
      intro:
        "Hey! I'm Luna, your German teacher. We're kicking things off with greetings today — super useful stuff. Shall we get started?",
      teachingPoints: [
        "Hallo vs Guten Tag — informal vs formal hello",
        "Ich heiße ___ — saying your name",
        "Wie heißt du? — asking someone's name informally",
        "Freut mich — nice to meet you",
      ],
      checkQuestions: [
        "How would you greet someone formally in German?",
        "Can you introduce yourself to me in German?",
        "What do you say when you're pleased to meet someone?",
      ],
    },
  },

  // ── German Unit 2: Numbers & Colors ──────────────────────────────────────
  {
    id: "de-u2-l1",
    unitId: "de-u2",
    languageCode: "de",
    type: "vocabulary",
    title: "Numbers 11–100",
    description: "Count beyond ten in German.",
    xpReward: 10,
    goals: ["Count from 11 to 100 in German", "Form compound numbers", "Use numbers in context"],
    vocabulary: [
      { word: "elf", translation: "eleven", pronunciation: "elf" },
      { word: "zwölf", translation: "twelve", pronunciation: "tsvelff" },
      { word: "zwanzig", translation: "twenty", pronunciation: "TSVAN-tsikh" },
      { word: "hundert", translation: "one hundred", pronunciation: "HOON-dert" },
    ],
    activities: [
      { type: "multiple_choice", prompt: "What does 'zwanzig' mean?", options: ["twelve", "twenty", "two hundred", "thirty"], correctIndex: 1 },
    ],
  },

  {
    id: "de-u2-l2",
    unitId: "de-u2",
    languageCode: "de",
    type: "phrases",
    title: "Telling the Time",
    description: "Ask and tell the time in German.",
    xpReward: 10,
    goals: ["Ask what time it is", "Say the hour in German", "Use AM and PM"],
    phrases: [
      { phrase: "Wie spät ist es?", translation: "What time is it?", pronunciation: "vee shpayt ist es" },
      { phrase: "Es ist ___ Uhr.", translation: "It is ___ o'clock.", pronunciation: "es ist ___ oor" },
    ],
    activities: [
      { type: "fill_blank", sentence: "Es ist drei ___.", answer: "Uhr", hint: "It is three o'clock" },
    ],
  },

  {
    id: "de-u2-l3",
    unitId: "de-u2",
    languageCode: "de",
    type: "vocabulary",
    title: "Days of the Week",
    description: "Learn the days of the week in German.",
    xpReward: 10,
    goals: ["Say all seven days in German", "Ask what day it is", "Discuss weekly plans"],
    vocabulary: [
      { word: "Montag", translation: "Monday", pronunciation: "MON-tahk" },
      { word: "Dienstag", translation: "Tuesday", pronunciation: "DEENS-tahk" },
      { word: "Mittwoch", translation: "Wednesday", pronunciation: "MIT-vokh" },
      { word: "Donnerstag", translation: "Thursday", pronunciation: "DON-ers-tahk" },
      { word: "Freitag", translation: "Friday", pronunciation: "FRY-tahk" },
      { word: "Samstag", translation: "Saturday", pronunciation: "ZAMS-tahk" },
      { word: "Sonntag", translation: "Sunday", pronunciation: "ZON-tahk" },
    ],
    activities: [
      { type: "multiple_choice", prompt: "Which day is 'Freitag'?", options: ["Thursday", "Saturday", "Friday", "Wednesday"], correctIndex: 2 },
    ],
  },

  {
    id: "de-u2-l4",
    unitId: "de-u2",
    languageCode: "de",
    type: "phrases",
    title: "Shopping",
    description: "Shop and ask about prices in German.",
    xpReward: 10,
    goals: ["Ask for a price in German", "Say what you want to buy", "Understand shop vocabulary"],
    phrases: [
      { phrase: "Was kostet das?", translation: "How much does this cost?", pronunciation: "vas KOS-tet das" },
      { phrase: "Ich nehme das.", translation: "I'll take this.", pronunciation: "ikh NAY-meh das" },
      { phrase: "Haben Sie das in Rot?", translation: "Do you have this in red?", pronunciation: "HAH-ben zee das in roht" },
    ],
    activities: [
      { type: "translate_sentence", sourceText: "How much does this cost?", sourceLanguage: "en", acceptedAnswers: ["Was kostet das?"] },
    ],
  },

  {
    id: "de-u2-l5",
    unitId: "de-u2",
    languageCode: "de",
    type: "phrases",
    title: "Family & Friends",
    description: "Talk about family members in German.",
    xpReward: 10,
    goals: ["Name family members in German", "Describe your family", "Introduce family members"],
    phrases: [
      { phrase: "Ich habe einen Bruder.", translation: "I have a brother.", pronunciation: "ikh HA-beh EYE-nen BROO-der" },
      { phrase: "Meine Familie ist groß.", translation: "My family is big.", pronunciation: "MY-neh fah-MEE-lyeh ist grohs" },
      { phrase: "Das ist mein Freund.", translation: "This is my friend (male).", pronunciation: "das ist mayn froynd" },
    ],
    activities: [
      { type: "fill_blank", sentence: "Ich habe eine ___.", answer: "Schwester", hint: "I have a sister" },
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
