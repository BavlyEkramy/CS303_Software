import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  Image,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { router } from "expo-router";
import KeyboardView from "../components/KeyboardView";
import { logout } from "../firebase/Log";
import { GetUser } from "../firebase/Users";
import AsyncStorage from "@react-native-async-storage/async-storage";
const profileImg =
  "https://cdn3d.iconscout.com/3d/premium/thumb/lawyer-6779105-5580748.png";

const ProfileScreen = () => {
  const [userName, setUserName] = useState("");
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleMyLearning = () => {
    router.push("/profile/MyLearning");
  };
  const handleMyCourses = () => {
    router.push("/profile/MyCourses");
  };

  const fetchUserData = async () => {
    try {
      const userData = await GetUser();
      setUserName(userData.name);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("userRegistered");
    await logout();
    router.push("/account/Login");
  };

  return (
    <>
      <KeyboardView>
        <View
          style={{ paddingTop: StatusBar.currentHeight }}
          className="flex-1 bg-white"
        >
          <View style={styles.header} className="p-6">
            <View className="flex-row">
              <Pressable
                onPress={() => router.back()}
                style={{ height: 40 }}
                className="bg-yellow-500 p-2 rounded-tr-2xl rounded-bl-2xl mr-4"
              >
                <ArrowLeftIcon size={24} color="black" />
              </Pressable>
            </View>
            <Text className="text-4xl font-bold text-white">Profile</Text>
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <View style={styles.circleAvatar}>
              <Image
                style={styles.profilePic}
                source={{ uri: profileImg }}
                resizeMode="contain"
              />
            </View>
            <Text className="text-center text-neutral-600 text-3xl font-semibold p-3">
              {userName || "User Name"}
            </Text>
          </View>

          <View>
            <View className="p-6">
              <Pressable onPress={handleMyLearning}>
                <View
                  style={styles.listItem}
                  className="flex-row items-center mb-5 pb-5"
                >
                  <Feather
                    name="book-open"
                    size={40}
                    color="#7B68EE"
                    className="mr-3"
                  />
                  <Text className="text-2xl">My Learning</Text>
                </View>
              </Pressable>
              <Pressable onPress={handleMyCourses}>
                <View
                  style={styles.listItem}
                  className="flex-row items-center mb-5 pb-5"
                >
                  <Feather
                    name="upload"
                    size={40}
                    color="#7B68EE"
                    className="mr-3"
                  />
                  <Text className="text-2xl">My Courses</Text>
                </View>
              </Pressable>

              <Pressable onPress={handleLogOut}>
                <View
                  style={styles.listItem}
                  className="flex-row items-center mb-5 pb-5"
                >
                  <SimpleLineIcons
                    name="logout"
                    size={40}
                    color="#7B68EE"
                    className="mr-3"
                  />
                  <Text className="text-2xl">Logout</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        </View>
      </KeyboardView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#7B68EE",
    height: "20%",
    flexDirection: "row",
  },
  circleAvatar: {
    justifyContent: "center",
    alignContent: "center",
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    marginRight: 10,
  },
  listItem: {
    borderBottomWidth: 0.3,
    borderBottomColor: "black",
  },
});
