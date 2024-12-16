# Digital Youth Hub - Mobile App
Version: 1.0.0

## Overview
Digital Youth Hub mobile application built with React Native, Expo, and TypeScript, providing a native mobile experience for iOS and Android platforms.

## Technology Stack
- 📱 React Native 0.76+ with Expo 52
- 🔄 Redux Toolkit & RTK Query for state management
- 🎨 NativeWind & Gluestack-UI for styling
- 🗺️ Expo Router for navigation
- ⚡ Hermes Engine for performance
- 🛠️ TypeScript for type safety

## Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Expo CLI
iOS Simulator / Android Emulator
```

## Getting Started

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/dyh-mobile.git

# Navigate to project directory
cd dyh-mobile

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

### Available Scripts
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "build:android": "eas build -p android",
    "build:ios": "eas build -p ios",
    "update": "eas update"
  }
}
```

## Project Structure
```
app/
├── _layout.tsx           # Root layout
├── index.tsx            # Home screen
├── (auth)/              # Auth-related screens
├── (app)/               # App screens
└── [dynamic].tsx        # Dynamic routes
src/
├── components/
│   ├── common/          # Shared components
│   ├── features/        # Feature-specific components
│   └── layouts/         # Layout components
├── config/
│   ├── constants.ts     # Application constants
│   └── env.ts          # Environment configuration
├── features/
│   ├── auth/           # Authentication feature
│   ├── users/          # User management
│   └── opportunities/  # Opportunities feature
├── hooks/
│   └── index.ts        # Custom hooks
├── lib/
│   ├── api.ts          # API client configuration
│   └── storage.ts      # Storage utilities
├── store/
│   ├── index.ts        # Redux store configuration
│   └── slices/         # Redux slices
├── styles/
│   └── index.ts        # Global styles
├── types/
│   └── index.ts        # TypeScript type definitions
└── utils/
    └── index.ts        # Utility functions
```

## Navigation Structure

### Expo Router Configuration
```typescript
// app/_layout.tsx
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@gluestack-ui/themed';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </Provider>
  );
}
```

### Navigation Example
```typescript
// app/(app)/_layout.tsx
import { Tabs } from 'expo-router';

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

## State Management

### Store Configuration
```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import authReducer from '@/features/auth/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Styling

### NativeWind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...},
      },
    },
  },
  plugins: [],
};
```

### Component Styling Example
```typescript
// src/components/common/Button.tsx
import { Text, Pressable } from 'react-native';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

export function Button({ title, onPress }) {
  return (
    <StyledPressable 
      className="bg-primary-600 px-4 py-2 rounded-lg"
      onPress={onPress}
    >
      <StyledText className="text-white font-medium text-center">
        {title}
      </StyledText>
    </StyledPressable>
  );
}
```

## Data Persistence

### Storage Utilities
```typescript
// src/lib/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const storage = {
  // Regular storage
  async set(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage Error:', error);
    }
  },

  // Secure storage
  async setSecure(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Secure Storage Error:', error);
    }
  },
};
```

## Performance Optimization

### Image Loading
```typescript
// src/components/common/OptimizedImage.tsx
import FastImage from 'react-native-fast-image';

export function OptimizedImage({ uri, style }) {
  return (
    <FastImage
      style={style}
      source={{
        uri,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}
```

### List Optimization
```typescript
// src/components/features/opportunities/OpportunityList.tsx
import { FlashList } from '@shopify/flash-list';

export function OpportunityList({ data }) {
  const renderItem = useCallback(({ item }) => (
    <OpportunityCard opportunity={item} />
  ), []);

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      estimatedItemSize={200}
      keyExtractor={(item) => item.id}
    />
  );
}
```

## Build Configuration

### EAS Configuration
```json
// eas.json
{
  "cli": {
    "version": ">= 3.13.3"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id"
      },
      "android": {
        "serviceAccountKeyPath": "./path-to-key.json"
      }
    }
  }
}
```

### App Configuration
```json
// app.config.js
export default {
  expo: {
    name: "DYH Mobile",
    slug: "dyh-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "your-update-url"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "com.yourorg.dyh",
      buildNumber: "1.0.0",
      supportsTablet: true
    },
    android: {
      package: "com.yourorg.dyh",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    plugins: [
      "expo-router"
    ]
  }
};
```

## Environment Configuration
```typescript
// src/config/env.ts
const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000',
    environment: 'development',
  },
  staging: {
    apiUrl: 'https://staging-api.dyh.gov.pk',
    environment: 'staging',
  },
  prod: {
    apiUrl: 'https://api.dyh.gov.pk',
    environment: 'production',
  },
};

export default ENV[process.env.APP_ENV || 'dev'];
```