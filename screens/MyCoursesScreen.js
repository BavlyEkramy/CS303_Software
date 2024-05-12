import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { FlatList } from "react-native";
import * as Progress from "react-native-progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CourseCard from "../components/CourseCard";
const profileImg =
  "https://www.profweblearning.com/wp-content/uploads/2020/04/e-learning.jpg";

// Import images using require
const html = require("../assets/images/html.jpeg");
const js = require("../assets/images/js.jpg");
const node = require("../assets/images/node.png");

const MyCoursesScreen = () => {
  const courses = [
    {
      pic: require("../assets/images/html.jpeg"),
      title: "Learn basic HTML",
      progress: 50,
      chapters: 5,
      videos: 25,
    },
    {
      pic: require("../assets/images/js.jpg"),
      title: "Learn basic JavaScript",
      progress: 100,
      chapters: 5,
      videos: 25,
    },
    {
      pic: require("../assets/images/node.png"),
      title: "Learn basic Node.js",
      progress: 30,
      chapters: 5,
      videos: 25,
    },
    {
      pic: require("../assets/images/html.jpeg"),
      title: "Learn basic HTML",
      progress: 50,
      chapters: 5,
      videos: 25,
    },
    {
      pic: require("../assets/images/js.jpg"),
      title: "Learn basic JavaScript",
      progress: 100,
      chapters: 5,
      videos: 25,
    },
    {
      pic: require("../assets/images/node.png"),
      title: "Learn basic Node.js",
      progress: 30,
      chapters: 5,
      videos: 25,
    },
    {
      pic: require("../assets/images/html.jpeg"),
      title: "Learn basic HTML",
      progress: 50,
      chapters: 5,
      videos: 25,
    },
    {
      pic: require("../assets/images/js.jpg"),
      title: "Learn basic JavaScript",
      progress: 100,
      chapters: 5,
      videos: 25,
    },
    {
      pic: require("../assets/images/node.png"),
      title: "Learn basic Node.js",
      progress: 30,
      chapters: 5,
      videos: 25,
    },
  ];

  return (
    <>
      <View className="flex-1 pt-8 bg-white mb-10">
        <View style={styles.header} className="p-6">
          <Text className="text-4xl font-bold text-white">My Courses</Text>
        </View>
        <View style={{ top: hp(-8) }} className="mb-5">
          <FlatList
            data={courses}
            renderItem={({ item }) => <CourseCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </>
  );
};

export default MyCoursesScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#7B68EE",
    height: "15%",
  },
  circleAvatar: {
    height: 120,
    width: 120,
  },
  profilePic: {
    width: "100%",
    height: "100%",
  },
});
