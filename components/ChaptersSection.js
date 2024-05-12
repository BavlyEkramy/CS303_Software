import React, { useLayoutEffect, useState } from "react";
import { View, Pressable } from "react-native";
import ChapterItem from "./ChapterItem";
import SectionItem from "./SectionItem";

export default function ChaptersSection({ chapterList }) {
  // const [chapter, setChapterList] = useState([]);

  // useLayoutEffect(() => {
  //   setChapterList(chapterList);
  // }, [chapterList]);
  return (
    chapterList && (
      <View>
        {chapterList.map((item, key) => {
          const [showSection, setShowSection] = useState(false);

          const handlePress = () => {
            setShowSection(!showSection);
          };

          return (
            <View key={key}>
              <Pressable onPress={handlePress}>
                {item.isCompleted ? (
                  <ChapterItem
                    number={key + 1}
                    name={item.name}
                    iconName={"checkmark-circle-outline"}
                    color={"rgba(11, 174, 27, 1)"}
                  />
                ) : item.isOpen ? (
                  <ChapterItem
                    number={key + 1}
                    name={item.name}
                    iconName={"play-circle"}
                    color={"#6857E8"}
                  />
                ) : (
                  <ChapterItem
                    number={key + 1}
                    name={item.name}
                    iconName={"lock-closed"}
                    color={"gray"}
                  />
                )}
              </Pressable>
              {showSection && item.isOpen && (
                <View style={{ alignItems: "center" }}>
                  <SectionItem
                    chapterList={chapterList[key + 1]}
                    sectionList={chapterList[key].videos}
                    completing={chapterList[key]}
                    end={key + 1 === chapterList.length}
                  />
                </View>
              )}
            </View>
          );
        })}
      </View>
    )
  );
}
