import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";

type colorScheme = "light" | "dark";
type setColorScheme = (scheme: colorScheme) => void;

export function useInitializeColorScheme(
  colorScheme: string,
  setColorScheme: setColorScheme
): boolean {
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    initializeTheme();
  }, []);

  async function initializeTheme() {
    try {
      SplashScreen.preventAutoHideAsync();

      const savedTheme = await SecureStore.getItemAsync("theme");

      if (!savedTheme) {
        await SecureStore.setItemAsync("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }

      const resolvedTheme = savedTheme === "dark" ? "dark" : "light";

      if (resolvedTheme !== colorScheme) {
        setColorScheme(resolvedTheme);
      }

      setIsColorSchemeLoaded(true);
    } catch (error) {
      console.error("Failed to initialize theme:", error);
    } finally {
      SplashScreen.hideAsync();
    }
  }

  return isColorSchemeLoaded;
}
