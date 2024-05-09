import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Touchable,
  Pressable,
  Alert,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { count } from "firebase/firestore";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GetUser } from "../firebase/Users";


export default function AddCourse() {
  const [user, setUser] = useState("");
  const router = useRouter();
  const [course, setCourse] = useState({
    name: "",
    description: "",
    img: "",
    catigory: "",
  });
  const [profileRef] = useState();
  const data = [
    { label: "Advanced", value: "1" },
    { label: "Basic", value: "2" },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const getuser = async () => {
    try {
      const user = await GetUser();
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getuser();
  }, []);

  const addCourse = async () => {
    try {
      console.log(course);
    } catch (e) {
      console.log(e);
    }
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={[styles.label, isFocus && { color: "blue" }]}></Text>;
    }
    return null;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: " white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                padding: 10,
                backgroundColor: "black",
                borderRadius: 10,
                width: wp("80%"),
                
              }}
            >
              Course Name
            </Text>
          </View>
          <View
            style={{
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              width: wp("80%"),
              backgroundColor: "white",
            }}
          >
            <TextInput
              placeholder="Course Name"
              onChangeText={(value) => setCourse({ ...course, name: value })}
              style={{
                padding: 10,
                fontSize: 15,
                color: "blue",
                borderRadius: 10,
                width: wp("80%"),
                height: 40,
                borderColor: "white",
                borderWidth: 1,
                backgroundColor: "white",
              }}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                padding: 10,
                backgroundColor: "black",
                borderRadius: 10,
                width: wp("80%"),
              }}
            >
              Course Category
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderColor: "blue",
              borderWidth: 1,
              borderRadius: 10,
              width: wp("80%"),
              justifyContent: "center",
              padding: 10,
              marginBottom: 10,
              marginTop: 10,
              backgroundColor: "white",
              color: "blue",
              fontSize: 15,
              fontWeight: "formal",
              padding: 0,
            }}
          >
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={{ color: "blue" }}
              selectedTextStyle={{ color: "blue" }}
              inputSearchStyle={{ color: "blue" }}
              iconStyle={{ color: "blue" }}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={{ marginRight: 10 }}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                padding: 10,
                backgroundColor: "black",
                borderRadius: 10,
                width: wp("80%"),
              }}
            >
              Course Description
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <TextInput
              placeholder="Course Description"
              onChangeText={(value) =>
                setCourse({ ...course, description: value })
              }
              style={{
                padding: 10,
                fontSize: 15,
                color: "blue",
                borderRadius: 10,
                width: wp("80%"),
                height: 40,
                borderColor: "white",
                borderWidth: 1,
                backgroundColor: "white",
              }}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                padding: 10,
                backgroundColor: "black",
                borderRadius: 10,
                width: wp("80%"),
              }}
            >
              ProfileURL
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <TextInput
              onChangeText={(value) => setCourse({ ...course, img: value })}
              placeholder="Profile URL" 
              style={{
                padding: 10,
                fontSize: 15,
                color: "blue",
                borderRadius: 10,
                width: wp("80%"),
                height: 40,
                borderColor: "white",
                borderWidth: 1,
                backgroundColor: "white",
              }}
            />
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => addCourse()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: "white",
              borderRadius: 50,
              width: wp("80%"),
              height: hp("7%"),
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 25,
                fontWeight: "bold",
                padding: 15,
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});