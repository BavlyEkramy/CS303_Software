import React, { useState } from "react";
import {
  StatusBar,
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  GetCourseById,
  addChapter,
  getChapters,
  updateCourse,
} from "../firebase/Courses";
import { router, useLocalSearchParams } from "expo-router";
import AddVideo from "../components/AddVideo";
import { serverTimestamp } from "firebase/firestore";
import KeyboardView from "../components/KeyboardView";

const AddChapterScreen = () => {
  const { courseId } = useLocalSearchParams();

  const [Ch, setCh] = useState({
    name: "",
    videos: [{}],
  });

  const addV = (video) => {
    setCh({
      name: Ch.name,
      time: serverTimestamp(),
      videos: [...Ch.videos, video],
    });
  };

  const addCH = async () => {
    try {
      if (Ch.name) {
        const b = Ch.videos.shift();
        const t = await addChapter(courseId, Ch);
        router.replace({
          pathname: "./AddChapter",
          params: {
            courseId: courseId,
          },
        });
      } else {
        Alert.alert("Add Chapter", "Please Fill In All The Fields !");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const Finish = async () => {
    try {
      const cu = await GetCourseById(courseId);
      const ch = await getChapters(courseId);
      let nvi = 0;
      ch.forEach((value) => {
        nvi += value.videos.length;
      });
      await updateCourse({ ...cu, Nch: ch.length, Nvi: nvi });
    } catch (e) {
      console.log(e);
    } finally {
      router.push("/profile/Profile");
    }
  };

  return (
    <>
      <KeyboardView>
        <SafeAreaView className="flex-1 items-center p-2 pt-20">
          <View style={{ width: "90%" }}>
            <TextInput
              placeholder="Chapter Title"
              onChangeText={(n) => {
                setCh({ ...Ch, name: n });
              }}
              style={styles.input}
              className="text-xl p-3 rounded-xl bg-gray-100"
            />
          </View>

          <View style={{ width: "90%" }}>
            <FlatList
              data={Ch.videos}
              renderItem={({ item }) => <AddVideo key={item.id} addV={addV} />}
            />
          </View>

          <View
            style={{ width: "100%" }}
            className="flex-row items-center justify-around p-2 rounded-xl"
          >
            <Pressable
              onPress={() => {
                Finish();
              }}
              style={{
                elevation: 5,
                shadowColor: "black",
              }}
              className="rounded-xl py-2 px-8 bg-yellow-400 "
            >
              <Text className="text-2xl font-semibold text-neutral-600">
                Finish
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                addCH();
              }}
              style={{
                elevation: 5,
                shadowColor: "black",
              }}
              className="rounded-xl py-2 px-8 bg-yellow-400 "
            >
              <Text className="text-2xl font-semibold text-neutral-600">
                Add
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      </KeyboardView>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    elevation: 5,
    shadowColor: "black",
  },
});
export default AddChapterScreen;
