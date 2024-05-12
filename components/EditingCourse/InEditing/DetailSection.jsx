import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Pressable, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { DelCourse, updateCourse } from '../../../firebase/Courses';

const DetailSection = ({ course, isediting, onDelete }) => {
    const [Course, setCourse] = useState({});
    const [courseName, setCourseName] = useState("");
    const [courseLevel, setCourseLevel] = useState("");
    const [courseDec, setCourseDec] = useState("");
    const [WD, setWD] = useState();
    let w = Dimensions.get("screen").width;

    useEffect(() => {
        if (Dimensions.get("screen").width >= 450) {
            setWD(true);
        } else {
            setWD(false);
        }
        setCourse(course);
        setCourseName(course.name);
        setCourseLevel(course.category);
        setCourseDec(course.description);
    }, [WD,course])

    const handleupdateCourse = () => {
        Course.name = courseName;
        Course.category = courseLevel;
        Course.description = courseDec;
        course.img = Course.img;
        course=Course;
        /////////////////////////////////////////////////////////////
        ///////////////
        //bavly code update course
        updateCourse(course);

    }
    const handleDeleteCourse = () => {
        console.log("Deleting course:", course.id);
        ////////////////////////////////
        //bavly code deleting course
        DelCourse(course);
        // Go to my courses page
        router.replace("../../../");
         // Call the parent component's onDelete function with the course to delete
    };

    return (
        <View style={{ padding: 15, borderRadius: 15, backgroundColor: "white" }}>
            <Pressable
                style={{ width: 100, flexDirection: 'row', alignItems: "center" }}
                onPress={() => {
                    isediting = false;
                    console.log(isediting);
                    handleupdateCourse();
                    router.back()
                }}
            >
                <Ionicons name="checkmark-circle-outline" size={40} color={"black"} />
                <Text style={{}}>Done</Text>
            </Pressable>
            <View style={{ width: "100%" }}>
                <Image source={{uri:Course.img}} resizeMode='contain' style={{ width: "100%", height: Dimensions.get("screen").height * 0.3, borderRadius: 15 }} />
            </View>
            <Text style={{ fontSize: 24, marginTop: 10, fontWeight: "900", marginLeft: "3%" }}>Course Name</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCourseName}
                placeholderTextColor="gray"
                value={courseName}
            />
            <Text style={{ fontSize: 24, marginTop: 10, fontWeight: "900", marginLeft: "3%" }} >Course Level</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCourseLevel}
                placeholderTextColor="gray"
                value={courseLevel}
            />
            <Text style={{ fontSize: 25, marginTop: 10, fontWeight: "900", marginLeft: "3%" }}>Description</Text>
            <TextInput
                multiline
                style={[styles.input, { height: 100 }]}
                onChangeText={setCourseDec}
                value={courseDec}
            />
            {WD ? (
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, { backgroundColor: "red" }]} onPress={handleDeleteCourse}>
                        <MaterialIcons name="delete-forever" size={24} color="black" />
                        <Text>Delete</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={handleDeleteCourse}>
                        <MaterialIcons name="delete-forever" size={24} color="black" />
                        <Text>Delete</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: "900",
        marginLeft: "3%",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-around",
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: 10,
        fontWeight: "600",
        backgroundColor: "#6857E8",
        width: "45%",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default DetailSection;
