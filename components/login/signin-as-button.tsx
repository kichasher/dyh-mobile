import React from "react";
import { FacebookIcon, GoogleIcon } from "@/lib/icons";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

type Props = {};

const SignInAsBtn = (props: Props) => {
  return (
    <View className="mt-6 flex flex-col gap-3 mb-4">
      <Button variant={"outline"} className="flex-1 flex-row gap-2">
        <GoogleIcon />
        <Text className="text-gray-700">Google</Text>
      </Button>

      <Button variant={"outline"} className="flex-1 flex-row gap-2">
        <FacebookIcon />
        <Text className="text-gray-700">Facebook</Text>
      </Button>
    </View>
  );
};

export default SignInAsBtn;
