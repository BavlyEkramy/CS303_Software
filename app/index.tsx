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
  subscribe,
} from "../firebase/CartItems";

export default function Page() {
  const [cart, setCart] = useState(null);

  const getUser = async () => {
    try {
      // await AddItemsCards(
      //   {
      //     name: "ch1",
      //     level: 5,
      //     dis: "50mknljbm sakbu uepfg ulb ;is  ersfjckbhs  dss",
      //     img: "",
      //     hours: "hard",
      //   },
      //   { name: "bavly", id: "knjbhv" }
      // );
      const u = await getCardItems();
      console.log(u);
      setCart(u);
      // await deleteItemsCards(u[0].id);
      const c1 = {...u[0] , name:"ch3" , hours:60}
      const pp = await editCard(c1);
    } catch (error) {
      console.log(error);
    }
  };
  const logi = async () => {
    try {
      await login("b@b.com", "123456789");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text onPress={getUser} style={styles.title}>
        Get Started !
      </Text>
      <Text onPress={logi} style={styles.title}>
        log
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
