import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, Octicons } from "@expo/vector-icons";

const CourseCard = ({ item }) => {
  return (
    <>
      <Pressable
        className="flex-row bg-neutral-100 m-4 items-center gap-4 p-2"
        style={{
          borderRadius: 10,
          elevation: 5,
          shadowColor: "black",
        }}
      >
        <Image
          source={item.pic}
          style={{ height: hp(12), width: wp(30), borderRadius: 10 }}
          transition={500}
        />
        <View
          className="flex-1 gap-2"
          style={{
            justifyContent: "space-around",
            minHeight: 60,
          }}
        >
          <View className="flex justify-between">
            <Text className="text-xl font-semibold">{item.title}</Text>

            <View className="flex-row items-center mt-2">
              <Octicons name="bookmark" size={20} color="grey" />
              <Text
                style={{ color: "gray", marginLeft: 10 }}
                className="text-xl"
              >
                {item.chapters} Chapters
              </Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Octicons name="video" size={20} color="grey" />
              <Text
                style={{ color: "gray", marginLeft: 10 }}
                className="text-xl"
              >
                {item.videos} Videos
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default CourseCard;

const styles = StyleSheet.create({});
