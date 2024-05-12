import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

const ProfileSection = ({ userName, profileImg, toProfile }) => {
  return (
    <View style={styles.profileContainer}>
      <Pressable onPress={toProfile}>
        <Image style={styles.profilePic} source={{ uri: profileImg }} />
      </Pressable>
      <View>
        <Text style={styles.welcomeText}>Welcome 👋🏼</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  welcomeText: {
    color: "white",
    fontSize: 16,
  },
  userName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProfileSection;
