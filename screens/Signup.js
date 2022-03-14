import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      organizationName: "",

      password: "",
      confirmPassword: "",
    };
  }

  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };
  signUp = () => {
    var secretCode = this.createUniqueId();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        alert("User Created!");
        db.collection("admins").add({
          email: this.state.email,
          organizationName: this.state.organizationName,
          secretCode: secretCode,
        });
        alert("Successful");

        this.props.navigation.replace("Home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        //..
        console.log(error);
        alert(errorMessage);
      });
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "IOS" ? padding : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/signUpbg.png")}
            style={styles.image}
          >
            <SafeAreaView style={styles.droidSafeArea} />
            <View
              style={{
                width: "85%",
                margin: 5,
                padding: 10,
              }}
            >
              <Text style={styles.appTitleText}>{`Get Started..!`}</Text>

              <View
                style={{
                  flexDirection: "row",
                  width: "95%",
                  alignSelf: "center",
                  marginTop: 20,
                }}
              >
                <Feather name="at-sign" size={24} color="grey" />

                <TextInput
                  style={{
                    width: "95%",
                    height: 30,
                    borderBottomWidth: 1,
                    paddingLeft: 10,
                    borderBottomColor: "grey",
                  }}
                  placeholder="Email ID"
                  placeholderTextColor="grey"
                  onChangeText={(val) => {
                    this.setState({ email: val });
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "95%",
                  alignSelf: "center",
                  marginTop: 20,
                }}
              >
                <Feather name="user" size={24} color="grey" />

                <TextInput
                  style={{
                    width: "95%",
                    height: 30,
                    borderBottomWidth: 1,
                    paddingLeft: 10,
                    borderBottomColor: "grey",
                  }}
                  placeholder="Organization Name"
                  placeholderTextColor="grey"
                  onChangeText={(val) => {
                    this.setState({ organizationName: val });
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "95%",
                  alignSelf: "center",
                  marginTop: 20,
                }}
              >
                <AntDesign name="lock1" size={24} color="grey" />

                <TextInput
                  style={{
                    width: "85%",
                    height: 30,
                    borderBottomWidth: 1,
                    paddingLeft: 10,
                    borderBottomColor: "grey",
                  }}
                  placeholderTextColor="grey"
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={(val) => {
                    this.setState({ password: val });
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "95%",
                  alignSelf: "center",
                  marginTop: 20,
                }}
              >
                <AntDesign name="lock1" size={24} color="grey" />

                <TextInput
                  style={{
                    width: "85%",
                    height: 30,
                    borderBottomWidth: 1,
                    paddingLeft: 10,
                    borderBottomColor: "grey",
                  }}
                  placeholderTextColor="grey"
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                  onChangeText={(val) => {
                    this.setState({ confirmPassword: val });
                  }}
                />
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#7864D0",
                  width: "70%",
                  height: 40,
                  marginTop: 20,
                  borderRadius: 10,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.signUp();
                }}
              >
                <Text style={{ color: "white" }}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "95%",
                  height: 40,
                  marginTop: 10,
                  borderRadius: 10,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                <Text style={{ color: "black" }}>
                  Already a user? Login here
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 35,
  },

  appTitleText: {
    color: "black",
    fontSize: 24,
  },
});
