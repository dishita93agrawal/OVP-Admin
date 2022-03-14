import React from "react";
import {
  Text,
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Header, Icon, Badge } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import db from "../config";

import firebase from "firebase";
export default class UpdateProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      orgName: "",
      secretCode: "",
      docId: "",
    };
  }
  getUser = async () => {
    await db
      .collection("admins")
      .where("email", "==", this.state.email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          var user = doc.data();

          this.setState({
            orgName: doc.data().organizationName,
            secretCode: doc.data().secretCode,
            docId: doc.id,
          });
        });
      });
  };

  update = async () => {
    await db.collection("admins").doc(this.state.docId).update({
      organizationName: this.state.orgName,
    });
    alert("Updated successfully");
  };
  componentDidMount = () => {
    this.getUser();
  };
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: "#8CACE5" }}>
        <LinearGradient
          // Button Linear Gradient
          colors={["#8CACE5", "#9ADAE9"]}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            padding: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="person-circle"
            size={30}
            color="#fff"
            style={{ alignSelf: "center" }}
          />
          <Text style={{ marginTop: 5, color: "white" }}>
            {this.state.email}
          </Text>
        </LinearGradient>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              marginTop: 5,
              color: "white",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Organization Name
          </Text>
          <TextInput
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "white",
              alignSelf: "center",
              borderWidth: 2,
              borderColor: "white",
              width: "50%",
              padding: 10,
              margin: 10,
            }}
            onChangeText={(e) => {
              this.setState({
                orgName: e,
              });
            }}
            value={this.state.orgName}
          />

          <Text style={{ marginTop: 5, color: "white", alignSelf: "center" }}>
            Below is your secret Code. Please share it cautiously
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: "white",
              fontWeight: "bold",
              alignSelf: "center",
              borderWidth: 2,
              borderColor: "white",
              padding: 10,
              borderRadius: 10,
            }}
          >
            {this.state.secretCode}
          </Text>
          <TouchableOpacity
            style={{
              width: "50%",
              borderRadius: 10,
              padding: 15,
              marginTop: 70,
              alignSelf: "center",
              backgroundColor: "#9ADAE9",
            }}
            onPress={() => {
              this.update();
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
              }}
            >
              Update
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: "50%",
              borderRadius: 10,
              backgroundColor: "#9ADAE9",
              padding: 15,
              alignSelf: "center",
              marginTop: 20,
            }}
            onPress={() => {
              firebase.auth().signOut();
              this.props.navigation.navigate("Login");
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
