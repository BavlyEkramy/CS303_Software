import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  textMode,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <View style={styles.inputContainer}>
        <Text className="text-xl text-gray font-semibold">{label}</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: error ? "red" : isFocused ? "#483D8B" : "#e8e8e8",
            },
          ]}
          className="py-2 px-3 bg-white"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
          inputMode={textMode}
        />

        {error && (
          <Text style={{ color: "red", fontSize: 14, marginTop: 8 }}>
            {error}
          </Text>
        )}
      </View>
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  input: {
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
