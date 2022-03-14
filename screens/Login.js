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
  KeyboardAvoidingView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import db from "../config";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        db.collection("admins")
          .where("email", "==", this.state.email)
          .get()
          .then((snapshot) => {
            if (snapshot.docs.length !== 0) {
              this.props.navigation.navigate("Home");
              alert("Login Successful");
            } else {
              alert(
                "This app is for admins only, If an admin, make sure to register first"
              );
            }
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Soemthing went wrong! " + errorMessage);
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
            source={require("../assets/loginbg.png")}
            style={styles.image}
          >
            <SafeAreaView style={styles.droidSafeArea} />
            <View
              style={{
                width: "85%",
                padding: 10,
                alignSelf: "center",
              }}
            >
              <Image
                style={{
                  width: "80%",
                  height: 150,
                  alignSelf: "center",
                }}
                source={require("../assets/vote4.png")}
              />
              <Text style={styles.appTitleText}>{"Welcome Back..!"}</Text>

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
                  onChangeText={(email) => {
                    this.setState({ email });
                  }}
                  placeholder="Email ID"
                  placeholderTextColor="grey"
                  value={this.state.email}
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
                  onChangeText={(password) => {
                    this.setState({ password });
                  }}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="grey"
                  value={this.state.password}
                />
              </View>

              <Text
                style={{
                  marginTop: 10,
                  color: "black",
                  fontWeight: "bold",
                  alignSelf: "flex-end",
                  marginHorizontal: "5%",
                }}
                onPress={() => {
                  this.props.navigation.navigate("ForgotPassword");
                }}
              >
                Forgot Password?
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: "#7864D0",
                  width: "70%",
                  height: 40,
                  marginTop: 10,
                  borderRadius: 10,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.login();
                }}
              >
                <Text style={{ color: "white" }}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: "95%",
                  height: 40,
                  marginTop: 20,
                  borderRadius: 10,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.props.navigation.navigate("SignUp");
                }}
              >
                <Text style={{ color: "black" }}>
                  Not a user? Register here
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
