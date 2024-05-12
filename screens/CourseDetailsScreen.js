import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import DetailsSection from "../components/DetailsSection";
import ChaptersSection from "../components/ChaptersSection";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { getChapters as getChFromCourse } from "../firebase/Courses";
import { GetUser } from "../firebase/Users";
import {
  IsExistInCart,
  getChapters as getChFromCart,
} from "../firebase/CartItems";

const CourseDetailsScreen = () => {
  const router = useRouter();
  const { img, name, category, Nch, Nvi, description, adminName, id } =
    useLocalSearchParams();

  const [chapterList, setChapterList] = useState([]);

  const IsCart = async () => {
    try {
      const fg = await IsExistInCart(id);
      if (fg) {
        const f = await getChFromCart(fg.cartId);

        console.log("lllllllllll", f);

        setChapterList(f);
      } else {
        const us = await getChFromCourse(id);
        setChapterList(us);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useLayoutEffect(() => {
    IsCart();
  }, []);

  return (
    <>
      <ScrollView className="pb-4">
        <SafeAreaView className="flex-1 pt-8 bg-white">
          <View className="flex-row ml-4 mt-4">
            <Pressable
              onPress={() => router.back()}
              className="bg-yellow-500 p-2 rounded-tr-2xl rounded-bl-2xl"
            >
              <ArrowLeftIcon size={24} color="black" />
            </Pressable>
          </View>
          <DetailsSection
            img={img}
            name={name}
            Nch={Nch}
            Nvi={Nvi}
            category={category}
            description={description}
            adminName={adminName}
            id={id}
            rerender={IsCart}
          />
          <ChaptersSection
            chapterList={chapterList}
            id={id}
            
          />
        </SafeAreaView>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      </ScrollView>
    </>
  );
};

export default CourseDetailsScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#7B68EE",
    height: "15%",
  },
  circleAvatar: {
    justifyContent: "center",
    alignContent: "center",
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    marginRight: 10,
  },
  listItem: {
    borderBottomWidth: 0.3,
    borderBottomColor: "black",
  },
});
