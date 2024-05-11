import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const WelcomeImage = require("../assets/images/register.png");

const WelcomeScreen = () => {
  const router = useRouter();
  return (
    <>
      <SafeAreaView className="flex-1" style={{ backgroundColor: "#7B68EE" }}>
        <View className="flex-1 flex justify-around my-4">
          <Text className="text-white font-bold text-4xl text-center">
            Let's Get Started!
          </Text>
          <View className="flex-row justify-center">
            <Image source={WelcomeImage} style={{ width: 350, height: 350 }} />
          </View>
          <View className="space-y-4">
            <Pressable
              onPress={() => router.push("/account/Register")}
              className="py-3 bg-yellow-500 mx-7 rounded-xl"
            >
              <Text className="text-2xl font-bold text-center text-gray-700 py-1">
                Sign Up
              </Text>
            </Pressable>
            <View className="flex-row justify-center mt-4">
              <Text className="text-xl text-white font-semibold">
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/account/Login")}>
                <Text className="text-xl font-semibold text-center text-yellow-500">
                  Log In
                </Text>
              </Pressable>
            </View>
          </View>
          <StatusBar backgroundColor={"lightgreen"} barStyle={"dark-content"} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
