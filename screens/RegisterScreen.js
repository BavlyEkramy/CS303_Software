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
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useRouter } from "expo-router";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import KeyboardView from "../components/KeyboardView";

const googleLogo = require("../assets/images/google.png");
const facebookLogo = require("../assets/images/facebook.png");
const registerLogo = require("../assets/images/register.png");

const Register = () => {
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

    if (!inputs.username) {
      handleError("Please input username", "username");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      valid = false;
    } else if (
      !inputs.password.match(
        /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*?_])\S*$/
      )
    ) {
      handleError(
        "Password must be at least 6 characters, 1 upper case, 1 lower case, and 1 special character ",
        "password"
      );
      valid = false;
    }

    if (valid) {
      signUp();
    }
  };

  const signUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        router.push("/account/Login");
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
          <Loader visible={loading} />
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
                source={registerLogo}
                style={{ width: 160, height: 160 }}
              />
            </View>
          </SafeAreaView>
          <View
            className="flex-1 bg-white px-8 pt-8"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <View className="form space-y-2">
              <Input
                label={"User Name"}
                iconName={"account-outline"}
                placeholder="Enter Username"
                textMode="text"
                onChangeText={(text) => handleOnChange(text, "username")}
                error={errors.username}
                onFocus={() => {
                  handleError(null, "username");
                }}
              />
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

              {loading ? (
                <View className="flex-row justify-center">
                  <ActivityIndicator
                    size={hp(6.5)}
                    className="text-indigo-500"
                  />
                </View>
              ) : (
                <Button title={"Sign Up"} onPress={validate} />
              )}
            </View>

            <View className="flex-row justify-center mt-4">
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
          </View>
          <StatusBar backgroundColor={"lightgreen"} barStyle={"dark-content"} />
        </View>
      </KeyboardView>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({});
