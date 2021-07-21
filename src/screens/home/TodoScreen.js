import React, { useEffect, useState } from "react";
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
} from "react-native";
import CardList from "../../components/CardList";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../../store/actions/addAction";

const { width } = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState({
    title: "",
    body: "",
  });

  const list = useSelector((state) => state.todo);

  const AddNewTodo = (newTodo) => {
    dispatch(addTodo(newTodo));
  };

  const todoAdd = () => {
    AddNewTodo(inputText);
    setModalVisible(!modalVisible);
    setInputText("");
  };

  useEffect(() => {
    if (list !== null && list !== undefined) {
      if (searchQuery !== null) {
        const newList = list.filter((x) => x.title.toLowerCase().search(searchQuery) !== -1);
        setFiltered(newList);
      } else {
        setFiltered(list);
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    setFiltered(list);
  }, [list]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{ marginTop: 20, position: "relative", width }}>
        <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 14, color: "#43568E" }}>
          Todo's
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", left: 18 }}
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
        <Icon name="pencil" size={40} color="white" />
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ marginBottom: 5 }}>
              <Text>Add Todo</Text>
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
              <TouchableOpacity style={[styles.button, styles.buttonAdd]} onPress={() => todoAdd()}>
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
      <View>
        <View style={styles.contentContainer}>
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Find Todo's"
              onChangeText={(query) => setSearchQuery(query)}
              value={searchQuery}
              autoCapitalize="none"
              style={styles.searchBox}
            />
            <Icon name="search" size={20} color="black" style={styles.iconSearch} />
          </View>
        </View>
        {filtered && filtered.length > 0 ? (
          <View style={styles.itemContainer}>
            <FlatList
              data={filtered}
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
            <Image
              source={require("../../assets/no_data.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingVertical: 10,
    marginLeft: 10,
    marginRight: 10,
    zIndex: 0,
  },
  searchBox: {
    borderRadius: 10,
    height: 50,
    width: width - 25,
    paddingLeft: 50,
    paddingRight: 100,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e3fdfd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  iconSearch: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 2,
  },
  addButton: {
    width: 100,
    height: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  itemContainer: {
    flex: 1,
    paddingHorizontal: 10,
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

export default HomeScreen;
