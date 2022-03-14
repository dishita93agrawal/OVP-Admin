import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Modal from "react-native-modal";
import firebase from "firebase";
import db from "../config";
import { Feather, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default class ActiveElectionDet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      totalVote: this.props.route.params.details["totalVotes"],
      postTitle: this.props.route.params.details["postTitle"],
      lastDate: this.props.route.params.details["lastDate"],
      nominees: [],
      roles: this.props.route.params.details["roles"],
      modalVisible: false,
      creteria: this.props.route.params.details["eligibility"],
      nomineeIdex: 0,
      nomineeModalVisible: false,
      docId: this.props.route.params.details["docId"],
    };
  }

  componentDidMount = async () => {
    await db
      .collection("elections")
      .doc(this.state.docId)
      .collection("nominees")
      .onSnapshot((snapshot) => {
        var dbnominees = [];

        snapshot.docs.map((doc) => {
          var nominee = doc.data();
          nominee["ndocId"] = doc.id;
          dbnominees.push(nominee);
        });
        this.setState({ nominees: dbnominees });
        console.log(this.state.nominees);
      });
  };
  markCompleted() {
    db.collection("elections").doc(this.state.docId).update({
      isActive: false,
    });
    alert("Election Marked completed");
    this.props.navigation.goBack();
  }
  render() {
    if (this.state.nominees.length !== 0) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/Details.png")}
            style={styles.image}
          >
            <View style={styles.heading}>
              <Feather
                name="arrow-left-circle"
                size={24}
                color="white"
                onPress={() => this.props.navigation.navigate("Home")}
              />
              <Text style={styles.headingTest}>Election details</Text>
            </View>
            <ScrollView>
              <View>
                <Modal
                  style={styles.modalView}
                  isVisible={this.state.modalVisible}
                  backdropOpacity={0.4}
                  onBackdropPress={() => this.setState({ modalVisible: false })}
                >
                  <View style={styles.modalMainView}>
                    <Text
                      style={{ textAlign: "center", margin: 5, padding: 5 }}
                    >
                      Nomination Creteria
                    </Text>
                    <Text
                      style={{ textAlign: "center", margin: 5, padding: 5 }}
                    >
                      {this.state.creteria}
                    </Text>
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: "#7864D0",
                        borderRadius: 10,
                        width: "50%",
                        alignSelf: "center",
                      }}
                      onPress={() => {
                        this.setState({
                          modalVisible: false,
                        });
                      }}
                    >
                      <Text style={{ color: "white", textAlign: "center" }}>
                        Ok
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
              <View>
                <Modal
                  style={styles.modalView}
                  isVisible={this.state.nomineeModalVisible}
                  backdropOpacity={0.4}
                  onBackdropPress={() =>
                    this.setState({ nomineeModalVisible: false })
                  }
                >
                  <View style={styles.modalMainView}>
                    <Text
                      style={{ textAlign: "center", margin: 5, padding: 5 }}
                    >
                      Nominee Details
                    </Text>
                    <Text
                      style={{ textAlign: "center", margin: 5, padding: 5 }}
                    >
                      {this.state.nominees[this.state.nomineeIdex].details}
                    </Text>
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: "#7864D0",
                        borderRadius: 10,
                        width: "50%",
                        alignSelf: "center",
                      }}
                      onPress={() => {
                        this.setState({
                          nomineeModalVisible: false,
                        });
                      }}
                    >
                      <Text style={{ color: "white", textAlign: "center" }}>
                        Ok
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 70,
                  justifyContent: "space-evenly",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Total Vote Count
                  </Text>
                  <ImageBackground
                    source={require("../assets/vote.jpg")}
                    style={{
                      width: 70,
                      height: 70,
                      margin: 5,
                      padding: 10,
                      borderRadius: 35,
                      overflow: "hidden",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#00000099",
                        width: 50,
                        height: 50,
                        borderRadius: 35,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                      }}
                    >
                      <Text style={styles.appTitleText}>
                        {this.state.totalVote}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "flex-end",
                    paddingBottom: 10,
                    marginVertical: 10,
                  }}
                >
                  {this.state.postTitle}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "space-evenly",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#000000aa",
                    borderRadius: 20,
                    padding: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Last Date: {this.state.lastDate}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "flex-end",
                    paddingBottom: 10,
                    marginVertical: 10,
                  }}
                >
                  Nomination Creteria
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#00000099",
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: -30,
                  }}
                  onPress={() => {
                    this.setState({ modalVisible: true });
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#ffffffaa",
                  width: "85%",
                  height: 100,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: "black",

                    fontSize: 14,
                  }}
                >
                  {this.state.roles}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: "black",
                  alignSelf: "center",
                  marginTop: 10,
                  fontSize: 14,
                }}
              >
                Nominees:
              </Text>
              <View style={{ marginBottom: 50 }}>
                {this.state.nominees.map((nominee, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      justifyContent: "space-evenly",
                      backgroundColor: "#ffffffaa",
                      width: "70%",
                      alignSelf: "center",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Ionicons
                      name="person-circle"
                      size={24}
                      color="#00000099"
                    />

                    <Text>{nominee.name}</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#00000099",
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        this.setState({
                          nomineeModalVisible: true,
                          nomineeIdex: index,
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      >
                        i
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#7864D0",
                  width: "50%",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 50,
                  padding: 10,
                  alignSelf: "center",
                }}
                onPress={() => {
                  this.markCompleted();
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Mark as Complete
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 35,
  },

  appTitleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  heading: {
    alignItems: "center",

    padding: 20,
    margin: 10,
    flexDirection: "row",
  },

  headingTest: {
    textAlign: "center",
    marginLeft: 50,
    color: "white",
    fontSize: 18,
  },
  modalView: {
    alignSelf: "center",
    borderColor: "#bbbb",
    width: "60%",
    height: "60%",
  },
  modalMainView: {
    backgroundColor: "#ffff",
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowColor: "#bbbb",
  },
});
