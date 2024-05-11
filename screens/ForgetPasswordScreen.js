import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useRouter } from "expo-router";

import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import KeyboardView from "../components/KeyboardView";

const ForgetPasswordScreen = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
  });

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input valid email", "email");
      valid = false;
    }

    if (valid) {
      forgetPassword();
    }
  };

  const forgetPassword = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        router.push("/account/Register");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 2000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (message, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: message }));
  };

  return (
    <>
      <KeyboardView>
        <View
          className="flex-1"
          style={{ backgroundColor: "#7B68EE", paddingTop: 40 }}
        >
          <SafeAreaView className="flex">
            <View className="flex-row justify-start">
              <Pressable
                onPress={() => router.back()}
                className="bg-yellow-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
              >
                <ArrowLeftIcon size={24} color="black" />
              </Pressable>
            </View>
            <View className="flex-row justify-center mb-4">
              <Image
                source={require("../assets/images/login.png")}
                style={{ width: 240, height: 240 }}
              />
            </View>
          </SafeAreaView>
          <View
            className="flex-1 bg-white px-8 pt-8"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <View className="form space-y-2">
              <View className="mb-5">
                <Text
                  style={{ fontSize: 20 }}
                  className="font-medium text-gray-600 ml-2"
                >
                  We will send you a reset password email !
                </Text>
              </View>
              <Input
                label={"Email"}
                iconName={"email"}
                placeholder="Enter Email"
                textMode="email"
                onChangeText={(text) => handleOnChange(text, "email")}
                error={errors.email}
                onFocus={() => {
                  handleError(null, "email");
                }}
              />
              {loading ? (
                <View className="flex-row justify-center">
                  <ActivityIndicator
                    size={hp(6.5)}
                    className="text-indigo-500"
                  />
                </View>
              ) : (
                <Button title={"Send"} onPress={validate} />
              )}
            </View>
            <Text
              style={{ fontSize: 20 }}
              className="text-gray-700 font-bold text-center my-4"
            >
              OR
            </Text>
            <View className="flex-row justify-center mt-2">
              <Text
                style={{ fontSize: 18 }}
                className="text-gray-500 font-semibold"
              >
                Already have an account?
              </Text>
              <Pressable onPress={() => router.push("/account/Login")}>
                <Text
                  style={{ fontSize: 18 }}
                  className="font-semibold text-center text-yellow-500 ml-2"
                >
                  Log In
                </Text>
              </Pressable>
            </View>
            <View className="flex-row justify-center mt-4">
              <Text
                style={{ fontSize: 18 }}
                className="text-gray-500 font-semibold"
              >
                Don't have an account?
              </Text>
              <Pressable onPress={() => router.push("/account/Register")}>
                <Text
                  style={{ fontSize: 18 }}
                  className="font-semibold text-center text-yellow-500 ml-2"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <StatusBar backgroundColor={"lightgreen"} barStyle={"dark-content"} />
      </KeyboardView>
    </>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({});
