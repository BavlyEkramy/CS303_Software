import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../firebase/Log";
const WelcomeImage = require("../assets/images/register.png");

const WelcomeScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    checkUserRegistered();
  }, []);
  const checkUserRegistered = async () => {
    const userRegistered = await AsyncStorage.getItem("userRegistered");

    if (userRegistered) {
      const email = await AsyncStorage.getItem("email");
      const password = await AsyncStorage.getItem("password");
      await login(email, password);
      router.push("/home/Home");
    }

    setLoading(false);
  };

  return (
    <>
      <SafeAreaView
        className="flex-1"
        style={{
          backgroundColor: "#7B68EE",
          paddingTop: StatusBar.currentHeight,
        }}
      >
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
        </View>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      </SafeAreaView>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
