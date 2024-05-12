import { Link, router, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Showing from "./EditCours/Showing";
export default function Page() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const getUser = async () => {
    try {
      // const us = await GetUser();
      // setUser(us);
      // console.log(us);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push("./CourseDetailsSinglePage")}>
        <Text style={styles.title}>single course user</Text>
      </Pressable>
    <Pressable 
    onPress={() => router.push("/EditCours/Showing")}>
      <Text style={styles.title}>EditCours</Text>
    </Pressable>

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
