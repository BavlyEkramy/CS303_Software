import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";
import OptionItem from "./OptionItem";
import { GetCourseById } from "../firebase/Courses";
import { AddItemsCards, IsExistInCart } from "../firebase/CartItems";
import { GetUser } from "../firebase/Users";
import { router } from "expo-router";
import { useRef } from "react";

const DetailsSection = ({
  img,
  name,
  category,
  Nch,
  Nvi,
  description,
  adminName,
  id,
  rerender,
}) => {
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const [flag, setFlag] = useState({});

  const IsCart = async () => {
    try {
      const use = await GetUser();
      setUser(use);
      const fg = await IsExistInCart(id);
      console.log("mmmmmmmmmmmmmmm", fg.name);

      setFlag(fg);
      if (fg) {
        setCourse(fg);
        adminName = course.admin.name;
      } else {
        const y = await GetCourseById(id);
        setCourse(y);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useLayoutEffect(() => {
    IsCart();
  }, []);
  const handleOnPress = async () => {
    try {
      await AddItemsCards(course, user);
      setCourse(true);
      rerender();
      IsCart();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <SafeAreaView className="mt-5 p-5">
        {/* course image */}
        <View>
          <Image
            source={{ uri: course.img }}
            resizeMode="contain"
            style={{
              width: "100%",
              height: Dimensions.get("screen").height * 0.3,
              borderRadius: 15,
            }}
            className="bg-neutral-100"
          />
        </View>

        {/* course name */}
        <Text
          style={{ color: "#6857E8" }}
          className="font-bold ml-4 mt-8 text-3xl"
        >
          {course.name}
        </Text>
        <View className="flex flex-row mb-4 mt-2 justify-around">
          <View className="justify-around items-start">
            <OptionItem
              icon="book-outline"
              value={`${Nch || 0}  Chapters`}
              size={2.5}
            />
            <OptionItem
              icon="person-circle-outline"
              value={adminName}
              size={2.5}
            />
          </View>
          <View>
            <OptionItem
              icon="time-outline"
              value={`${Nvi || 0} Videos`}
              size={2.5}
            />
            <OptionItem icon="cellular-outline" value={category} size={2.5} />
          </View>
        </View>

        <Text className="text-3xl font-semibold mt-4 ml-5">Description</Text>
        {/* Text of Description */}
        <Text
          style={{
            lineHeight: 30,
          }}
          className="text-xl mt-4 ml-4 flex-wrap text-gray-500"
        >
          {description || "Description"}
        </Text>

        {!flag ? (
          <View className="flex-row justify-center mt-4">
            <Pressable
              style={{ backgroundColor: "#6857E8" }}
              className="py-4 px-8 rounded-xl"
              onPress={handleOnPress}
            >
              <Text className="text-white text-center text-2xl font-semibold">
                Enroll For Free
              </Text>
            </Pressable>
          </View>
        ) : null}
      </SafeAreaView>
    </>
  );
};
export default DetailsSection;
