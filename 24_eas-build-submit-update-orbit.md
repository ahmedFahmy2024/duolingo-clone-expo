# EAS Build, Submit, Update & Expo Orbit
> EAS CLI · Expo SDK 55 · Expo Orbit · CI/CD

---

## What Is EAS?

EAS (Expo Application Services) is Expo's cloud infrastructure for building, updating, and submitting apps. It replaces everything you'd otherwise need Xcode/Android Studio + Mac for.

```
EAS Build    → Compile your app to .apk / .aab / .ipa in the cloud
EAS Submit   → Upload to App Store / Google Play automatically
EAS Update   → Push JS-only updates without App Store review (OTA)
EAS Metadata → Manage App Store listing from your codebase
```

---

## EAS Free vs Paid Plans

| Feature | Free | Production ($99/mo) |
|---|---|---|
| Builds per month | 30 | Unlimited |
| Concurrent builds | 1 | 4 |
| Build queue priority | Standard | Priority |
| Build timeout | 30 min | 2 hours |
| EAS Update bandwidth | 1 GB/mo | 50 GB/mo |
| Team members | 1 | Unlimited |

For personal projects, the free plan is enough. For a team or production app, Production plan is worth it.

---

## First-Time Setup

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# Verify version
eas --version   # should be 12.x+

# 2. Log in to your Expo account
eas login
# Opens browser for OAuth

# 3. Verify login
eas whoami

# 4. Link project to EAS
# Run inside your Expo project:
eas init

# This creates / updates app.json with:
# "extra": { "eas": { "projectId": "your-uuid-here" } }
```

---

## eas.json — The Build Bible

This file controls everything about how your app is built. Lives at the root of your project.

```json
{
  "cli": {
    "version": ">= 12.0.0",
    "appVersionSource": "remote"   // let EAS auto-increment version numbers
  },
  "build": {
    // ── DEVELOPMENT BUILD ─────────────────────────────────────────
    "development": {
      "developmentClient": true,       // includes expo-dev-client
      "distribution": "internal",      // share via QR/link, not stores
      "android": {
        "buildType": "apk",            // .apk for direct install
        "gradleCommand": ":app:assembleDebug"
      },
      "ios": {
        "simulator": false,            // true = simulator build (.app)
        "buildConfiguration": "Debug"
      },
      "env": {
        "EXPO_PUBLIC_API_URL": "https://dev-api.myapp.com",
        "EXPO_PUBLIC_ENV": "development"
      }
    },

    // ── SIMULATOR BUILD (iOS — macOS only) ──────────────────────
    "simulator": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true              // .app file, not .ipa
      }
    },

    // ── PREVIEW BUILD (for testers / QA) ──────────────────────
    "preview": {
      "distribution": "internal",      // internal distribution
      "channel": "preview",            // OTA update channel
      "android": {
        "buildType": "apk"             // APK for easy side-loading
      },
      "ios": {
        "buildConfiguration": "Release"
      },
      "env": {
        "EXPO_PUBLIC_API_URL": "https://staging-api.myapp.com",
        "EXPO_PUBLIC_ENV": "staging"
      }
    },

    // ── PRODUCTION BUILD ──────────────────────────────────────
    "production": {
      "autoIncrement": true,           // auto bump buildNumber/versionCode
      "channel": "production",         // OTA update channel
      "android": {
        "buildType": "app-bundle"      // .aab for Google Play
      },
      "ios": {
        "buildConfiguration": "Release"
      },
      "env": {
        "EXPO_PUBLIC_API_URL": "https://api.myapp.com",
        "EXPO_PUBLIC_ENV": "production"
      }
    },

    // ── LOCAL BUILD (runs on your machine, not EAS servers) ────
    "local": {
      "distribution": "internal",
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    }
  },

  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./pc-api-key.json",
        "track": "internal"            // internal | alpha | beta | production
      },
      "ios": {
        "appleId": "you@example.com",
        "ascAppId": "1234567890",      // App Store Connect App ID
        "appleTeamId": "ABC1234567"
      }
    }
  }
}
```

---

## Build Commands Reference

```bash
# ── DEVELOPMENT BUILDS ───────────────────────────────────────────

# Build for Android device testing
eas build --profile development --platform android

# Build for iOS device testing
eas build --profile development --platform ios

# Build for both platforms at once
eas build --profile development --platform all

# Build iOS Simulator (macOS)
eas build --profile simulator --platform ios

# ── PREVIEW BUILDS (share with testers) ──────────────────────────

eas build --profile preview --platform android
eas build --profile preview --platform ios
eas build --profile preview --platform all

# ── PRODUCTION BUILDS ────────────────────────────────────────────

eas build --profile production --platform android
eas build --profile production --platform ios
eas build --profile production --platform all

# ── LOCAL BUILDS (your machine, not EAS servers) ─────────────────
# Requires Android Studio / Xcode installed
eas build --profile production --platform android --local
eas build --profile production --platform ios --local     # Mac only

# ── INSPECTION ───────────────────────────────────────────────────

# List your builds
eas build:list

# View specific build
eas build:view [BUILD_ID]

# Cancel a running build
eas build:cancel [BUILD_ID]

# Download a build artifact
eas build:download --id [BUILD_ID]

# Run a build on device (interactive picker)
eas build:run --id [BUILD_ID]
```

---

## Credentials Management

EAS handles signing credentials automatically. First build will prompt you.

```bash
# View your credentials
eas credentials

# Set up credentials interactively
eas credentials --platform android
eas credentials --platform ios

# For Android: EAS creates a keystore automatically
# For iOS: EAS creates certificates + provisioning profiles via Apple API

# Sync credentials locally (for CI)
eas credentials --platform android --profile production
```

### Android Keystore
```bash
# Let EAS manage (recommended — stored securely in EAS)
# When prompted during first build:
# > Generate new keystore — YES

# If you have an existing keystore:
eas credentials --platform android
# Choose: Upload existing keystore
```

### iOS Certificates
```bash
# Let EAS manage (recommended)
# EAS creates:
# - Distribution Certificate
# - Provisioning Profile (App Store / Ad Hoc / Development)

# For CI/CD, enable non-interactive mode:
eas build --profile production --platform ios --non-interactive
```

---

## APK vs AAB — When to Use Each

```
.APK (assembleRelease / buildType: "apk")
├── Can be installed directly on any Android device
├── Larger file size
├── Use for: development, preview, side-loading, internal testing
└── NOT recommended for Google Play (still works, just not optimal)

.AAB (bundleRelease / buildType: "app-bundle")
├── Google Play optimizes delivery (smaller download per device)
├── Cannot be installed directly — must go through Play Store
├── Required for new apps on Play Store since 2021
└── Use for: production Play Store releases
```

```bash
# Build APK (for direct install / testers)
eas build --profile preview --platform android
# eas.json: android.buildType: "apk"

# Build AAB (for Play Store)
eas build --profile production --platform android
# eas.json: android.buildType: "app-bundle"

# Install APK on device directly
adb install path/to/app.apk

# OR via Orbit (drag and drop)
```

---

## EAS Submit — Push to Stores

### Google Play
```bash
# 1. Create service account key in Google Play Console:
# Play Console → Setup → API Access → Create Service Account → Download JSON key

# 2. Add to eas.json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-play-key.json",
        "track": "internal"   // internal → alpha → beta → production
      }
    }
  }
}

# 3. Submit latest production build
eas submit --platform android --latest

# Submit specific build
eas submit --platform android --id [BUILD_ID]
```

### App Store Connect
```bash
# 1. Add to eas.json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "you@example.com",
        "ascAppId": "1234567890"     # from App Store Connect → App → App Information
      }
    }
  }
}

# 2. Submit latest production build
eas submit --platform ios --latest

# Submit and create TestFlight build automatically
eas submit --platform ios --latest --auto-submit
```

---

## EAS Update — OTA Updates

Push JavaScript-only changes directly to users — no App Store review. Works for any change that doesn't touch native code.

```bash
# Install
npx expo install expo-updates

# ── PUSHING UPDATES ──────────────────────────────────────────────

# Update production branch
eas update --branch production --message "Fix crash on home screen"

# Update staging/preview branch
eas update --branch preview --message "New checkout flow"

# Update specific platform only
eas update --branch production --platform android --message "Android-only fix"

# Preview update before pushing (dry run)
eas update --branch production --dry-run

# ── MANAGING UPDATES ─────────────────────────────────────────────

# List all updates
eas update:list

# View update details
eas update:view [UPDATE_ID]

# Roll back (republish a previous update)
eas update:republish --group [UPDATE_GROUP_ID] --branch production
```

### Channels and Branches

```
Build Profile  →  Channel  →  Branch
────────────────────────────────────────
production     → production → production
preview        → preview    → preview / staging
development    → development → dev

# Each channel can point to a different branch of code
```

### Configure in app.json
```json
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/your-project-id",
      "enabled": true,
      "checkAutomatically": "ON_LOAD",  // ON_LOAD | ON_ERROR_RECOVERY | WIFI_ONLY | NEVER
      "fallbackToCacheTimeout": 3000    // ms to wait before using cached bundle
    }
  }
}
```

### Manual Update Check in Code
```tsx
import * as Updates from 'expo-updates';

async function checkAndApplyUpdate() {
  if (__DEV__) return;  // no OTA in development

  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();

      Alert.alert(
        'Update Available',
        'A new version has been downloaded. Restart to apply?',
        [
          { text: 'Later' },
          { text: 'Restart', onPress: () => Updates.reloadAsync() },
        ]
      );
    }
  } catch (error) {
    console.warn('Update check failed:', error);
  }
}
```

### What OTA CAN and CANNOT update

```
✅ CAN update (OTA):              ❌ CANNOT update (needs new build):
────────────────────────────────────────────────────────────────────
JS/TypeScript code                Native module changes
React components                  New npm packages with native code
Styles, layouts                   app.json plugin changes
Business logic                    Permission changes
Text, translations                New Expo SDK version
Images in JS bundle               Android/iOS config changes
API endpoints (env vars not OTA)  App icon / splash screen
```

---

## EAS Secrets — Environment Variables

```bash
# Add a secret (stored encrypted in EAS, not in your repo)
eas secret:create --scope project --name STRIPE_SECRET_KEY --value "sk_live_..."
eas secret:create --scope project --name DATABASE_URL --value "postgres://..."

# List all secrets
eas secret:list

# Delete a secret
eas secret:delete --name STRIPE_SECRET_KEY

# Secrets are injected during EAS Build — not OTA updates
# For runtime env vars accessible in app:
# Use EXPO_PUBLIC_ prefix in eas.json "env" section
```

---

## Expo Orbit — Desktop App

Expo Orbit is a menu bar desktop app for macOS, Windows, and Linux that enables faster installation and launching of builds from EAS, local files, or running Snack projects on simulators and physical devices.

### Download & Install
```bash
# macOS (Homebrew — recommended)
brew install expo-orbit

# OR download from:
# https://github.com/expo/orbit/releases
# Available for: macOS (.dmg), Windows (.exe), Linux (.AppImage)
```

### What Orbit Does

Orbit lets you install and launch apps from local files using file explorer or drag and drop. It supports any Android .apk, iOS Simulator compatible .app, or ad hoc signed apps. You can install and launch builds from EAS on simulators and real devices in one click, install updates on simulators and real Android devices, and list and launch simulators including running Android emulators without audio.

### Orbit Workflow
```
1. Orbit icon in menu bar (top right on Mac, system tray on Windows)
2. See all connected devices + running simulators at a glance
3. Click any simulator → launches it
4. From EAS dashboard: click "Open with Orbit" on any build
   → Downloads → Installs → Launches automatically
5. Or drag & drop .apk / .app file directly onto Orbit
```

### Using Orbit with EAS
```bash
# 1. Build on EAS
eas build --profile development --platform ios

# 2. Build completes → go to EAS dashboard (expo.dev/projects)
#    OR EAS sends you a link in terminal

# 3. On build page: click "Open with Orbit"
#    Orbit downloads the build and installs it on your target device/simulator

# 4. From Orbit menu bar:
#    - Switch target device
#    - Launch specific simulator
#    - Re-install latest build on same device
```

### Orbit + Physical Devices
```bash
# iOS physical device via Orbit:
# 1. Connect iPhone via USB
# 2. Open Orbit → device appears in list
# 3. EAS dashboard → Open with Orbit
# 4. Build installs + launches automatically

# Android physical device via Orbit:
# Wireless or USB — both work
# Orbit uses adb under the hood
```

### Settings
```
Orbit Menu Bar → Settings:
├── Launch on login: ON  (recommended — always available)
├── Show in Dock: OFF    (keeps it minimal)
└── Accounts: Link your Expo account for EAS integration
```

---

## Complete Build Workflow — From Code to Device

### Day-to-Day Development
```bash
# 1. Start Metro bundler
npx expo start

# 2. Press 'a' for Android emulator, 'i' for iOS simulator
#    OR scan QR with Expo Go (limited)

# 3. Make code changes → hot reload instantly
```

### New Team Member Onboarding (Dev Build)
```bash
# 1. Clone repo
git clone https://github.com/org/myapp

# 2. Install dependencies
npm install

# 3. Build development client (only needed once per SDK version change)
eas build --profile development --platform android
# Share the .apk link with new team member

# 4. Team member installs APK on their device
# 5. Run Metro + connect
npx expo start
# Scan QR with the development build app (not Expo Go)
```

### Shipping a New Feature
```bash
# 1. Push code changes
git add . && git commit -m "feat: new checkout flow"
git push origin main

# 2. CI/CD automatically runs:
eas update --branch production --message "New checkout flow"
# Users get update next time they open the app

# 3. If native changes included:
eas build --profile production --platform all
eas submit --platform all --latest
```

### Emergency Hotfix
```bash
# 1. Fix the bug
git commit -m "fix: crash on payment screen"

# 2. Push OTA immediately (30 seconds to reach all users)
eas update --branch production --message "Fix payment crash" --urgent

# 3. Users get fix on next app open — no store review wait
```

---

## CI/CD — GitHub Actions Full Setup

```yaml
# .github/workflows/production.yml
name: Production Build & Submit

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build-and-submit:
    name: Build and Submit
    runs-on: ubuntu-latest
    env:
      EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: npm ci

      # On every push to main: push OTA update
      - name: Push OTA Update
        if: github.ref == 'refs/heads/main' && !startsWith(github.ref, 'refs/tags/')
        run: eas update --branch production --message "${{ github.event.head_commit.message }}" --non-interactive

      # On version tag: full build + submit
      - name: Build Android
        if: startsWith(github.ref, 'refs/tags/')
        run: eas build --platform android --profile production --non-interactive

      - name: Build iOS
        if: startsWith(github.ref, 'refs/tags/')
        run: eas build --platform ios --profile production --non-interactive

      - name: Submit to Stores
        if: startsWith(github.ref, 'refs/tags/')
        run: eas submit --platform all --latest --non-interactive
```

---

## Troubleshooting EAS

### Build fails immediately
```bash
# Check eas.json is valid JSON
cat eas.json | python3 -m json.tool

# Check expo-doctor
npx expo-doctor

# Check EAS CLI version
eas --version
npm install -g eas-cli@latest
```

### "This build does not include a valid credential"
```bash
# Re-configure credentials
eas credentials --platform android
eas credentials --platform ios
```

### OTA update not reaching users
```bash
# Verify update channel matches build channel
# Build was: channel: "production"
# Update must target: --branch production

# Check update status
eas update:list --branch production

# Force check in app code
await Updates.checkForUpdateAsync()
```

### Build stuck in queue
```bash
# Check EAS status
open https://expo.dev/status   # service status page

# Cancel and retry
eas build:list
eas build:cancel [BUILD_ID]
eas build --profile production --platform android
```
