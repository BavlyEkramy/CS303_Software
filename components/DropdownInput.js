import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

const DropdownInput = ({
  label,
  data,
  value,
  isFocus,
  onChange,
  setIsFocus,
}) => {
  return (
    <>
      <View style={styles.dropdownContainer}>
        <Text className="text-xl text-gray font-semibold">{label}</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          data={data}
          value={value}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select Category" : "..."}
          placeholderStyle={{ color: "#7B68EE" }}
          searchPlaceholder="Search..."
          onChange={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          renderLeftIcon={() => (
            <AntDesign
              name="Safety"
              size={20}
              style={{ marginRight: 10, color: isFocus ? "blue" : "black" }}
            />
          )}
        />
      </View>
    </>
  );
};

export default DropdownInput;

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    marginVertical: 10,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
  },
});
