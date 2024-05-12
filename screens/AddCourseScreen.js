import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Keyboard,
  StatusBar,
  ScrollView,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { GetUser } from "../firebase/Users";
import { AddCourse } from "../firebase/Courses";
import FormInput from "../components/FormInput";
import DropdownInput from "../components/DropdownInput";
import KeyboardView from "../components/KeyboardView";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import Button from "../components/Button";

export default function AddCourseScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    name: "",
    description: "",
    img: "",
    category: "",
  });

  const data = [
    { label: "Advanced", value: "0" },
    { label: "Basic", value: "1" },
  ];

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

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

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!course.name) {
      handleError("Please input course name", "name");
      valid = false;
    }

    if (!course.description) {
      handleError("Please input course description", "description");
      valid = false;
    }

    if (!course.category) {
      handleError("Please input course category", "category");
      valid = false;
    }

    if (!course.img) {
      handleError("Please input course img", "img");
      valid = false;
    }

    if (valid) {
      addCourse();
    }
  };

  const handleOnChange = (text, input) => {
    setCourse((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (message, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: message }));
  };

  // Function to handle course addition
  const addCourse = async () => {
    try {
      if (course.category && course.description && course.img && course.name) {
        const id = await AddCourse(course, user);
        router.push({
          pathname: "/course/AddChapter",
          params: {
            courseId: id,
          },
        });
      } else {
        Alert.alert("Add Course", "Please Fill The Fields !");
      }
    } catch (e) {
      console.error("Error Adding Course:", e.message);
    }
  };

  return (
    <>
      <KeyboardView>
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
            marginBottom: windowWidth > 400 ? "15%" : 0,
          }}
          className="flex-1 items-center"
        >
          <View
            style={{
              backgroundColor: "#7B68EE",
              height: windowWidth > 400 ? "22%" : "18%",
              width: "100%",
            }}
            className="p-6 pt-8"
          >
            <View className="flex-row">
              <Pressable
                onPress={() => router.back()}
                style={{ height: 40 }}
                className="bg-yellow-500 p-2 rounded-tr-2xl rounded-bl-2xl mr-4"
              >
                <ArrowLeftIcon size={24} color="black" />
              </Pressable>
              <Text className="text-4xl font-bold text-white">
                Add Course Info
              </Text>
            </View>
          </View>
          <SafeAreaView
            style={[
              styles.formContainer,
              { marginVertical: windowWidth > 400 ? "5%" : "15%" },
            ]}
            className="justify-center items-center p-5 bg-white rounded-xl"
          >
            <FormInput
              label={"Course Name"}
              iconName={"email"}
              placeholder="Course Name"
              textMode="text"
              value={course.name}
              onChangeText={(value) => handleOnChange(value, "name")}
              error={errors.name}
              onFocus={() => {
                handleError(null, "name");
              }}
            />
            <FormInput
              label="Course Description"
              placeholder="Course Description"
              textMode="text"
              value={course.description}
              onChangeText={(value) => handleOnChange(value, "description")}
              error={errors.description}
              onFocus={() => {
                handleError(null, "description");
              }}
            />
            <DropdownInput
              label="Course Category"
              data={data}
              value={value}
              isFocus={isFocus}
              onChange={(item) => {
                handleOnChange(item.label, "category");
                setValue(item.value);
                setIsFocus(false);
              }}
              setIsFocus={setIsFocus}
            />
            <FormInput
              label="Profile URL"
              placeholder="Profile URL"
              value={course.img}
              textMode="url"
              onChangeText={(value) => handleOnChange(value, "img")}
              error={errors.img}
              onFocus={() => {
                handleError(null, "img");
              }}
            />
            <Pressable
              style={styles.nextButton}
              className="justify-center items-center p-2 rounded-xl"
              onPress={validate}
            >
              <Text
                style={styles.buttonText}
                className="text-2xl text-white font-bold"
              >
                Next
              </Text>
            </Pressable>
          </SafeAreaView>
        </View>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      </KeyboardView>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "90%",
    elevation: 5,
    shadowColor: "black",
  },
  nextButton: {
    backgroundColor: "#7B68EE",
    width: "60%",
  },
});
