import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import SectionSection from './sectionSection';
import { deleteChapter, updateChapter } from '../../../firebase/Courses';

export default function ChapterSection({ chapterList,coursid }) {
    const [expandedChapterIndex, setExpandedChapterIndex] = useState();
    const [ChapterList, setChapterList] = useState([]);
    const [chapterName, setChapterName] = useState("");
    const [editMode, setEditMode] = useState(); // Use false to denote no editing
    const [st, setst] = useState()
    
    const toggleChapter = (index) => {
        setExpandedChapterIndex(prevIndex => (prevIndex === index ? null : index));
    };
    useEffect(() => {
        setChapterList(chapterList);
        setEditMode(false)
        setst(false)
    }, [chapterList])

    const handleDeleteChapter = (index) => {
        const updatedChapterList = [...ChapterList];
        updatedChapterList.splice(index, 1);
        setChapterList(updatedChapterList);
    
/////////////////////////////////////////////////
/////bavly code Delete chapter
    // deleteChapter(coursid,chapterList.id)
    };

    const handleEditChapter = (index) => {
        setEditMode(index); // Set the index of the chapter being edited
        setChapterName(ChapterList[index].name);
    };

    const handleSaveChapter = (index) => {
        const updatedChapterList = [...ChapterList];
        updatedChapterList[index].name = chapterName;
        setChapterList(updatedChapterList);
        setEditMode(null); // Reset edit mode after saving

/////////////////////////////////////////////////////////////
///bavly code update chapter
        // updateChapter(coursid, chapterList)

console.log(ChapterList);

    };

    const handleAddChapter = () => {
        setChapterList([...ChapterList, { name: "New", isOpen: false, isCompleted: false, video: [] }]);
        console.log("Updated SectionList:", ChapterList);
    };

    return (
        <>
            {ChapterList.map((item, index) => (

                <View key={index}>
                    
                    <Pressable onPress={() => toggleChapter(index)}>
                        <View style={styles.onebox}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                {/* <Text style={{ fontSize: 27, color: "#6857E8" }}>0{index + 1}</Text> */}
                                {
                                    item.name === "" || item.video == [] ? (
                                        handleDeleteChapter(index)
                                    ) : null
                                }
                                {editMode === index&&st ? (
                                    <TextInput
                                        style={{ fontSize: 21, color: "#6857E8", borderRadius: 15, borderWidth: 2, width: "55%", paddingLeft: 10 }}
                                        value={chapterName}
                                        onChangeText={setChapterName}
                                        placeholder="name cours"
                                    />
                                ) : (
                                    <Text style={{ fontSize: 21, color: "#6857E8", width: "60%" }}>{item.name}</Text>
                                )}
                            </View>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Pressable style={[styles.button, { backgroundColor: "red" }]} onPress={() => {
                                    
                                    handleDeleteChapter(index)
                                }}>
                                    <MaterialIcons name="delete-forever" size={20} color="black" />
                                </Pressable>
                                {editMode === index && st ? (
                                    <Pressable style={[styles.button]} onPress={() =>
                                   { handleSaveChapter(index)
                                    setst(false)}
                                    }>
                                        <Feather name="save" size={20} color="black" />
                                        <Text>Save</Text>
                                    </Pressable>
                                ) : (
                                    <Pressable style={[styles.button]} onPress={() =>{ handleEditChapter(index)
                                            setExpandedChapterIndex(index)
                                            setst(true)
                                    }}>
                                        <Feather name="edit" size={20} color="black" />
                                        <Text>Edit</Text>
                                        
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    </Pressable>
                    {expandedChapterIndex === index && st? (
                        <SectionSection
                            ChapterList={item}
                            handleEditChapter={handleEditChapter}
                            indexperent={index}
                            st={st}
                        />
                    ):null}
                </View>
            ))}
            <Pressable style={[styles.onebox, { alignSelf: "center" }]}
                onPress={() => {
                    handleAddChapter()
                    setEditMode(ChapterList.length);
                }}>
                <Text>+Add Chapter</Text>
            </Pressable>
        </>
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
        width: "30%",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    }
});
