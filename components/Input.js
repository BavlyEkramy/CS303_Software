import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const Input = ({
  label,
  iconName,
  error,
  password,
  textMode,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View className="mb-4">
      <Text className="text-xl text-gray-600 ml-2 mb-4">{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? "red" : isFocused ? "#483D8B" : "#e8e8e8",
          },
        ]}
        className="bg-gray-100 text-gray-700"
      >
        <Icon name={iconName} style={styles.inputIcon} />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
          secureTextEntry={hidePassword}
          inputMode={textMode}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={{ fontSize: 24, color: "#483D8B" }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          />
        )}
      </View>
      {error && (
        <Text style={{ color: "red", fontSize: 14, marginTop: 8 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 3,
  },
  inputIcon: {
    fontSize: 22,
    color: "#6A5ACD",
    marginRight: 10,
  },
  input: {
    color: "#483D8B",
    flex: 1,
    paddingVertical: 6,
    fontSize: 17,
  },
});
