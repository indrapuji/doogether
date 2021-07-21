import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
  Image,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CardList from "../../components/CardList";
import axios from "axios";

const { width } = Dimensions.get("screen");

const PostScreen = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState({
    title: "",
    body: "",
    userId: 10,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users/10/posts",
    })
      .then(({ data }) => {
        setList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postAdd = () => {
    addPost();
    setModalVisible(!modalVisible);
  };

  const addPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(inputText),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setList([...list, json]);
        setInputText({
          title: "",
          body: "",
          userId: 10,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{ marginVertical: 10, position: "relative", width }}>
        <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 14, color: "#43568E" }}>
          Post
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", left: 18, width: 30, height: 30 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={16} color="#43568E" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 30,
          right: 15,
          alignSelf: "flex-end",
          zIndex: 1,
          width: 70,
          height: 70,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#949CDF",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus-circle" size={40} color="white" />
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ marginBottom: 5 }}>
              <Text>Add Post</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="rgba(0, 0, 0, 0.14)"
                autoCapitalize="none"
                onChangeText={(text) => setInputText({ ...inputText, title: text })}
                value={inputText.title}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="rgba(0, 0, 0, 0.14)"
                autoCapitalize="none"
                onChangeText={(text) => setInputText({ ...inputText, body: text })}
                value={inputText.body}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={[styles.button, styles.buttonAdd]} onPress={() => postAdd()}>
                <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {list && list.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={list}
            keyExtractor={(key, index) => index.toString()}
            renderItem={({ item, index }) => <CardList item={item} />}
            showsVerticalScrollIndicator={false}
            enableEmptySections={true}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Image source={require("../../assets/no_data.png")} style={{ width: 200, height: 200 }} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    width: 250,
    marginTop: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: "rgba(0, 0, 0, 0.24)",
    color: "#16948c",
    fontWeight: "400",
    fontSize: 12,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: 100,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: "red",
  },
  buttonAdd: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
