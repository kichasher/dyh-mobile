import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "@/lib/icons";
import { Text } from "../ui/text";
import { Pressable, View } from "react-native";
type State = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type Action = Partial<State>;
type Props = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const LoginForm = ({ state, dispatch }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
      <View className="flex mt-16">
        <Text className="text-3xl font-bold mb-2 text-center">
          Welcome Back
        </Text>
        <Text className="text-gray-500 text-base text-center">
          Let's get started—please enter your details.
        </Text>

        <View className="mb-4 mt-8">
          <Label className="text-gray-600 mb-2">Email</Label>
          <Input
            value={state.email}
            onChangeText={(email) => dispatch({ email: email })}
            placeholder="Email address"
          />
        </View>

        <View className="mb-4">
          <Label className="text-gray-600 mb-2">Password</Label>
          <View className="relative">
            <Input
              value={state.password}
              onChangeText={(password) => dispatch({ password: password })}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3"
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-400" />
              ) : (
                <Eye size={20} className="text-gray-400" />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginForm;
