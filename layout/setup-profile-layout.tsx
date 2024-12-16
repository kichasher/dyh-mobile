import { ProfileStepper } from "@/components/setup-profile";
import React from "react";
import { SafeAreaView, View } from "react-native";

const SetupProfileLayout = () => {
  return (
    <SafeAreaView className="flex-1 android:mt-28">
      <ProfileStepper />
    </SafeAreaView>
  );
};
export default SetupProfileLayout;
