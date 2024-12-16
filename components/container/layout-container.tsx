import { View } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const LayoutContainer = (props: Props) => {
  return (
    <View className={cn("flex-1 android:pt-28 ios:mt-0 px-4", props.className)}>
      {props.children}
    </View>
  );
};

export default LayoutContainer;
