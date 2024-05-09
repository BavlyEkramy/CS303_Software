import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { TextInput, View } from "react-native-web";
import { AntDesign } from "@expo/vector-icons";
const AddVideo = ({ addV }) => {
  const [video, setVideo] = useState({ name: "", link: "" });
  const [flag, setFlag] = useState(true);
  const add = () => {
    if (video.name && video.link) {
      setFlag(false);
      addV(video);
    } else alert("please fill the fields");
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.sectionOfInput}>
          <Text style={styles.text}>name</Text>
          <TextInput
            onChangeText={(n) => setVideo({ ...video, name: n })}
            style={styles.input}
            editable={flag}
          />
        </View>
        <View style={styles.sectionOfInput}>
          <Text style={styles.text}>link</Text>
          <TextInput
            onChangeText={(n) => setVideo({ ...video, link: n })}
            style={styles.input}
            editable={flag}
          />
        </View>
      </View>
      {flag ? (
        <Pressable onPress={add} style={styles.pressBtn}>
          <AntDesign
            style={styles.textBtn}
            name="plus"
            size={24}
            color="black"
          />
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: "rgb(100,100,220)",
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center",
    width: "100%",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
  },
  sectionOfInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 20,
    width: "100%",
  },
  input: {
    height: 40,
    width: "75%",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    borderRadius: 25,
    paddingHorizontal: 8,
    height: 30,
    width: "30%",
  },

  pressBtn: {
    width: 40,
  },
  textBtn: {
    fontSize: 35,
    lineHeight: 40,
    color: "#fff",
    borderRadius: 25,
    paddingHorizontal: 8,
    height: 50,
    width: "100%",
  },
});
export default AddVideo;
