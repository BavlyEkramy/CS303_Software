import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  Alert,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useRouter } from "expo-router";
import Input from "../components/Input";
import Button from "../components/Button";
import KeyboardView from "../components/KeyboardView";
import { login } from "../firebase/Log";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoginScreen = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
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

    if (!inputs.password) {
      handleError("Please input password", "password");
      valid = false;
    }

    if (valid) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        await login(inputs.email, inputs.password);
        await AsyncStorage.setItem("userRegistered", "true");
        await AsyncStorage.setItem("email", inputs.email);
        await AsyncStorage.setItem("password", inputs.password);

        router.push("/home/Home");
      } catch (error) {
        if (error.code === "auth/invalid-credential") {
          Alert.alert("Invalid Email or Password");
        } else {
          Alert.alert("Error", error.message);
        }
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
          className="flex-1 mt-6"
          style={{
            backgroundColor: "#7B68EE",
            paddingTop: StatusBar.currentHeight,
          }}
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
              <Input
                label={"Password"}
                iconName={"lock-outline"}
                placeholder="Enter Password"
                password
                onChangeText={(text) => handleOnChange(text, "password")}
                error={errors.password}
                onFocus={() => {
                  handleError(null, "password");
                }}
              />

              <Pressable
                onPress={() => router.push("/account/ForgetPassword")}
                className="flex items-end mb-5"
              >
                <Text className="text-xl font-medium text-gray-700">
                  Forgot Password?
                </Text>
              </Pressable>
              {loading ? (
                <View className="flex-row justify-center">
                  <ActivityIndicator
                    size={hp(6.5)}
                    className="text-indigo-500"
                  />
                </View>
              ) : (
                <Button title={"Login"} onPress={validate} />
              )}
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
                  className=" font-semibold text-center text-yellow-500 ml-2"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      </KeyboardView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
