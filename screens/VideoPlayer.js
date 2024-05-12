import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useGlobalSearchParams, useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoPlayer = () => {
  const router = useRouter();
  const { linked, name } = useGlobalSearchParams();
  const [playing, setPlaying] = useState(false);
  const onStateChange = (state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video Has Finished Playing!");
    }
    if (state !== "playing") {
      setPlaying(false);
    }
  };

  const getYouTubeVideoId = (url) => {
    // Split the URL at "youtu.be/"
    const parts = url.split("youtu.be/");

    if (parts.length > 1) {
      // Further split the second part by '?' to remove query parameters
      const videoId = parts[1].split("?")[0];
      return videoId;
    }
    // Return an empty string if the URL does not contain the expected format
    return "7LxA9qXUY5k";
  };

  const videoId = getYouTubeVideoId(linked);

  return (
    <>
      <ScrollView className="pt-4">
        <SafeAreaView>
          <View style={{ backgroundColor: "#7B68EE" }} className="px-5 py-10">
            <View className="flex-row">
              <Pressable
                onPress={() => router.back()}
                className="bg-yellow-500 p-2 rounded-tr-2xl rounded-bl-2xl"
              >
                <ArrowLeftIcon size={24} color="black" />
              </Pressable>
            </View>
            <View>
              <Text className="text-4xl text-center text-white font-bold">
                {name || "No Video"}
              </Text>
            </View>
          </View>

          <View className="flex justify-center items-center mt-20">
            <View style={styles.videoContainer} className="">
              {linked ? (
                <View style={styles.container}>
                  <YoutubePlayer
                    height={500}
                    play={playing}
                    videoId={videoId}
                    onChangeState={onStateChange}
                  />
                </View>
              ) : (
                <Text className="text-xl text-white text-center">
                  No video available
                </Text>
              )}
            </View>
          </View>
        </SafeAreaView>
        <StatusBar backgroundColor={"white"} />
      </ScrollView>
    </>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  videoContainer: {
    width: "95%",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
