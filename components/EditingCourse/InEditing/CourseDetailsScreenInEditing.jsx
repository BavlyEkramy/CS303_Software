import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'
import DetailSection from './DetailSection';
import ChapterSection from './chapterSection';
import { Route } from 'expo-router/build/Route';

import { GetCourseById, getChapters } from "../../../firebase/Courses";



const CourseDetailsScreenInShow = ({ courseid, isediting }) => {
    const router = useRouter();
    // git detalis of course by id
    const [course, setCourse] = useState({});
    const [chapterList, setChapterList] = useState([]);
    const IsCart = async () => {
        try {
            // const u = await GetCourseById(courseId);
            const u = await GetCourseById("Tb9NSspgF6MqluaI2mEc");
            setCourse(u);
            const t = await getChapters("Tb9NSspgF6MqluaI2mEc");
            setChapterList(t);
            console.log("121231  313", u)
            console.log("121231313", course)
            console.log("0000000000000000000000000", t)
            console.log("5555555555", chapterList)
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        IsCart();
    }, []);

    return (
        <ScrollView
            style={{
                marginTop: 15, flex: 1, paddingBottom: "10%"
            }}>
            <DetailSection course={course} isediting={isediting} />


            <ChapterSection chapterList={chapterList}  courseid={course.id} />


        </ScrollView >

    );
}

const styles = StyleSheet.create({})

export default CourseDetailsScreenInShow;
