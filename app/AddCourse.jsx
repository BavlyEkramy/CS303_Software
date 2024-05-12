import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GetUser } from "../firebase/Users";
import { AddCourse } from "../firebase/Courses";

export default function TestCourse() {
  const router = useRouter();
  const [course, setCourse] = useState({
    name: "",
    description: "",
    img: "",
    category: "",
  });

  const [user, setUser] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: "Advanced", value: "0" },
    { label: "Basic", value: "1" },
  ];

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await GetUser();
        setUser(fetchedUser);
      } catch (e) {
        console.error("Error fetching user:", e);
      }
    };
    fetchUser();
  }, []);

  // Function to handle course addition
  const addCourse = async () => {
    console.log(course);

    try {
      if (course.category && course.description && course.img && course.name) {
        const yoy = await AddCourse(course, user);
        router.navigate({
          pathname: "/AddChapterToCourse",
          params: {
            courseId: yoy,
          },
        });
      } else alert("please fill the fields");
    } catch (e) {
      console.error("Error adding course:", e);
    }
  };

  // Render label conditionally
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {isFocus ? "Search" : "Select item"}
        </Text>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <FormInput
          label="Course Name"
          placeholder="Course Name"
          value={course.name}
          onChangeText={(value) => setCourse({ ...course, name: value })}
        />
        <FormInput
          label="Course Description"
          placeholder="Course Description"
          value={course.description}
          onChangeText={(value) => setCourse({ ...course, description: value })}
        />
        <DropdownInput
          label="Course Category"
          data={data}
          value={value}
          isFocus={isFocus}
          onChange={(item) => {
            setCourse({ ...course, category: item.label });
            setValue(item.value);
            setIsFocus(false);
          }}
          setIsFocus={setIsFocus}
        />
        <FormInput
          label="Profile URL"
          placeholder="Profile URL"
          value={course.img}
          onChangeText={(value) => setCourse({ ...course, img: value })}
        />
        <Pressable style={styles.nextButton} onPress={addCourse}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const FormInput = ({ label, placeholder, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

// Functional component for dropdown input field
const DropdownInput = ({
  label,
  data,
  value,
  isFocus,
  onChange,
  setIsFocus,
}) => (
  <View style={styles.dropdownContainer}>
    <Text style={styles.label}>{label}</Text>
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      data={data}
      value={value}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? "Select item" : "..."}
      placeholderStyle={{ color: "blue" }}
      searchPlaceholder="Search..."
      onChange={onChange}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      renderLeftIcon={() => (
        <AntDesign
          name="Safety"
          size={20}
          style={{ marginRight: 10, color: isFocus ? "blue" : "black" }}
        />
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "white",
  },
  dropdownContainer: {
    width: "100%",
    marginVertical: 10,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 50,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
