import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const VideoItem = ({
  pathname,
  linked,
  name,
  number,
  color,
  iconName,
  option,
  completed,
}) => {
  const router = useRouter();

  const [isCompleted, setIsCompleted] = useState(completed);

  const handlePress = () => {
    if (!option) {
      router.push({
        pathname: `/course/${pathname}`,
        params: { linked, name },
      });
      setIsCompleted(true);
    }
  };

  return (
    <>
      <View style={styles.container} className="justify-center p-2 mb-4">
        <Pressable onPress={handlePress} disabled={option}>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Text style={{ color: "#f7af2a" }} className="text-2xl mr-2">
                {number <= 9 ? `0${number}` : `${number}`}
              </Text>
              <Text className="text-2xl">{name}</Text>
            </View>
            <Ionicons name={iconName} size={25} color={color} />
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default VideoItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
});
