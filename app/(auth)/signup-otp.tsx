import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SignupOtpLayout } from "@/layout";
import { useLocalSearchParams } from "expo-router";

const SignupOtp = () => {
  const params = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 justify-center">
      <SignupOtpLayout email={params.email} />
    </SafeAreaView>
  );
};

export default SignupOtp;

