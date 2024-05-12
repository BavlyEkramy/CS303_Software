import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const OptionItem = ({ icon, size, value }) => {
  return (
    <View className="flex flex-row items-center mt-4 gap-4">
      <Ionicons name={icon} size={10 * size} color="black" />
      <Text className="text-xl font-semibold">{value}</Text>
    </View>
  );
};

export default OptionItem;
