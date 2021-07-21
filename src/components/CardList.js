import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from "react-native";
import { useDispatch } from "react-redux";
import { delTodo } from "../store/actions/delAction";

const CardList = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const DelOldTodo = (oldTodo) => {
    dispatch(delTodo(oldTodo));
  };

  const todoDelete = (old) => {
    DelOldTodo(old);
    setModalVisible(!modalVisible);
  };

  const showModal = (user) => {
    if (!user) {
      setModalVisible(true);
    }
  };

  return (
    <View>
      <TouchableOpacity style={{ borderRadius: 10 }} onPress={() => showModal(item.userId)}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  {item.userId ? "Delete Post" : "Delete Todo"}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonAdd]}
                  onPress={() => todoDelete(item.title)}
                >
                  <Text style={styles.textStyle}>Yes</Text>
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
        <View style={styles.cardContainer}>
          <View style={styles.contentPosition}>
            <View style={styles.centerJustify}>
              <Text style={styles.boldText}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardList;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderLeftWidth: 10,
    borderWidth: 1,
    borderColor: "#16948c",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 3,
    width: width - 25,
  },
  contentPosition: {
    marginHorizontal: 15,
    flexDirection: "row",
    marginVertical: 10,
  },
  centerJustify: {
    justifyContent: "center",
  },
  boldText: {
    fontWeight: "bold",
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
