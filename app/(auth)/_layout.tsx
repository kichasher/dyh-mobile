import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="signup-otp" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup-otp-confirmed"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};
export default Layout;
