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

                            }}>
                            <View style={styles.onebox}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ fontSize: 27, color: "#6857E8" }} >0{key + 1}</Text>
                                    <Text style={{ fontSize: 21, color: "#6857E8" }}> {item.name} </Text>
                                </View>
                                <Ionicons name="play-circle" size={25} color={"#6857E8"} />
                            </View>

                        </Pressable>
                        {
                            showSection?(

                                <SectionSection
                                    chapterList={
                                        chapterList[key + 1]
                                    }
                                    sectionList={chapterList[key].videos}
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


