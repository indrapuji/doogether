import React, { useState, useEffect, useContext } from "react";
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
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GetLocation from "react-native-get-location";
import { AuthContext } from "../../components/Context";

const StartScreen = () => {
  const { width } = useWindowDimensions();
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const { signIn } = useContext(AuthContext);

  const [val, setVal] = useState({
    lat: "",
    long: "",
  });
  const [inputText, setInputText] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setVal({ ...val, lat: location.latitude, long: location.longitude });
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  const failLogin = () => {
    setFailed(true);
    setInputText("");
    setTimeout(() => {
      setFailed(false);
    }, 2000);
  };

  const loginHanddle = (username, password) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (username === "admin" && password === "admin") {
        const access_token = "ini token";
        signIn(access_token, val.lat, val.long);
      } else {
        failLogin();
      }
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" />
      <View style={styles.imageContainer}>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.title}>Hello Again!</Text>
          <Text style={styles.title}>Welcome back</Text>
        </View>
        {!hide && (
          <Image
            source={require("../../assets/home_vector.png")}
            style={{ width: width - 60.82, resizeMode: "contain" }}
          />
        )}
      </View>
      <View style={styles.buttonSection}>
        {failed && (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ color: "red" }}>Username atau Password Salah</Text>
          </View>
        )}
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
              onFocus={() => setHide(true)}
              onEndEditing={() => setHide(false)}
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
              secureTextEntry
              onChangeText={(text) => setInputText({ ...inputText, password: text })}
              value={inputText.password}
              onFocus={() => setHide(true)}
              onEndEditing={() => setHide(false)}
            />
          </View>
        </View>
        {loading ? (
          <View style={[styles.loginButton, { width: width - 48 }]}>
            <ActivityIndicator size="small" color="white" />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.loginButton, { width: width - 48 }]}
            onPress={() => loginHanddle(inputText.username, inputText.password)}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
    color: "#16948c",
  },
  imageContainer: {
    flex: 1,
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
