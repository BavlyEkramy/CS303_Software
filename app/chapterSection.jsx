import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, FlatListComponent, Pressable } from 'react-native';
import SectionSection from './sectionSection';
export default function ChapterSection({ chapterList }) {


    return chapterList && (
        <View>

            {chapterList.map((item, key) => {
                const [showSection, setShowSection] = useState(false);
                return (
                    <View key={key}>
                        <Pressable
                            onPress={() => {
                                setShowSection(!showSection);

                                if (item.isCompleted) {
                                    console.log(item.isCompleted)
                                }

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
                                item.isCompleted ?
                                    (
                                        <View style={{ ...styles.onebox, backgroundColor: "rgba(90, 232, 87, 0.11)", borderColor: "rgba(11, 174, 27, 1)", color: "rgba(11, 174, 27, 1)" }}>
                                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                <Text style={{ fontSize: 27, color: "rgba(11, 174, 27, 1)" }} >0{key + 1}</Text>
                                                <Text style={{ fontSize: 21, color: "rgba(11, 174, 27, 1)" }}> {item.name} </Text>
                                            </View>
                                            <Ionicons name="checkmark-circle-outline" size={25} color={"rgba(11, 174, 27, 1)"} />
                                        </View>
                                    )
                                    :
                                    (item.isOpen ?
                                        (
                                            <View style={ styles.onebox }>
                                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <Text style={{ fontSize: 27, color: "#6857E8" }} >0{key + 1}</Text>
                                                    <Text style={{ fontSize: 21, color: "#6857E8" }}> {item.name} </Text>
                                                </View>
                                                <Ionicons name="play-circle" size={25} color={"#6857E8"} />
                                            </View>
                                        )
                                        : (
                                            <View style={styles.onebox}>
                                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <Text style={{ fontSize: 27, color: "gray" }} >0{key + 1}</Text>
                                                    <Text style={{ fontSize: 21, color: "gray" }}> {item.name} </Text>
                                                </View>
                                                <Ionicons name="lock-closed" size={25} color={"gray"} />
                                            </View>
                                        )
                                    )
                            }

                        </Pressable>
                        {
                            showSection && item.isOpen ? (

                                <SectionSection
                                    chapterList={
                                        chapterList[key + 1]
                                    }
                                    sectionList={chapterList[key].video}
                                    completing={chapterList[key]}
                                    end={key + 1 == chapterList.length}
                                />
                            ) : null
                        }

                    </View>
                )
            })}

        </View>
    );
}

const styles = StyleSheet.create({
    onebox: {
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
        padding: 15,
        borderWidth: 1,

        margin: 8,
        borderRadius: 10,

        backgroundColor: "rgba(104, 87, 232, 0.11)",

        borderColor: "rgba(159, 159, 159, 1)"

    }






})


