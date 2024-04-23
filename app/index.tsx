import { Link, router, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AddUser, DelUser, GetUser } from "../firebase/Users";
import { login, register } from "../firebase/Log";

export default function Page() {
  const [user, setUser] = useState(null);

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
      <Text onPress={getUser} style={styles.title}>
        Get Started !
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
