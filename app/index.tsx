import { Pressable, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/feature/store";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MoonStarIcon, SunIcon } from "@/lib/icons";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { getData } from "@/utils/utils";

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { toggleColorScheme, isDarkColorScheme } = useColorScheme();
  const router = useRouter()

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      // Check if onboarding has been completed
      const onboardingStatus = await getData("onboardingCompleted");
      
      if (!onboardingStatus) {
        // If onboarding hasn't been completed, redirect to onboarding
        router.replace("/(onboarding)/onboarding");
      } else if (!user) {
        // If onboarding is completed but no user, redirect to login
        router.replace("/(auth)/login");
      }
      // If user exists and onboarding completed, stay on this page
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      // On error, default to onboarding for safety
      router.replace("/(onboarding)/onboarding");
    }
  };
};
export default App;
