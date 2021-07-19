import React from "react";
import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={[styles.image, { width: width - 60.82, resizeMode: "contain" }]} />
      <View style={{ flex: 0.2 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { width: width - 48, backgroundColor: item.button ? "#16948c" : null }]}
        onPress={() => navigation.navigate("Start")}
      >
        <Text style={styles.text}>Lanjutkan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    marginTop: 50,
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
    color: "#16948c",
    textAlign: "center",
  },
  description: {
    fontWeight: "400",
    fontSize: 13.52,
    color: "#16948c",
    textAlign: "center",
    paddingHorizontal: 30.42,
    paddingTop: 12.39,
  },
  button: {
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 12,
  },
  text: {
    fontWeight: "500",
    fontSize: 12,
    color: "white",
  },
});
