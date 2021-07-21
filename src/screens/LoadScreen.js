import React from "react";
import { StyleSheet, View, Image, StatusBar, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.textPosition}>
        <Image source={require("../assets/dootask_text.png")} />
      </View>
      <View style={styles.logoPosition}>
        <ActivityIndicator size="large" color="black" />
      </View>
    </View>
  );
};

export default LoadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    position: "relative",
  },
  textPosition: {
    position: "absolute",
    top: 100,
  },
  logoPosition: {
    flex: 1,
    justifyContent: "center",
  },
});
