import React from "react";
import { Stack } from "expo-router";

// Import your global CSS file
import "../global.css";

export default function _layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
