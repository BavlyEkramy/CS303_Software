import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StatusBar,
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInputComponent,
  TextInput,
  SafeAreaView,
} from "react-native";
import {
  GetCourseById,
  addChapter,
  getChapters,
  updateCourse,
} from "../firebase/Courses";
import { router, useLocalSearchParams } from "expo-router";
import AddVideo from "../Components/AddVideo";
import { serverTimestamp } from "firebase/firestore";

const AddChapterToCourse = () => {
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
        console.log(t);
        console.log(courseId);
        router.replace({
          pathname: "/AddChapterToCourse",
          params: {
            courseId: courseId,
          },
        });
      } else alert("please fill the fields");
    } catch (e) {
      console.log(e);
    }
  };

  const Finish = async () => {
    try {
      console.log(courseId);
      const cu = await GetCourseById(courseId);
      const ch = await getChapters(courseId);
      let nvi = 0;
      ch.forEach((value) => {
        nvi += value.videos.length;
      });
      console.log(cu);
      await updateCourse({ ...cu, Nch: ch.length, Nvi: nvi });
      router.replace("");
      /*/////////////////////////////////////////////////
      router.replace( go to MyCourses  )
      //////////////////////////////////////////////*/
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="name the chapter"
          onChangeText={(n) => {
            setCh({ ...Ch, name: n });
          }}
          style={styles.input}
        />
        <FlatList
          data={Ch.videos}
          renderItem={({ item, index }) => (
            <AddVideo key={item.id} addV={addV} />
          )}
        />
        <View style={styles.sectionOfInput}>
          <Pressable
            onPress={() => {
              Finish();
            }}
          >
            <Text style={styles.textBtn}>Finish</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              addCH();
            }}
          >
            <Text style={styles.textBtn}>Add</Text>
          </Pressable>
        </View>
      </SafeAreaView>
      <StatusBar style="#111" />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
    padding: 10,
    paddingTop: 100,
    height: "100%",
  },
  input: {
    height: 40,
    width: "88%",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  sectionOfInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    borderRadius: 20,
    width: "100%",
  },
  pressBtn: {
    width: "40%",
    color: "#fff",
  },
  textBtn: {
    fontSize: 25,
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: "100%",
    backgroundColor: "rgb(100,100,220)",
  },
});
export default AddChapterToCourse;
