import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const StartScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [hide, setHide] = useState(false);
  const [inputText, setInputText] = useState({
    username: "",
    password: "",
  });

  const focusInput = () => {
    setHide(true);
  };
  const endInput = () => {
    setHide(false);
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} />
      <View style={styles.imageContainer}>
        {!hide && (
          <View style={{ marginTop: 50 }}>
            <Text style={styles.title}>Hello Again!</Text>
            <Text style={styles.title}>Welcome back</Text>
          </View>
        )}
        <Image source={require("../../assets/home_vector.png")} style={{ width: width - 60.82, resizeMode: "contain" }} />
      </View>
      <View style={styles.buttonSection}>
        <View style={styles.inputMargin}>
          <View style={styles.inputMargin}>
            <View style={styles.iconPosition}>
              <Icon name="user" size={25} color="#16948c" />
            </View>
            <TextInput
              style={[styles.input, { width: width - 48 }]}
              placeholder="Username"
              placeholderTextColor="rgba(0, 0, 0, 0.14)"
              autoCapitalize="none"
              onChangeText={(text) => setInputText({ ...inputText, username: text })}
              value={inputText.username}
              onFocus={() => focusInput()}
              onEndEditing={() => endInput()}
            />
          </View>
          <View style={{ position: "relative" }}>
            <View style={styles.iconPosition}>
              <Icon name="lock" size={25} color="#16948c" />
            </View>
            <TextInput
              style={[styles.input, { width: width - 48 }]}
              placeholder="Password"
              placeholderTextColor="rgba(0, 0, 0, 0.14)"
              autoCapitalize="none"
              onChangeText={(text) => setInputText({ ...inputText, password: text })}
              value={inputText.password}
              onFocus={() => focusInput()}
              onEndEditing={() => endInput()}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <View style={[styles.loginButton, { width: width - 48 }]}>
            <Text style={styles.loginText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
    color: "#16948c",
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  iconPosition: {
    position: "absolute",
    top: 8,
    left: 15,
  },
  buttonSection: {
    flex: 0.3,
    justifyContent: "flex-end",
    marginBottom: 50,
    alignItems: "center",
  },
  input: {
    height: 40,
    marginTop: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 50,
    borderColor: "rgba(0, 0, 0, 0.24)",
    color: "#16948c",
    fontWeight: "400",
    fontSize: 12,
  },
  inputMargin: {
    marginBottom: 10,
  },
  loginButton: {
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#16948c",
    marginBottom: 12,
  },
  loginText: {
    fontWeight: "500",
    fontSize: 12,
    color: "#FFFFFF",
  },
});
