import {
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import React, { RefObject, useRef, useState } from "react";
import { ArrowLeft } from "@/lib/icons";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVerify_otpMutation } from "@/feature/services/authApi";
import Toast from "react-native-toast-message";

type Props = {
  email: string;
};
const SignupOtpLayout: React.FC<Props> = ({ email }) => {
  const navigate = useRouter();
  const [verify_otp, { isLoading }] = useVerify_otpMutation();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<Array<RefObject<TextInput>>>(
    [...Array(4)].map(() => React.createRef())
  );

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  const isVerifyEnabled = otp.every((digit) => digit !== "");

  const handleVerify = async () => {
    const otpString = otp.join("");
    console.log("Verifying OTP:", otpString);
    try {
      const res = await verify_otp({
        email: email,
        otp: otpString,
      });
      console.log("🚀 ~ handleVerify ~ res:", res)
      navigate.push("/signup-otp-confirmed");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid OTP",
      });
    }
  };

  const handleResendOTP = (): void => {
    console.log("Resending OTP...");
    // Add your resend logic here
  };

  return (
    <View className="flex px-6">
      <Pressable className="flex-row gap-4" onPress={() => navigate.back()}>
        <ArrowLeft size={24} className="text-gray-600" />
        <Text> Back To Signup</Text>
      </Pressable>

      <View className="mt-4">
        <Text className="text-3xl font-bold text-center">Check Your Email</Text>
        <Text className="text-lg font-normal text-center">
          We sent a verification code to your email
        </Text>
        <Text className="text-base text-gray-600 text-center">{email}</Text>
      </View>

      <View className="mt-8 h-36">
        <Label className="text-gray-600 mb-2">Enter OTP</Label>
        <View className="flex-1 flex-row gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={inputRefs.current[index]}
              className="min-h-24 min-w-24 text-xl text-center"
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>
      </View>

      <View className="mt-4">
        <Button
          disabled={!isVerifyEnabled}
          onPress={handleVerify}
          className={"bg-primary"}
        >
          <Text>Verify</Text>
        </Button>
      </View>

      <View className="flex-row justify-center items-center mt-4">
        <Text className="text-gray-600">Don't have an account? </Text>
        <Button
          onPress={handleResendOTP}
          variant="link"
          className="text-primary"
        >
          <Text>Click To Resend</Text>
        </Button>
      </View>
    </View>
  );
};

export default SignupOtpLayout;
