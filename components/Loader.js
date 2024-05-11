import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";

const Loader = ({ visible = false }) => {
  const { height, width } = useWindowDimensions();
  return (
    <>
      {visible && (
        <View style={[styles.container, { height, width }]}>
          <View style={styles.loader}>
            <ActivityIndicator size={"large"} color={"#6A5ACD"} />
            <Text style={styles.text}>Loading...</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  loader: {
    height: 70,
    backgroundColor: "white",
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    marginLeft: 10,
    color: "#6A5ACD",
    fontSize: 18,
  },
});
