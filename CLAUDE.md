# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [AGENTS.md](./AGENTS.md) for the full project philosophy, feature implementation rules, and UI/styling rules. This file covers the technical layer that AGENTS.md does not.

---

## Commands

```bash
bun start              # Start Expo dev server (scan QR with Expo Go)
bun run android        # Start on Android emulator
bun run ios            # Start on iOS simulator
bun run web            # Start on web
bun run lint           # ESLint via expo lint
npx tsc --noEmit       # TypeScript type-check (no typecheck script exists)
```

---

## Project Layout

All application code lives under `src/`. The repo root holds config files only.

```
src/
  app/          # Expo Router file-based routes (screens only, no logic)
  constants/    # Centralized asset imports (images.ts)
  theme/        # JS design tokens for use in style= props
```

The `@/` alias resolves to `src/` (configured in `tsconfig.json`).  
The `@/assets/` alias resolves to the root `assets/` directory.

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
