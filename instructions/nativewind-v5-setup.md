# NativeWind v5 Setup for Expo Projects

Tested with: Expo SDK 56, React Native 0.85, NativeWind 5.0.0-preview.4, Bun

---

## 1. Install packages

```bash
bun add nativewind@5.0.0-preview.4 tailwindcss @tailwindcss/postcss lightningcss@1.30.1
```

> Pin `lightningcss` to `1.30.1` — newer versions cause deserialization errors with `global.css`.

---

## 2. Add the lightningcss override to package.json

```json
{
  "overrides": {
    "lightningcss": "1.30.1"
  }
}
```

---

## 3. Create global.css at the project root

```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";

@import "nativewind/theme";
```

Do NOT use the standard `@tailwind` directives — the `@import` form above has better `react-native-web` compatibility.

---

## 4. Create postcss.config.mjs at the project root

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

## 5. Create or update metro.config.js

```bash
npx expo customize metro.config.js
```

Then wrap the config with `withNativewind`:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config);
```

> v5 no longer requires a second argument like `{ input: './global.css' }`. Metro auto-detects CSS imports.

---

## 6. Import global.css in your root layout

Import the CSS file in the **top-most component** of your app — for Expo Router projects this is `app/_layout.tsx` (or `src/app/_layout.tsx`).

```tsx
import "./global.css"; // adjust relative path as needed
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

> Do NOT import it in the same file that calls `AppRegistry.registerComponent` — that breaks Fast Refresh.

---

## 7. TypeScript setup

Create `nativewind-env.d.ts` at the project root:

```ts
/// <reference types="nativewind/types" />
```

Then add it to `tsconfig.json`:

```json
{
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "expo-env.d.ts",
    "nativewind-env.d.ts"
  ]
}
```

> NativeWind will auto-add this when you first run `node metro.config.js` or start Metro.

---

## 8. babel.config.js — do NOT add nativewind/babel

NativeWind v5 handles all Babel transforms automatically through the Metro config. A plain `babel-preset-expo` is all you need:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
```

Adding `"nativewind/babel"` to the plugins array will cause this error:

```
Error: [BABEL] .plugins is not a valid Plugin property
```

---

## 9. Start with cache cleared

Always clear Metro cache after config changes:

```bash
bun start --clear
```

---

## Common Mistakes

| Mistake | Fix |
|--------|-----|
| Adding `nativewind/babel` to `babel.config.js` | Remove it — v5 doesn't need it |
| Using `withNativeWind(config, { input: './global.css' })` | Remove the second arg — v5 auto-detects |
| Using `@tailwind base/utilities/components` in CSS | Use `@import` form instead |
| Importing CSS in `AppRegistry` entry file | Import in root layout component instead |
| Not pinning `lightningcss` | Pin to `1.30.1` in `overrides` |
| Forgetting `--clear` after config changes | Always run `bun start --clear` |
