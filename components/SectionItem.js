import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import VideoItem from "./VideoItem";

const SectionItem = ({ chapterList, sectionList, completing, end }) => {
  const handleSectionPress = (item1, key) => {
    if (item1.isOpen) {
      item1.isCompleted = true;
      if (!sectionList[sectionList.length - 1].isCompleted) {
        sectionList[key + 1].isOpen = true;
      } else if (end && sectionList[sectionList.length - 1].isCompleted) {
        completing.isCompleted = true;
      } else if (
        sectionList[sectionList.length - 1].isCompleted &&
        !chapterList.isOpen
      ) {
        if (!end) {
          chapterList.video[0].isOpen = true;
        }
        completing.isCompleted = true;
        chapterList.isOpen = true;
      }
    }
  };

  return (
    <View style={{ width: "90%" }}>
      {sectionList.map((item1, key) => {
        const [showSection, setShowSection] = useState(false);

        return (
          <View key={key}>
            <Pressable
              onPress={() => {
                setShowSection(!showSection);
                handleSectionPress(item1, key);
              }}
            >
              {item1.isCompleted ? (
                <VideoItem
                  pathname={item1.name}
                  linked={item1.link}
                  name={item1.name}
                  number={key + 1}
                  color={"rgba(11, 174, 27, 1)"}
                  iconName={"checkmark-circle-outline"}
                  option={false}
                />
              ) : item1.isOpen ? (
                <VideoItem
                  pathname={item1.name}
                  linked={item1.link}
                  name={item1.name}
                  number={key + 1}
                  color={"#6857E8"}
                  iconName={"play-circle"}
                  option={false}
                  completed={item1.isCompleted}
                />
              ) : (
                <VideoItem
                  pathname={item1.name}
                  linked={item1.link}
                  name={item1.name}
                  number={key + 1}
                  color={"gray"}
                  iconName={"lock-closed"}
                  option={true}
                />
              )}
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default SectionItem;

const styles = StyleSheet.create({});
