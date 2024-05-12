import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  StatusBar,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native";
import * as Progress from "react-native-progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import KeyboardView from "../components/KeyboardView";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useRouter } from "expo-router";
import { GetCoursesForAdmin } from "../firebase/Courses";
import { GetCartForUser } from "../firebase/CartItems";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { transform } from "typescript";

// Import images using require
const html = require("../assets/images/html.jpeg");
const js = require("../assets/images/js.jpg");
const node = require("../assets/images/node.png");

const MyLearningScreen = () => {
  const router = useRouter();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [courses, setCourse] = usseState({});
  const Init = async () => {
    try {
      const fg = await GetCartForUser();
      setCourse(fg);
    } catch (e) {
      console.log(e);
    }
  };
  useLayoutEffect(() => {
    Init();
  }, []);

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
        source={{ uri: item.img }}
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
          <Text className="text-xl font-semibold">{item.name}</Text>
        </View>
        <Progress.Bar
          progress={(Nch / Nvi) * 100}
          width={wp(50)}
          {...{ color: "#7B68EE" }}
        />
      </View>
    </Pressable>
  );

  return (
    <>
      <View style={{ paddingTop: StatusBar.currentHeight }} className="flex-1">
        <View
          style={[styles.header, { height: windowWidth > 400 ? "30%" : "15%" }]}
          className="p-6 pt-8"
        >
          <View className="flex-row">
            <Pressable
              onPress={() => router.back()}
              style={{ height: 40 }}
              className="bg-yellow-500 p-2 rounded-tr-2xl rounded-bl-2xl mr-4"
            >
              <ArrowLeftIcon size={24} color="black" />
            </Pressable>
          </View>
          <Text className="text-4xl font-bold text-white">My Learning</Text>
        </View>

        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text className="text-3xl text-center mt-4">
              No Enrolled courses 🙂
            </Text>
          }
        />
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      </View>
    </>
  );
};

export default MyLearningScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#7B68EE",
    flexDirection: "row",
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
