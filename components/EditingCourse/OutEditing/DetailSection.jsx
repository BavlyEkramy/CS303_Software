import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, Pressable } from 'react-native';
import OptionItem from './OptionItem';
import { Feather, Ionicons } from '@expo/vector-icons';
import CourseDetailsScreenInEditing from '../InEditing/CourseDetailsScreenInEditing';
import { useRouter } from 'expo-router';
const DetailSection = ({ course, isediting }) => {
    const Name = course.name;
    const dec = course.description;
    const router = useRouter();
    const [WD, setWD] = useState(true);
    let w = Dimensions.get("screen").width;
    useEffect(() => {
        if (Dimensions.get("screen").width >= 450) {
            setWD(true);
        }
        else {
            setWD(false);
        }
        console.log(w);
    }, [])

    return (

        <View style={{ padding: 15, borderRadius: 15, backgroundColor: "white" }}>
            
            {/* course image */}
            <View style={{ width: "100%" }}>
                <Image source={{uri:course.img}} resizeMode='contain'
                    style={{
                        width: "100%",
                        height: Dimensions.get("screen").height * 0.3,
                        // backgroundColor: "yellow",
                        borderRadius: 15
                    }} /></View>

            {/* course name */}
            <Text style={{
                fontSize: 30,
                marginTop: 10, fontWeight: "900", marginLeft: "3%"
            }}>{`${Name}`}</Text>

            {
                WD ? (
                    <View style={styles.coulemStyle}>
                        <OptionItem icon="book-outline" value={course.Nch + " chapter"} size={1.9} />
                        <OptionItem icon="cellular-outline" value={course.category} size={1.9} />
                    </View>
                ) : (
                    <View style={styles.coulemStyle1}>
                        <OptionItem icon="book-outline" value={course.Nch + " chapter"} size={1.9} />
                        <OptionItem icon="cellular-outline" value={course.category} size={1.9} />
                    </View>
                )}

            <Text style={{
                fontSize: 25,
                marginTop: 10, fontWeight: "600", marginLeft: "5%",

            }}>Description</Text>
            {/* Text of Description */}
            <Text style={{
                fontSize: 18,
                marginTop: 10,
                fontWeight: "300",
                marginLeft: "8%",
                flexWrap: "wrap",
                color: "gray",
                lineHeight: 30,
            }}>{`${dec}`}  </Text>

            {
                WD ? (

                    <View style={{ flexDirection: "row", width: "90%", justifyContent: "space-around", }} >
                        <Pressable style={[styles.button]}
                            onPress={() => {
                                isediting = true;
                                console.log(course);
                                console.log("000000000000000000000000000000");
                                router.push(`/EditCours/${course.id}`);
                                // router.setParams({course: course});
                            }}>
                            <Feather name="edit" size={24} color="black" />
                            <Text>Edit</Text>
                        </Pressable>
                    </View>
                ) : (
                    <View style={{ flexDirection: "column", width: "90%", justifyContent: "space-around", }} >

                        <Pressable onPress={() => {
                            isediting = true;
                            console.log(course);
                            console.log("000000000000000000000000000000");
                            router.push(`/EditCours/${course.id}`);
                            // router.setParams({course: course});
                        }}
                            style={[styles.button]}>
                            <Feather name="edit" size={24} color="black" />
                            <Text>Edit</Text>
                        </Pressable>
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    coulemStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        marginBottom: 10,
    },
    coulemStyle1: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        marginTop: 10,
        marginBottom: 10,
    },
    rowStyle: {
        justifyContent: "space-around",
        alignItems: "flex-start",
    },
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 13,
        marginTop: 10,
        fontWeight: "600",
        backgroundColor: "#6857E8",
        width: "50%",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default DetailSection;
