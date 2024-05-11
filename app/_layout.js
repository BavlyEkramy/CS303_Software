import { View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

// Import your global CSS file
import "../global.css";

export default function _layout() {
  return (
    <>
      {/* <Slot /> */}
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Welcome",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="users/[id]"
          options={{
            headerTitle: "User",
          }}
        />
        <Stack.Screen
          name="account/Register"
          options={{
            headerTitle: "Register",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="account/Login"
          options={{
            headerTitle: "Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="account/ForgetPassword"
          options={{
            headerTitle: "ForgetPassword",
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
