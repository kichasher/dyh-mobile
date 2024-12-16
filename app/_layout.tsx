import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import store from "@/feature/store";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme, useInitializeColorScheme } from "@/hooks";
import { PortalHost } from "@rn-primitives/portal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();
const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: {
      fontFamily: "",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "",
      fontWeight: "900",
    },
  },
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: {
    regular: {
      fontFamily: "",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "",
      fontWeight: "900",
    },
  },
};
export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  // const isColorSchemeLoaded = useInitializeColorScheme(
  //   colorScheme,
  //   setColorScheme
  // );
  const [loaded] = useFonts({
    "Popins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Popins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Popins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Popins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Popins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Popins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Popins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Popins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Popins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // if (!loaded || !isColorSchemeLoaded) {
  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <BottomSheetModalProvider>
          {/* <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}> */}
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(onboarding)/onboarding"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="setup-profile"
              options={{ headerShown: false }}
            />
          </Stack>
          {/* </ThemeProvider> */}
          <PortalHost />
        </BottomSheetModalProvider>
      </Provider>
      <Toast />
    </GestureHandlerRootView>
  );
}
