import { Link, router, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AddUser, DelUser, GetUser } from "../firebase/Users";
import { login, register } from "../firebase/Log";


export default function Page() {
  const [user, setUser] = useState({});
  const logi = async () => {
    try {
      await login("b@b.com", "123456789");
      // await AddUser({ name: "bavly", email: "b@b.com" , img:""});
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
          router.navigate("/AddCourse");
        }}
        style={styles.title}
      >
        go to Add Course
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
