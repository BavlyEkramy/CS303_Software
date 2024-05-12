import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';

export default function SectionSection({ ChapterList, handleEditChapter, indexperent, st }) {

    const [expandedChapterIndex, setExpandedChapterIndex] = useState(-1);
    const [SectionList, setSectionList] = useState(ChapterList.videos);
    const [editModeIndex, setEditModeIndex] = useState(-1);
    const [newSectionName, setNewSectionName] = useState("");
    const [newSectionLink, setNewSectionLink] = useState("");


    useEffect(() => {
        console.log("SectionList:", SectionList);
        if (!st) {
            expandedChapterIndex(false)
            setNewSectionName("");
            setNewSectionL("");
        }

    }, [ChapterList])

    const toggleChapter = (index) => {

        setExpandedChapterIndex((prevIndex) => index);
    };

    const handleDeleteSection = (index) => {
        const updatedSectionList = [...SectionList];
        updatedSectionList.splice(index, 1);
        setSectionList(updatedSectionList);
        ChapterList.videos = SectionList;
    };

    const handleEditSection = (index) => {
        setEditModeIndex(index);
        setNewSectionName();
        setNewSectionLink(SectionList[index].link);
        ChapterList.videos = SectionList;
        handleEditChapter(indexperent)
    };

    const handleSaveSection = (index, { name, link }) => {

        const updatedSectionList = [...SectionList];
        console.log("Saving edited section:", updatedSectionList);
        console.log("Saving edited section:", updatedSectionList[index]);
        updatedSectionList[index].name = name;
        updatedSectionList[index].link = link;
        setSectionList(updatedSectionList);
        setEditModeIndex(-1);
        ChapterList.videos = SectionList;
        //////////////////////////////////
        /////bavly code update chapter



    };

    const fillData = (index) => {
        setNewSectionName(SectionList[index].name);
        setNewSectionLink(SectionList[index].link);
    }


    const handleAddSection = () => {
        console.log("Adding a new section...");
        const newSection = {
            name: newSectionName,
            isOpen: false,
            isCompleted: false,
            link: newSectionLink // Include the link in the new section object
        };
        console.log("New section:", newSection);
        setSectionList([...SectionList, newSection]);
        console.log("Updated SectionList:", SectionList);
        // Clear the input field after adding the section
        setNewSectionName("");
        setNewSectionLink("");
        ChapterList.videos = SectionList;
        console.log("SectionList:", SectionList);

    };

    return (
        <View style={{ marginLeft: "2.5%", width: "90%", alignSelf: "center" }}>
            {SectionList.map((item, index) => (



                <View key={index}>
                    <Pressable onPress={() => {
                        toggleChapter(index)
                        handleEditSection(index);

                    }}>
                        <View style={styles.onebox}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                {item.name || item.link ? null : (
                                    <Pressable onPress={() => handleDeleteSection(index)}>
                                        <MaterialIcons name="delete-forever" size={15} color="black" />
                                    </Pressable>
                                )}
                                {expandedChapterIndex == index && st ? (
                                    <View style={{ display: "flex", flexDirection: "column", gap: 5, width: "75%" }}>
                                        <TextInput
                                            style={{ fontSize: 21, color: "#6857E8", borderRadius: 15, borderWidth: 2, width: "120%", paddingLeft: 10 }}
                                            value={newSectionName}
                                            onChangeText={(text) => {

                                                setNewSectionName(text)
                                                handleSaveSection(index, { name: text, link: newSectionLink });
                                            }}
                                            placeholder={newSectionName}
                                        />
                                        <TextInput
                                            style={{ fontSize: 21, color: "#6857E8", borderRadius: 15, borderWidth: 2, width: "120%", paddingLeft: 10 }}
                                            value={newSectionLink}
                                            onChangeText={(text) => {
                                                setNewSectionLink(text)
                                                handleSaveSection(index, { name: newSectionName, link: text });
                                            }}
                                            placeholder={newSectionLink}
                                        // Optional placeholder text
                                        />
                                    </View>
                                ) : (
                                    <Text style={{ fontSize: 21, color: "#6857E8", width: "75%" }}> {item.name} </Text>
                                    
                                )}
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 10 }}>
                                {st ? (
                                    <Pressable style={[styles.button, { backgroundColor: "red" }]} onPress={() => handleDeleteSection(index)}>
                                        <MaterialIcons name="delete-forever" size={15} color="black" />
                                        <Text>Delete</Text>
                                    </Pressable>
                                ) : null}
                            </View>

                        </View>
                    </Pressable>
                </View>
            ))}
            <Pressable style={[styles.onebox, { alignItems: 'center', justifyContent: "center", height: 25 }]}
                onPress={() => {
                    handleAddSection()
                    setEditModeIndex(SectionList.length);
                }}>
                <Text>+ Add Section</Text>
            </Pressable>
        </View>
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
        width: "40%",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    }
});
