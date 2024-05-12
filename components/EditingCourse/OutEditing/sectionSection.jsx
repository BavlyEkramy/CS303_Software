import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
export default function SectionSection({ chapterList, sectionList, completing, end }) {
    const router = useRouter();
    return (
        <View style={{ marginLeft: "2.5%", width: "90%", alignSelf: "center" }}>

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
                                }
                                }

                            >
                                <Link
                                style={{ ...styles.onebox }}
                                    onPress={() => router.push(`./../../${item1.name}`)} 
                                    href={{ pathname: `../../../${item1.name}`, params: { linked: `${item1.link}` } }}  >
                                    <View >
                                            <Text style={{ fontSize: 21, color: "#6857E8" }}> {item1.name} </Text>
                                      
                                        
                                    </View>
                                    <Ionicons name="play-circle" size={25} color={"#6857E8"} />
                                </Link>

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


