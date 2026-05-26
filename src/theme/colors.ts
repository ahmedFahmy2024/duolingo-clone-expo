export const colors = {
  // Primary
  linguaPurple: "#6C4EF5",
  linguaDeepPurple: "#5B3BF6",
  linguaBlue: "#4D88FF",
  linguaGreen: "#21C168",

  // Semantic
  success: "#21C168",
  warning: "#FFCB00",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D88FF",

  // Neutrals
  textPrimary: "#001132",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",

  // White / transparent
  white: "#FFFFFF",
  transparent: "transparent",
} as const;

export type ColorToken = keyof typeof colors;
