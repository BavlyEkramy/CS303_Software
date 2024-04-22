import { Link, router, Redirect } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    // <Redirect href={'/login'}/>
    <View style={styles.container}>
      <Text style={styles.title}>Get Started !</Text>

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
