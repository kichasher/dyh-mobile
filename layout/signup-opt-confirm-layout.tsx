import { Pressable, SafeAreaView, View } from "react-native";
import React from "react";
import { ArrowLeft, CheckCircle } from "@/lib/icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

type Props = {};

const SignupOtpConfirmLayout = (props: Props) => {
  const navigate = useRouter();
  return (
    <SafeAreaView className="flex-1 justify-center px-6">
      <Pressable
        className="flex-row gap-4"
        onPress={() => navigate.replace("/signup")}
      >
        <ArrowLeft size={24} className="text-gray-600" />
        <Text> Back To Signup</Text>
      </Pressable>

      <View className="mt-4 gap-2 flex flex-col">
        <Text className="text-3xl font-bold text-center">
          Verification Successful
        </Text>
        <Text className="text-lg font-normal text-center">
          Your email as been successfully verified
        </Text>
      </View>
      <View className="mt-8">
        <CheckCircle size={120} className="text-primary self-center" />
      </View>
      <View className="mt-8">
        <Button onPress={() => navigate.navigate("/(auth)/login")}>
          <Text>Let's Get Started</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SignupOtpConfirmLayout;
