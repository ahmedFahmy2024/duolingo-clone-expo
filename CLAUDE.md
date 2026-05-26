# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [AGENTS.md](./AGENTS.md) for the full project philosophy, feature implementation rules, and UI/styling rules. This file covers the technical layer that AGENTS.md does not.

---

## Commands

```bash
bun start              # Start Metro bundler (connect from dev client on emulator/device)
bun run android        # Build and launch on Android emulator (requires emulator running)
bun run ios            # Build and launch on iOS simulator
bun run web            # Start on web
bun run lint           # ESLint via expo lint
npx tsc --noEmit       # TypeScript type-check (no typecheck script exists)
```

> **Note:** This app uses native modules (Stream WebRTC). It cannot run in Expo Go. Always use the dev client built with `bun run android` / `bun run ios`.

---

## Android Build (Windows)

Build from terminal — **not** from Android Studio's Gradle sync button. The Gradle daemon launched by Android Studio does not inherit `node` or `JAVA_HOME` on Windows.

```bash
# 1. Start the emulator (if not running)
"C:/Users/ahmed/AppData/Local/Android/Sdk/emulator/emulator.exe" -avd Pixel_10 &
# Wait until booted:
"C:/Users/ahmed/AppData/Local/Android/Sdk/platform-tools/adb.exe" shell getprop sys.boot_completed
# Returns "1" when ready

# 2. Build and install
bun run android
```

- **JAVA_HOME:** `C:/Program Files/Android/Android Studio/jbr` (JDK 21)
- **Node:** `C:/Program Files/nodejs`
- **AVD:** `Pixel_10`
- To use Android Studio instead: double-click `open-android-studio.bat` in the project root — it sets both PATH and JAVA_HOME before launching Studio.

---

## Project Layout

All application code lives under `src/`. The repo root holds config files only.

```
src/
  app/                    # Expo Router file-based routes (screens only, no logic)
    (auth)/               # Sign-in, sign-up, verification
    (tabs)/               # Main tab screens: index, learn, ai-teacher, chat, profile
    lesson/[id].tsx       # Audio lesson screen with Stream call
    api/                  # Expo API routes (server-side, secrets safe here)
      stream-token+api.ts # Generates Stream user token + creates audio_room call
    _layout.tsx           # Root layout: Clerk + PostHog + StreamVideo providers
  components/
    navigation/           # CustomTabBar
    VerificationModal.tsx
  constants/
    images.ts             # All image assets — always import from here
  data/
    languages.ts          # Supported languages
    lessons.ts            # Lesson content (hardcoded)
    units.ts              # Unit structure
  hooks/
    useStreamCall.ts      # Stream audio call lifecycle: idle→connecting→joined→ended
  lib/
    streamVideo.ts        # StreamVideoClient singleton helper
  store/
    languageStore.ts      # Zustand: selected language
    progressStore.ts      # Zustand: XP, completed lessons, streak
  theme/
    colors.ts             # Brand + semantic color hex values
    typography.ts         # Font family, size, weight, line-height scale
    spacing.ts            # Spacing + border radius scale
    index.ts              # Re-exports all theme tokens
  types/
    learning.ts           # Shared TypeScript types
```

The `@/` alias resolves to `src/` (configured in `tsconfig.json`).
The `@/assets/` alias resolves to the root `assets/` directory.

---

## Stream Audio Call Architecture

Stream calls are audio-only (`audio_room` type). The flow:

1. **`src/app/api/stream-token+api.ts`** (server-side Expo API route)
   - Receives `{ userId, userName, lessonId, languageCode }` via POST
   - Uses `@stream-io/node-sdk` with `STREAM_API_KEY` + `STREAM_API_SECRET` (never exposed to client)
   - Returns `{ token, callId, apiKey }`

2. **`src/hooks/useStreamCall.ts`** (client hook)
   - Calls the API route to get a token
   - Creates a `StreamVideoClient` singleton via `src/lib/streamVideo.ts`
   - Manages call state: `idle | connecting | joined | muted | ended | error`
   - Exposes `startCall`, `endCall`, `toggleMute`

3. **`src/app/_layout.tsx`** — wraps app with `StreamVideo` provider (initialized from Clerk user)

4. **`src/app/lesson/[id].tsx`** — consumes `useStreamCall`, renders audio call UI states

**Env vars:**
- `EXPO_PUBLIC_STREAM_API_KEY` — public, safe in client
- `STREAM_API_KEY` + `STREAM_API_SECRET` — server-side only, in `.env.local`

---

## Two-Layer Design Token System

Design values are defined in **two places** that must stay in sync:

| Layer | File | Used via |
|---|---|---|
| CSS tokens + utility classes | `global.css` | `className` prop (NativeWind) |
| JS constants | `src/theme/` | `style=` prop (StyleSheet exceptions) |

**Rule:** Use `className` with NativeWind utilities by default. Only reach for `src/theme/` constants when a component requires the `style` prop (see the exception table in AGENTS.md). When a color or spacing value changes, update **both** layers.

### Available theme exports (`src/theme/index.ts`)
- `colors` — all brand and semantic color hex values
- `fontFamily`, `fontSize`, `lineHeight`, `fontWeight`, `textStyles` — typography scale
- `spacing`, `borderRadius` — spacing and radius scale

### Global CSS utilities (from `global.css`)
Pre-built BEM-style classes ready to use in `className`:
- **Typography:** `.text--h1` through `.text--caption`
- **Buttons:** `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--success`, `.btn--outline`, `.btn__label`
- **Cards:** `.card`, `.card--surface`
- **Badges:** `.badge`, `.badge--success/warning/error/info/streak`, `.badge__label`
- **Progress:** `.progress-bar`, `.progress-bar__fill`, `.progress-bar__fill--success/streak`
- **Inputs:** `.input`, `.input--focused`, `.input--error`
- **Layout:** `.screen`, `.screen--surface`, `.container`
- **Avatars:** `.avatar`, `.avatar--sm/md/lg/xl`
- **Audio lesson states:** `.audio-lesson__state-overlay`, `.audio-lesson__user-badge`, `.audio-lesson__error-banner`, `.audio-lesson__join-btn`, `.audio-lesson__ended-badge`
- `.divider`

---

## Images

All image assets are imported and exported from `src/constants/images.ts`. Always use `images.someKey` — never require assets directly in screens or components.

---

## Key Config Notes

- **Expo Router** entry point: `expo-router/entry` (set in `package.json` `main`)
- **NativeWind v5** (preview): configured via `metro.config.js` (`withNativewind`) and `global.css` (imported in `src/app/_layout.tsx`)
- **Typed routes** and **React Compiler** are enabled (`app.json` → `experiments`)
- **Fonts** loaded in `src/app/_layout.tsx`: Poppins Regular, Medium, SemiBold, Bold
- **`example/`** directory is excluded from TypeScript compilation — ignore it
- **New Architecture** enabled (`newArchEnabled=true` in `android/gradle.properties`)
- **Android package:** `com.dulaingo.app` (set in both `app.json` and `android/app/build.gradle`)
- **Gradle:** 8.13, JDK 21 (Android Studio bundled JBR), single arch `x86_64` for emulator builds
