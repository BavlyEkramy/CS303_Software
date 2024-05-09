import { Link, router, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AddUser, DelUser, GetUser } from "../firebase/Users";
import { login, register } from "../firebase/Log";
import {
  AddItemsCards,
  deleteItemsCards,
  editCard,
  getCardItems,
  // subscribe,
} from "../firebase/CartItems";
import { AddCourse, GetCourses } from "../firebase/Courses";

export default function Page() {
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState({});
  const test = async () => {
    try {
      const u = await GetCourses();
      setCourse(u[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const logi = async () => {
    try {
      // await login("bavly@b.com", "123456789");
      const u = await GetUser();
      setUser(u);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          router.navigate({
            pathname: "/AddChapterToCourse",
            params: {
              courseId: course.id,
            },
          });
        }}
        style={styles.title}
      >
        go to AddChapterToCourse
      </Text>
      <Text onPress={test} style={styles.title}>
        test
      </Text>
      <Text onPress={logi} style={styles.title}>
        login
      </Text>
    </View>
  );
}
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
