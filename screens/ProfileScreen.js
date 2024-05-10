import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
const profileImg =
  "https://cdn3d.iconscout.com/3d/premium/thumb/lawyer-6779105-5580748.png";

const ProfileScreen = () => {
  const handleMyLearning = () => {
    router.push("/profile/MyLearning");
  };
  const handleMyCourses = () => {
    router.push("/profile/MyCourses");
  };
  return (
    <>
      <View className="flex-1 pt-8 bg-white">
        <View style={styles.header} className="p-6">
          <Text className="text-4xl font-bold text-white">Profile</Text>
        </View>

        <View
          style={{
            top: "-10%",
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
          <Text className="text-center text-3xl font-semibold p-3">
            User Name
          </Text>
        </View>

        <View style={[styles.userNameContainer, styles.marginTop]}>
          <View className="p-8">
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
          </View>
        </View>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#7B68EE",
    height: "20%",
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
