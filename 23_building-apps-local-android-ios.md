# Building Apps — Prebuild, Android Studio, Xcode & Local Builds
> Expo SDK 55 · React Native 0.83.6 · Windows + Mac + Linux

---

## The Build Landscape — Which Path to Choose

```
Your Expo Project
       │
       ├── Just testing UI? ──────────────────► Expo Go (scan QR, no build)
       │
       ├── Need native modules? ───────────────► Development Build (EAS or local)
       │
       ├── Building for testers? ──────────────► EAS Preview Build (.apk / .ipa)
       │
       ├── Releasing to stores? ───────────────► EAS Production Build (.aab / .ipa)
       │
       └── Full native control / offline? ─────► Local Build (Xcode / Android Studio)
```

---

## Prerequisites by Platform

### macOS (Full Capability)
```
✅ Android builds (via Android Studio)
✅ iOS builds (via Xcode — macOS exclusive)
✅ EAS Cloud builds
✅ Expo Go, simulators, emulators
```

### Windows / Linux (Android Only)
```
✅ Android builds (via Android Studio)
✅ EAS Cloud builds (iOS via cloud — no Mac needed)
✅ Expo Go on Android device
✅ Android emulator
❌ Local iOS builds (need macOS or EAS cloud)
```

---

## STEP 0 — Environment Setup

### Android Setup (Windows + Mac + Linux)

**1. Install Java (JDK 17)**
```bash
# macOS (Homebrew)
brew install --cask zulu@17

# Windows — download from:
# https://www.azul.com/downloads/?version=java-17&os=windows&package=jdk

# Verify
java -version   # should show: openjdk 17.x.x
```

**2. Install Android Studio**
Download from: https://developer.android.com/studio

During setup, make sure these are checked:
- ✅ Android SDK
- ✅ Android SDK Platform
- ✅ Android Virtual Device (AVD)
- ✅ Android SDK Build-Tools 34.x

**3. Set environment variables**
```bash
# macOS/Linux — add to ~/.zshrc or ~/.bashrc
export ANDROID_HOME=$HOME/Library/Android/sdk          # macOS
# export ANDROID_HOME=$HOME/Android/Sdk               # Linux
# For Windows: C:\Users\Ahmed\AppData\Local\Android\Sdk

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools

# Reload
source ~/.zshrc

# Verify
adb --version          # Android Debug Bridge
emulator -list-avds    # list available emulators
```

**4. Create Android Virtual Device (Emulator)**
- Open Android Studio → Device Manager (⋮ menu) → Create Device
- Choose: Pixel 8 → Next
- System Image: API 34 (Android 14) — download if needed → Next
- Finish

```bash
# Or launch emulator from CLI
emulator -avd Pixel_8_API_34
```

---

### iOS Setup (macOS Only)

**1. Install Xcode**
```bash
# From Mac App Store — search "Xcode" (14+ GB download)
# OR use xcode-select for command line tools only:
xcode-select --install
```

**2. Accept Xcode license**
```bash
sudo xcodebuild -license accept
```

**3. Install iOS Simulator runtimes**
- Xcode → Settings → Platforms → Download iOS 17 / iOS 18 simulators

**4. Install CocoaPods**
```bash
# macOS
brew install cocoapods
pod --version   # verify
```

**5. Install Watchman (file watcher)**
```bash
brew install watchman
```

---

## STEP 1 — expo prebuild

`npx expo prebuild` generates the native `android/` and `ios/` folders from your Expo config. This is the bridge between the managed workflow and native code.

```bash
# Generate both platforms
npx expo prebuild

# Platform-specific
npx expo prebuild --platform android
npx expo prebuild --platform ios

# Clean — delete existing and regenerate (use when upgrading SDK or changing plugins)
npx expo prebuild --clean

# Don't install CocoaPods (faster if you'll do it manually)
npx expo prebuild --no-install
```

### What prebuild does
1. Reads your `app.json` / `app.config.ts`
2. Runs all **config plugins** (expo-camera, expo-notifications, etc.)
3. Generates `android/` folder with Gradle project
4. Generates `ios/` folder with Xcode workspace
5. Runs `pod install` in `ios/` automatically

### What gets generated
```
android/
├── app/
│   ├── src/main/
│   │   ├── AndroidManifest.xml    ← permissions, deep links, intents
│   │   └── res/                   ← icons, splash, strings
│   ├── build.gradle               ← app-level Gradle config
│   └── google-services.json       ← if using Firebase
├── build.gradle                   ← project-level Gradle config
├── gradle.properties
└── gradlew                        ← Gradle wrapper script

ios/
├── MyApp/
│   ├── Info.plist                 ← permissions, URL schemes, capabilities
│   ├── AppDelegate.swift
│   └── Images.xcassets/           ← app icon, splash
├── MyApp.xcworkspace              ← open THIS (not .xcodeproj)
├── Podfile                        ← CocoaPods dependencies
└── Podfile.lock
```

### When to re-run prebuild
- Added or removed an Expo config plugin
- Changed `app.json` native config (bundleIdentifier, permissions, etc.)
- Upgraded Expo SDK version
- Added a library that requires native code
- Changed your app scheme or deep link config

### .gitignore for prebuild
Two approaches:

```gitignore
# Option A: Continuous Native Generation (recommended)
# Ignore generated folders — regenerate from app.json
/android
/ios

# Option B: Commit native folders (more control)
# Don't add android/ or ios/ to .gitignore
```

---

## STEP 2 — Running Locally (Dev Mode)

These commands run prebuild automatically if `android/` or `ios/` don't exist yet.

```bash
# Android — starts emulator or connects to device
npx expo run:android

# iOS — starts simulator (macOS only)
npx expo run:ios

# Target a specific device
npx expo run:android --device                    # interactive device picker
npx expo run:ios --device                        # interactive device picker
npx expo run:ios --device "Ahmed's iPhone"       # specific device name

# Target specific simulator
npx expo run:ios --simulator "iPhone 15 Pro"
npx expo run:ios --simulator "iPad Pro (12.9-inch)"

# Build in release mode (production JS bundle, no dev tools)
npx expo run:android --variant release
npx expo run:ios --configuration Release
```

---

## STEP 3 — Android Studio Workflow

### Opening the project
```bash
# Open Android Studio project
npx expo run:android  # auto-opens OR
open android/         # macOS
# Windows: Open Android Studio → Open → select android/ folder
```

### Running from Android Studio
1. Open `android/` folder in Android Studio
2. Wait for Gradle sync (first time: 2-5 min)
3. Select your device/emulator in the dropdown (top toolbar)
4. Click ▶ Run (green play button)

### Gradle Build Commands

```bash
cd android

# Debug APK (for testing, unsigned)
./gradlew assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk

# Release APK (signed, for distribution)
./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk

# Release AAB — Android App Bundle (for Google Play — preferred)
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab

# Install debug directly on connected device
./gradlew installDebug

# Run specific task with info
./gradlew assembleRelease --info

# Clean build cache (fix weird Gradle errors)
./gradlew clean
cd .. && npx expo run:android
```

**APK vs AAB:**
- `.apk` — installable directly on device, larger
- `.aab` — Google Play bundles format, smaller download, only for Play Store

### Signing a Release Build

```bash
# 1. Generate a keystore (do this ONCE, keep it safe forever)
keytool -genkey -v \
  -keystore my-release-key.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# 2. Add to android/app/build.gradle
android {
    signingConfigs {
        release {
            storeFile file('my-release-key.keystore')
            storePassword 'your-store-password'
            keyAlias 'my-key-alias'
            keyPassword 'your-key-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

# 3. Build signed release
./gradlew assembleRelease
```

> ⚠️ **NEVER commit your keystore or passwords to git.** Store in `.env` or a secrets manager.

### Common Android Studio Errors

**Gradle sync failed**
```bash
cd android && ./gradlew clean
cd .. && npx expo prebuild --clean
```

**SDK not found**
```bash
# Create local.properties if missing
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
```

**Duplicate class error**
```bash
./gradlew dependencies | grep "duplicate"
# Add to android/app/build.gradle:
configurations.all { resolutionStrategy.force 'com.google.guava:guava:31.1-android' }
```

**Out of memory**
```
# android/gradle.properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError
```

---

## STEP 4 — Xcode Workflow (macOS)

### Opening the project
```bash
# Always open the WORKSPACE, not the .xcodeproj
open ios/MyApp.xcworkspace

# Install pods first if needed
cd ios && pod install && cd ..
```

### Running from Xcode
1. Open `ios/MyApp.xcworkspace`
2. Select your target device / simulator in the toolbar
3. Click ▶ (Product → Run) or `⌘R`
4. For physical device: connect iPhone via USB, trust computer

### Building for App Store (Archive)

```
Xcode Menubar:
1. Product → Scheme → Edit Scheme → Run → Build Configuration: Release
2. Select "Any iOS Device (arm64)" as destination
3. Product → Archive
4. Organizer opens automatically when done
5. Distribute App → App Store Connect → Upload
```

### Xcode CLI Build
```bash
cd ios

# Build for simulator
xcodebuild \
  -workspace MyApp.xcworkspace \
  -scheme MyApp \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath build

# Archive for App Store (requires signing)
xcodebuild \
  -workspace MyApp.xcworkspace \
  -scheme MyApp \
  -configuration Release \
  -sdk iphoneos \
  archive \
  -archivePath build/MyApp.xcarchive

# Export IPA from archive
xcodebuild -exportArchive \
  -archivePath build/MyApp.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath build/
```

### ExportOptions.plist (for CLI export)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" ...>
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store</string>     <!-- app-store | ad-hoc | development | enterprise -->
  <key>teamID</key>
  <string>ABC1234567</string>
  <key>uploadBitcode</key>
  <false/>
  <key>uploadSymbols</key>
  <true/>
</dict>
</plist>
```

### Common Xcode Errors

**CocoaPods version mismatch**
```bash
cd ios
pod deintegrate
pod install
```

**Signing certificate missing**
```
Xcode → Project → Signing & Capabilities → Team → select your Apple account
Enable "Automatically manage signing"
```

**Module not found after adding package**
```bash
cd ios && pod install
# If still failing:
cd ios && pod deintegrate && pod install
```

**"No provisioning profile" on physical device**
```
Xcode → Preferences → Accounts → Add Apple ID
Then: Signing & Capabilities → Team → your name
```

---

## STEP 5 — Windows Building iOS (via EAS Cloud)

If you're on Windows, you **cannot** run Xcode locally. But EAS Build runs on macOS machines in the cloud:

```bash
# Build iOS from Windows — runs on Expo's Mac servers
eas build --platform ios --profile development

# No Mac needed — Expo handles:
# - CocoaPods install
# - Xcode archive
# - Code signing (managed credentials)
# - Returns downloadable .ipa
```

---

## STEP 6 — Physical Device Testing

### Android (Windows / Mac / Linux)
```bash
# Enable USB debugging on device:
# Settings → About Phone → tap Build Number 7 times → Developer Options → USB Debugging

# Connect via USB, verify
adb devices
# Should show: device_serial_number  device

# Install APK directly
adb install app-debug.apk

# Run from CLI
npx expo run:android --device
```

### Android Wireless Debugging (Android 11+)
```bash
# On device: Developer Options → Wireless Debugging → Pair with code
adb pair 192.168.1.100:PORT_NUMBER

# Then connect
adb connect 192.168.1.100:CONNECT_PORT
npx expo run:android --device
```

### iOS Physical Device
```bash
# Connect iPhone via USB
# Trust computer when prompted on phone
npx expo run:ios --device

# Or via EAS + Orbit (easiest):
eas build --profile development --platform ios
# Then use Expo Orbit to install
```

---

## Understanding Build Variants

| | Debug | Release |
|---|---|---|
| **JS Bundle** | Metro dev server | Bundled + minified |
| **Dev tools** | ✅ DevTools, fast refresh | ❌ None |
| **Performance** | Slower (dev mode) | ✅ Production speed |
| **Signing** | Debug keystore (auto) | Release keystore |
| **Installable** | Yes (dev only) | Yes (anyone) |
| **App Store** | ❌ Not accepted | ✅ Yes |

```bash
# Debug (default — connects to Metro)
npx expo run:android

# Release (production build, no Metro)
npx expo run:android --variant release
npx expo run:ios --configuration Release
```

---

## Flipper (Debugging Native Code)

```bash
# Install Flipper desktop app
# https://fbflipper.com/

# Flipper connects to debug builds automatically
# Shows: network, databases, layout inspector, crash reporter

# If Flipper causes build issues in SDK 55:
# android/gradle.properties
FLIPPER_VERSION=0.182.0
# OR disable:
# android/app/build.gradle
# remove Flipper dependency lines
```

---

## Environment Variables in Builds

```bash
# Injected at build time via eas.json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://api.myapp.com"
      }
    }
  }
}

# For local builds — use .env file
# .env.local
EXPO_PUBLIC_API_URL=http://localhost:3000
```

```bash
# Pass env at run time
EXPO_PUBLIC_API_URL=http://localhost:3000 npx expo run:android
```

---

## Checking Build Health

```bash
# Before any build — run doctor
npx expo-doctor

# Check installed SDK versions
npx expo install --check

# Fix mismatched versions
npx expo install --fix

# Check native build requirements
npx react-native doctor
```
