import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

import { Header, Icon, Badge } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          // Button Linear Gradient
          colors={["#8CACE5", "#9ADAE9"]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "black",
            }}
          >
            Forgot Password
          </Text>
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
              placeholder="Email ID"
              placeholderTextColor="grey"
              onChangeText={(val) => {
                this.setState({ email: val });
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#7864D0",
              width: "90%",
              borderRadius: 10,
              margin: 30,
              height: 40,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if (this.state.email !== "") {
                firebase
                  .auth()
                  .sendPasswordResetEmail(this.state.email)
                  .then(() => {
                    alert("Password reset Email sent");
                  })
                  .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                  });
              } else {
                alert("Enter Email first.");
              }
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>
              Send password reset link
            </Text>
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
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "black" }}>Back to login screen</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
