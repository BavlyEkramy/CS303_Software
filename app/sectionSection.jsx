import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
export default function SectionSection({ chapterList, sectionList, completing, end }) {
    const router = useRouter();
    return (
        <View style={{ marginLeft: "2.5%", width: "90%",alignSelf:"center" }}>

            <Pressable>
                {sectionList.map((item1, key) => {
                    const [showSection, setShowSection] = useState(false);

                    return (
                        <View key={key} >
                            <Pressable
                                onPress={() => {
                                    setShowSection(!showSection);
                                    // setEnroll(!enroll);
                                    console.log(...sectionList)

                                    if (item1.isOpen) {
                                        item1.isCompleted = true
                                        if (!sectionList[sectionList.length - 1].isCompleted) {


                                            sectionList[key + 1].isOpen = true
                                        }
                                        else if (end && sectionList[sectionList.length - 1].isCompleted) {
                                            completing.isCompleted = true
                                        }
                                        else if (sectionList[sectionList.length - 1].isCompleted && !chapterList.isOpen) {
                                            if (end) {
                                                console.log("333333333333333333333333333333333333333333333333")
                                            }
                                            else {
                                                console.log("000000000000000000000000");
                                                chapterList.video[0].isOpen = true
                                            }

                                            completing.isCompleted = true
                                            console.log("22222222222222222222222222");
                                            chapterList.isOpen = true

                                        }

                                    }

                                }}>
                                {
                                    item1.isCompleted ?
                                        (<Link href={{ pathname: `./${item1.name}`, params: { linked: `${item1.link}` } }}  >
                                            <View style={{ ...styles.onebox, backgroundColor: "rgba(90, 232, 87, 0.11)", borderColor: "rgba(11, 174, 27, 1)", color: "rgba(11, 174, 27, 1)" }}>
                                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <Text style={{ fontSize: 27, color: "rgba(11, 174, 27, 1)" }} >0{key + 1}</Text>
                                                    <Text style={{ fontSize: 21, color: "rgba(11, 174, 27, 1)" }}> {item1.name} </Text>

                                                </View>
                                                <Ionicons name="checkmark-circle-outline" size={25} color={"rgba(11, 174, 27, 1)"} />
                                            </View>
                                        </Link>
                                        )
                                        :
                                        (item1.isOpen ?
                                            (
                                                <Link
                                                    onPress={() => router.push(`./${item1.name}`)} href={{ pathname: `./${item1.name}` ,params:{ linked: `${item1.link}` } }}  >
                                                    <View style={{ ...styles.onebox }}>
                                                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <Text style={{ fontSize: 27, color: "#6857E8" }} >0{key + 1}</Text>
                                                            <Text style={{ fontSize: 21, color: "#6857E8" }}> {item1.name} </Text>
                                                        </View>
                                                        <Ionicons name="play-circle" size={25} color={"#6857E8"} />
                                                    </View>
                                                </Link>
                                            )
                                            : (
                                                <View style={styles.onebox}>
                                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                        <Text style={{ fontSize: 27, color: "gray" }} >0{key + 1}</Text>
                                                        <Text style={{ fontSize: 21, color: "gray" }}> {item1.name} </Text>
                                                    </View>
                                                    <Ionicons name="lock-closed" size={25} color={"gray"} />
                                                </View>

                                            )
                                        )
                                }
                            </Pressable>
                        </View>
                    )
                })}
            </Pressable >
        </View >
    );
}

const styles = StyleSheet.create({
    onebox: {
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
        marginTop: -8,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: "rgba(104, 87, 232, 0.11)",
        borderWidth: 1,
        borderColor: "rgba(159, 159, 159, 1)"
    }

})


