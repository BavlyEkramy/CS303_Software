import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'
import DetailSection from './Details';
import ChapterSection from './chapterSection';
import { GetCourseById, getChapters } from "../firebase/Courses";
const CourseDetailsScreenInShow = ({ courseId, isediting }) => {
    const router = useRouter();

    const [course, setCourse] = useState({});
    const [chapterList, setChapterList] = useState([]);

    const IsCart = async () => {
        try {
            // const u = await GetCourseById(courseId);
            console.log("befor git course")
            const u = await GetCourseById("Tb9NSspgF6MqluaI2mEc");
            setCourse(u);
            const t = await getChapters("Tb9NSspgF6MqluaI2mEc");
            setChapterList(t);
            console.log("1212   31313", u)
            console.log("12131313", course)
            console.log("00000  00000000000000000000", t)
            console.log("55555 55555", chapterList)
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        IsCart();
    }, []);

    return (
        <ScrollView >
            <SafeAreaView style={{ marginTop: 15, flex: 1, paddingBottom: "10%" }}>
                <Pressable
                    style={{ width: 100, flexDirection: 'row', alignItems: "center" }}
                    onPress={() => {
                        router.back();
                    }}
                ><Ionicons name="arrow-back-circle-outline" size={40} color={"black"} />
                    <Text style={{}}>back</Text>
                </Pressable>
                <DetailSection course={course} isediting={chapterList} />
                <ChapterSection chapterList={chapterList} />
            </SafeAreaView>
        </ScrollView >

    );
}

const styles = StyleSheet.create({})

export default CourseDetailsScreenInShow;
