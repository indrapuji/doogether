import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../components/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import axios from "axios";
import Temperature from "../../components/Temperature";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { signOut } = useContext(AuthContext);
  const [Lat, setLat] = useState(null);
  const [Long, setLong] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [locality, setLocality] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userLat = await AsyncStorage.getItem("userLat");
      const userLong = await AsyncStorage.getItem("userLong");
      if (userLat !== null && userLong !== null) {
        setLat(userLat);
        setLong(userLong);
        getLocation(userLat, userLong);
        setShow(true);
      } else {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
          .then((location) => {
            setLat(location.latitude);
            setLong(location.longitude);
            getLocation(location.latitude, location.longitude);
            setShow(true);
          })
          .catch((error) => {
            const { code, message } = error;
            console.warn(code, message);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const newDate = () => {
    let ts = new Date();
    let day = ts.toDateString().substr(0, 3);
    const now = ts.toDateString().substr(8, 2);
    const month = ts.toDateString().substr(4, 3);
    const dateNow = `${day}, ${now} ${month}`;
    return dateNow;
  };

  const getLocation = (newLat, newLong) => {
    axios({
      method: "get",
      url: `https://api.bigdatacloud.net/data/reverse-geocode-with-timezone?latitude=${newLat}&longitude=${newLong}&localityLanguage=en&key=9dc9ab83afa649c8bdafc396c94c581f`,
    })
      .then(({ data }) => {
        setCountryName(data.countryName);
        setLocality(data.localityInfo.administrative[1].isoName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTodo = () => {
    navigation.navigate("Todo");
  };
  const handlePost = () => {
    navigation.navigate("Post");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" />
        {show && (
          <View>
            <View style={styles.topSection}>
              <View>
                <Text style={styles.title}>{locality},</Text>
                <Text style={styles.title}>{countryName}</Text>
                <Text style={styles.subtitle}>{newDate()}</Text>
              </View>
              <View style={styles.topMargin}>
                <Temperature longlat={{ latitude: Lat, longitude: Long }} />
              </View>
              <View style={styles.topMargin}>
                <TouchableOpacity
                  style={[styles.selectSection, { width: width - 40 }]}
                  onPress={handleTodo}
                >
                  <Text style={[styles.title, { color: "white" }]}>Todo</Text>
                  <Icon name="chevron-right" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.selectSection, { width: width - 40 }]}
                  onPress={handlePost}
                >
                  <Text style={[styles.title, { color: "white" }]}>Post</Text>
                  <Icon name="chevron-right" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={[styles.loginButton, { width: width - 40 }]}
                onPress={() => signOut()}
              >
                <Text style={styles.loginText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topSection: {
    marginHorizontal: 20,
    // marginTop: 50,
  },
  title: {
    fontWeight: "700",
    fontSize: 30,
  },
  subtitle: {
    fontWeight: "400",
    fontSize: 15,
  },
  topMargin: {
    marginTop: 20,
  },
  selectSection: {
    height: 200 / 2,
    backgroundColor: "#16948c",
    borderRadius: 20,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  bottomSection: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  loginButton: {
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#949CDF",
    marginBottom: 12,
  },
  loginText: {
    fontWeight: "500",
    fontSize: 12,
    color: "#FFFFFF",
  },
});
