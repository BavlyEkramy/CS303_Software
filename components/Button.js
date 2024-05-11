import { StyleSheet, Text, View, Keyboard } from "react-native";
import React from "react";
import { Pressable } from "react-native";

const Button = ({ title, onPress = () => {} }) => {
  return (
    <>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 55,
    width: "100%",
    backgroundColor: "#f7af2a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  text: { fontSize: 20, fontWeight: "bold" },
});
