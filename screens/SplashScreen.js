import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const waveLoading = require("../assets/jsons/IntroAnimation.json");

const SplashScreen = ({ setLoading }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", margin: 0 }}>
      <LottieView
        source={waveLoading}
        autoPlay
        loop={false}
        resizeMode="cover"
        onAnimationFinish={() => setLoading(false)}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
