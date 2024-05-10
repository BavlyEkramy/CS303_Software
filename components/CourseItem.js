import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CourseItem = ({ pic, title, chapter, hour }) => {
  return (
    <>
      <View style={styles.mainSquare} className="flex bg-gray-100 p-2 m-3">
        <View style={styles.imageView} className="mb-2 p-2">
          <Image source={pic} style={styles.img} resizeMode="cover" />
        </View>
        <View className="pl-2">
          <Text className="font-bold text-2xl">{title}</Text>
        </View>
        <View className="flex-row p-2 justify-between my-2">
          <View className="flex-row">
            <Ionicons name="book" size={20} color="grey" />
            <Text style={styles.iconInfo}>{chapter} Chapter</Text>
          </View>
          <View className="flex-row">
            <Ionicons name="timer" size={20} color="grey" />
            <Text style={styles.iconInfo}>{hour} Min</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CourseItem;

const styles = StyleSheet.create({
  mainSquare: {
    width: 250,
    height: 250,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "black",
  },
  imageView: {
    height: "60%",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  iconInfo: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
  },
});
