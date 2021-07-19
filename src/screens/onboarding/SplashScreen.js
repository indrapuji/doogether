import React, { useEffect } from "react";
import { StyleSheet, View, Image, useWindowDimensions, StatusBar } from "react-native";

const SplashScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Onboarding");
    }, 3000);
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.textPosition}>
        <Image source={require("../../assets/dootask_text.png")} />
      </View>
      <View style={styles.logoPosition}>
        <Image source={require("../../assets/logo_dootask.png")} style={{ width: width - 60.82, resizeMode: "contain" }} />
      </View>
    </View>
  );
};

export default SplashScreen;

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
