import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { FlatList } from "react-native";
import * as Progress from "react-native-progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const profileImg =
  "https://www.profweblearning.com/wp-content/uploads/2020/04/e-learning.jpg";

// Import images using require
const html = require("../assets/images/html.jpeg");
const js = require("../assets/images/js.jpg");
const node = require("../assets/images/node.png");

const MyLearningScreen = () => {
  const courses = [
    { pic: html, title: "Learn basic HTML", progress: 50 },
    { pic: js, title: "Learn basic JavaScript", progress: 100 },
    { pic: node, title: "Learn basic Node.js", progress: 30 },
    { pic: html, title: "Learn basic HTML", progress: 50 },
    { pic: js, title: "Learn basic JavaScript", progress: 100 },
    { pic: node, title: "Learn basic Node.js", progress: 30 },
    { pic: html, title: "Learn basic HTML", progress: 50 },
    { pic: js, title: "Learn basic JavaScript", progress: 100 },
    { pic: node, title: "Learn basic Node.js", progress: 30 },
  ];

  const renderItem = ({ item }) => (
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
        style={{ height: hp(10), width: wp(30), borderRadius: 10 }}
        transition={500}
      />
      <View
        className="flex-1 gap-2"
        style={{
          justifyContent: "space-around",
          minHeight: 60,
        }}
      >
        <View className="flex-row justify-between">
          <Text className="text-xl font-semibold">{item.title}</Text>
        </View>
        <Progress.Bar
          progress={item.progress / 100}
          width={wp(50)}
          {...{ color: "#7B68EE" }}
        />
      </View>
    </Pressable>
  );

  return (
    <>
      <View className="flex-1 pt-8 bg-white mb-10">
        <View style={styles.header} className="p-6">
          <Text className="text-4xl font-bold text-white">My Learning</Text>
        </View>

        <View style={{ top: hp(-8) }}>
          <FlatList
            data={courses}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </>
  );
};

export default MyLearningScreen;

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
