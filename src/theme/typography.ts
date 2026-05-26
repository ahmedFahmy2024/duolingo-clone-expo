export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const fontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  bodyLg: 16,
  bodyMd: 14,
  bodySm: 13,
  caption: 11,
} as const;

export const lineHeight = {
  tight: 1.2,   // H1
  snug: 1.3,    // H2, H3
  normal: 1.4,  // H4, Caption
  relaxed: 1.6, // Body
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
} as const;

// Pre-composed text style objects for use with StyleSheet
export const textStyles = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.h1,
    lineHeight: Math.round(fontSize.h1 * lineHeight.tight),
  },
  h2: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.h2,
    lineHeight: Math.round(fontSize.h2 * lineHeight.snug),
  },
  h3: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.h3,
    lineHeight: Math.round(fontSize.h3 * lineHeight.snug),
  },
  h4: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.h4,
    lineHeight: Math.round(fontSize.h4 * lineHeight.normal),
  },
  bodyLg: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodyLg,
    lineHeight: Math.round(fontSize.bodyLg * lineHeight.relaxed),
  },
  bodyMd: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodyMd,
    lineHeight: Math.round(fontSize.bodyMd * lineHeight.relaxed),
  },
  bodySm: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodySm,
    lineHeight: Math.round(fontSize.bodySm * lineHeight.relaxed),
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.caption,
    lineHeight: Math.round(fontSize.caption * lineHeight.normal),
  },
} as const;
