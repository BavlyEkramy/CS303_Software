import React from "react";
import { View, FlatList } from "react-native";
import html from "../assets/images/html.jpeg";
import js from "../assets/images/js.jpg";
import node from "../assets/images/node.png";
import CourseItem from "./CourseItem";

const CourseList = () => {
  const courses = [
    { pic: html, title: "Learn basic html", chapter: 15, hour: "2:30" },
    { pic: js, title: "Learn basic js", chapter: 15, hour: "2:30" },
    { pic: node, title: "Learn basic node", chapter: 15, hour: "2:30" },
  ];

  return (
    <View>
      <FlatList
        data={courses}
        renderItem={({ item }) => <CourseItem {...item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CourseList;
