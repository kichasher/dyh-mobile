import React, { useReducer, useState } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { LoginForm, SignInAsBtn } from "@/components/login";
import { Checkbox } from "@/components/ui/checkbox";
import { useLoginMutation } from "@/feature/services/authApi";
import Toast from "react-native-toast-message";
import { storeData } from "@/utils/utils";
import { setUser } from "@/feature";
import { useDispatch } from "react-redux";

type State = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type Action = Partial<State>;

const LoginLayout = () => {
  const [login, { isLoading }] = useLoginMutation();
  const reduxDispatch = useDispatch();
  const router = useRouter();
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => ({ ...state, ...action }),
    { email: "", password: "", rememberMe: false }
  );

  const handleLogin = async () => {
    if (!state.email || !state.password) {
      Toast.show({
        type: "error",
        text1: "Validation",
        text2: "Please enter email and password",
      });
      return;
    }
    try {
      const res = await login({
        email: state.email,
        password: state.password,
      }).unwrap();
      console.log("🚀 ~ handleLogin ~ res:", res);

      await storeData("userInfo", res);
      reduxDispatch({ type: setUser.type, payload: res });
      if (res?.user?.last_login_at !== null) {
        router.replace("/setup-profile");
        return;
      }
      router.replace("/(tabs)/dashboard");
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", JSON.stringify(error, null, 2));
      Toast.show({
        type: "error",
        text1: "Error",
        text2: JSON.stringify(error?.data?.message),
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 mt-24"
    >
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        <Image
          source={require("@/assets/images/pmpy.png")}
          className="w-3/5 h-[60px] self-center mt-5"
          resizeMode="contain"
        />

        <LoginForm state={state} dispatch={dispatch} />

        <View
          className="flex-row justify-between items-center"
          style={{ marginVertical: 8 }}
        >
          <View className="flex-row items-center">
            <Checkbox
              checked={state.rememberMe}
              onCheckedChange={(checked) => dispatch({ rememberMe: checked })}
              style={{ marginRight: 8 }}
            />
            <Text className="text-gray-600">Remember Me</Text>
          </View>
          <Link href="/forgot-password" className="text-primary">
            Forgot Password
          </Link>
        </View>

        <Button onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white font-semibold text-base">Login</Text>
          )}
        </Button>

        <View
          className="flex-row justify-center items-center"
          style={{ marginTop: 16 }}
        >
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link>
        </View>

        <View className="flex-row items-center mt-8">
          <View className="flex-1 h-[1px] bg-gray-500" />
          <Text className="mx-4 text-gray-600">OR</Text>
          <View className="flex-1 h-[1px] bg-gray-500" />
        </View>

        <SignInAsBtn />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginLayout;
