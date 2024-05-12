import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChapterItem = ({ number, name, iconName, color }) => {
  return (
    <View
      style={styles.onebox}
      className="flex-row justify-between items-center m-2 rounded-xl p-4"
    >
      <View className="flex-row items-center">
        <Text style={[styles.text, { color: color }]} className="text-2xl mr-2">
          {number ? `0${number}` : number}
        </Text>
        <Text style={[styles.text, { color: color }]} className="text-2xl">
          {name}
        </Text>
      </View>
      <Ionicons name={iconName} size={25} color={color} />
    </View>
  );
};

export default ChapterItem;

const styles = StyleSheet.create({
  onebox: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(104, 87, 232, 0.11)",
    borderColor: "rgba(159, 159, 159, 1)",
  },
});
