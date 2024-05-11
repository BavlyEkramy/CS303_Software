import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// import Home from "./home/Home";
import {
  DelCourse,
  GetCourses,
  GetCoursesForAdmin,
  updateCourse,
} from "../firebase/Courses";
import { login, register } from "../firebase/Log";
import { GetUser } from "../firebase/Users";
import {
  AddItemsCards,
  GetCartForUser,
  IsExistInCart,
  getCardItems,
  getCardItemsWithId,
} from "../firebase/CartItems";

const Route = () => {
  const [user, setUser] = useState({});
  const [course, setCourse] = useState({});
  const [cart, setCart] = useState({});
  const test = async () => {
    try {
      console.log(user);
      //  const t = await sup();
      router.("./AddCourse");
      // const t = await AddItemsCards(course[1],user);
      // console.log(t);
      // setCourse(t);
    } catch (error) {
      console.log(error);
    }
  };
  // getCardItemsWithId;
  const logi = async () => {
    try {
      await login("bdd@b.com", "123456789");
      // await AddUser({ name: "bavly", email: "b@b.com" , img:""});
      const u = await GetUser();
      setUser(u);
      const t = await GetCourses();
      console.log(t);
      setCourse(t);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text onPress={test} style={styles.title}>
        go to Add Course
      </Text>
      <Text onPress={logi} style={styles.title}>
        login
      </Text>
    </View>
  );
};

export default Route;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
  },
});
