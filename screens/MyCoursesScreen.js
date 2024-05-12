import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { FlatList } from "react-native";
import CourseCard from "../components/CourseCard";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useRouter } from "expo-router";
import Button from "../components/Button";
import { GetCoursesForAdmin } from "../firebase/Courses";

// Import images using require
const html = require("../assets/images/html.jpeg");
const js = require("../assets/images/js.jpg");
const node = require("../assets/images/node.png");

const MyCoursesScreen = () => {
  const router = useRouter();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [courses, setCourse] = useState({});
  const Init = async () => {
    try {
      const fg = await GetCoursesForAdmin();
      setCourse(fg);
    } catch (e) {
      console.log(e);
    }
  };
  useLayoutEffect(() => {
    Init();
  }, []);

  return (
    <>
      <View
        style={{ paddingTop: StatusBar.currentHeight }}
        className="flex-1 bg-white"
      >
        <View
          style={{
            backgroundColor: "#7B68EE",
            height: windowWidth > 400 ? "48%" : "22%",
          }}
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
            <Text className="text-4xl font-bold text-white">My Courses</Text>
          </View>
          <View className="my-4 p-4 justify-center items-center">
            <View
              style={{
                width: "60%",
                justifyContent: "center",
              }}
            >
              <Button
                title={"Upload Course"}
                onPress={() => router.push("/course/AddCourse")}
              />
            </View>
          </View>
        </View>

        <FlatList
          data={courses}
          renderItem={({ item }) => <CourseCard item={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text className="text-3xl text-center mt-4">
              No uploaded courses 🙂
            </Text>
          }
        />
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      </View>
    </>
  );
};

export default MyCoursesScreen;
