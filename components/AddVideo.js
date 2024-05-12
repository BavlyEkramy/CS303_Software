import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AddVideo = ({ addV }) => {
  const [video, setVideo] = useState({ name: "", link: "" });
  const [isValid, setIsValid] = useState(true);

  const handleAddVideo = () => {
    if (video.name && video.link) {
      setIsValid(false);
      addV(video);
    } else {
      Alert.alert("Add Video", "Please Fill In All The Fields !");
    }
  };

  return (
    <View
      style={styles.container}
      className="flex-row items-center justify-between px-4 py-2 rounded-xl my-3"
    >
      <View className="flex-1">
        <View className="flex-row items-center justify-between py-2 rounded-xl">
          <Text
            style={{ flex: 0.3 }}
            className="text-2xl text-white font-semibold"
          >
            Title
          </Text>
          <TextInput
            placeholder="video title"
            onChangeText={(name) => setVideo((prev) => ({ ...prev, name }))}
            editable={isValid}
            className="flex-1 bg-gray-100 rounded-xl text-xl py-2 px-4"
          />
        </View>
        <View className="flex-row items-center justify-between py-2 rounded-xl">
          <Text
            style={{ flex: 0.3 }}
            className="text-2xl text-white font-semibold"
          >
            Link
          </Text>
          <TextInput
            placeholder="video link"
            onChangeText={(link) => setVideo((prev) => ({ ...prev, link }))}
            editable={isValid}
            className="flex-1 bg-gray-100 rounded-xl text-xl py-2 px-4"
          />
        </View>
      </View>
      {isValid && (
        <Pressable
          onPress={handleAddVideo}
          className="ml-2 p-2 rounded-full bg-yellow-400"
        >
          <AntDesign size={25} name="plus" color="gray" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7B68EE",
    elevation: 5,
    shadowColor: "#000",
  },
});

export default AddVideo;
