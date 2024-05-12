import React from "react";
import { View, FlatList, Text } from "react-native";
import CourseItem from "./CourseItem";

const BasicList = ({ courses }) => {
  return (
    <View>
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <CourseItem {...item} adminName={item.admin.name} />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<CourseItem />}
      />
    </View>
  );
};

export default BasicList;
