import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CourseList from "../components/CourseList";
import ProfileSection from "../components/ProfileSection";

const profileImg =
  "https://cdn3d.iconscout.com/3d/premium/thumb/lawyer-6779105-5580748.png";

const HomeScreen = () => {
  const [userName, setUserName] = useState("User Name");
  const [searchTitle, setSearchTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const toProfile = () => {
    router.push("/profile/Profile");
  };
  return (
    <>
      <SafeAreaView className="flex-1 pt-6">
        <View style={styles.backView}>
          {/* ===== PROFILE PART ===== */}
          <ProfileSection
            userName={userName}
            profileImg={profileImg}
            toProfile={toProfile}
          />

          {/* ===== SEARCH PART ===== */}
          <View className="mt-4 mb-8">
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: isFocused ? "#483D8B" : "#e8e8e8",
                },
              ]}
              className="flex-row py-2 pl-4 pr-2 mb-4 bg-gray-100 text-gray-700 self-center"
            >
              <TextInput
                style={styles.input}
                autoCorrect={false}
                value={searchTitle}
                placeholder="Search Course"
                onChangeText={setSearchTitle}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
                className="flex-1 py-2"
              />
              <Ionicons name={"search-circle"} style={styles.inputIcon} />
            </View>
          </View>
        </View>

        {/* ===== BASIC COURSES PART ===== */}
        <View>
          <View style={styles.basicCourses}>
            <Text className="text-3xl font-bold text-white ml-6">
              Basic Courses
            </Text>
            <CourseList />
          </View>

          {/* ===== ADVANCED COURSES PART ===== */}
          <View style={styles.advancedCourses}>
            <Text className="text-3xl font-bold text-dark ml-6">
              Advanced Courses
            </Text>
            <CourseList />
          </View>
        </View>
      </SafeAreaView>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  /* ===== PROFILE PART ===== */
  profilePic: {
    width: 70,
    height: 70,
  },
  backView: {
    backgroundColor: "#7B68EE",
    padding: 20,
    paddingBottom: 60,
  },

  /* ===== COURSES PART ===== */
  basicCourses: {
    top: "-12%",
  },

  advancedCourses: {
    top: "-6%",
  },
  /* ===== SEARCH PART ===== */
  inputContainer: {
    borderWidth: 0.5,
    borderRadius: 5,
  },
  inputIcon: {
    fontSize: 36,
    color: "#ff9514",
    marginRight: 10,
  },
  input: {
    color: "#483D8B",
    fontSize: 17,
  },
});
