import React, { useEffect, useLayoutEffect, useState } from "react";
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
import KeyboardView from "../components/KeyboardView";
import ProfileSection from "../components/ProfileSection";
import { GetUser } from "../firebase/Users";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/Config";
import BasicList from "../components/BasicList";
import AdvancedList from "../components/AdvancedList";

const profileImg =
  "https://cdn3d.iconscout.com/3d/premium/thumb/lawyer-6779105-5580748.png";

const HomeScreen = () => {
  const [userName, setUserName] = useState("User Name");
  const [searchTitle, setSearchTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [basicCourses, setBasicCourses] = useState([]);
  const [advancedCourses, setAdvancedCourses] = useState([]);

  const fetchCoursesData = async () => {
    const colCourse = collection(db, "Courses");
    const q1 = query(colCourse, where("category", "==", "Basic"));
    onSnapshot(q1, (snapshot) => {
      let courses = [];
      snapshot.docs.forEach((use) => {
        courses.push({ ...use.data(), id: use.id });
      });
      setBasicCourses(courses);
      console.log("Basic", courses);
    });
    const q2 = query(colCourse, where("category", "==", "Advanced"));
    onSnapshot(q2, (snapshot) => {
      let courses = [];
      snapshot.docs.forEach((use) => {
        courses.push({ ...use.data(), id: use.id });
      });
      setAdvancedCourses(courses);
      console.log("Advanced", courses);
    });
  };

  const fetchUserData = async () => {
    try {
      const userData = await GetUser();
      setUserName(userData.name);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useLayoutEffect(() => {
    fetchUserData();
    fetchCoursesData();
  }, []);

  const toProfile = () => {
    router.push("/profile/Profile");
  };

  const basicData = basicCourses.filter((item) => {
    return item.name.toLowerCase().includes(searchTitle.toLowerCase());
  });

  const advancedData = advancedCourses.filter((item) => {
    return item.name.toLowerCase().includes(searchTitle.toLowerCase());
  });
  return (
    <>
      <KeyboardView>
        <SafeAreaView
          style={{ paddingTop: StatusBar.currentHeight }}
          className="flex-1"
        >
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
              <BasicList courses={basicData} />
            </View>

            {/* ===== ADVANCED COURSES PART ===== */}
            <View style={styles.advancedCourses}>
              <Text className="text-3xl font-bold text-dark ml-6">
                Advanced Courses
              </Text>
              <AdvancedList courses={advancedData} />
            </View>
          </View>
        </SafeAreaView>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      </KeyboardView>
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
