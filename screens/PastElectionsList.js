import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  Entypo,
  Ionicons,
  MaterialIcons,
  Feather,
  Fontisto,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import db from "../config";
import firebase from "firebase";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Header } from "react-native-elements";

export default class PastElectionsList extends React.Component {
  constructor() {
    super();
    this.state = {
      pastElections: [],
      emailId: firebase.auth().currentUser.email,
    };
  }
  getElections = async () => {
    await db
      .collection("elections")
      .where("organizationId", "==", this.state.emailId)
      .where("isActive", "==", false)
      .onSnapshot((snapshot) => {
        var elections = [];
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          var election = doc.data();
          election["docId"] = doc.id;

          elections.push(election);
        });

        this.setState({ pastElections: elections });
      });
  };

  componentDidMount = () => {
    this.getElections();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Feather
            name="arrow-left-circle"
            size={24}
            color="white"
            onPress={() => this.props.navigation.navigate("Home")}
          />
          <Text style={styles.headingText}>Past Elections</Text>
        </View>

        <FlatList
          data={this.state.pastElections}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("PastElectionDet", {
                  details: item,
                });
              }}
              style={{
                height: 100,
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#8CACE5", "#9ADAE9"]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flex: 1,
                  width: "100%",
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Fontisto name="person" size={22} color="white" />
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20,
                        marginLeft: 20,
                      }}
                    >
                      {item.postTitle}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      alignItems: "center",
                    }}
                  >
                    <Fontisto name="date" size={16} color="white" />
                    <Text
                      style={{ color: "#fff", fontSize: 16, marginLeft: 20 }}
                    >
                      {item.lastDate}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 16 }}>
                    Total Votes
                  </Text>
                  <ImageBackground
                    source={require("../votebg.jpg")}
                    style={{
                      borderRadius: 20,
                      width: 40,
                      height: 40,
                      backgroundColor: "white",
                      alignItems: "center",
                      overflow: "hidden",
                      justifyContent: "center",
                    }}
                    resizeMode="cover"
                  >
                    <Text style={{ color: "#000" }}>{item.totalVotes}</Text>
                  </ImageBackground>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    alignItems: "center",
  
    padding: 20,
    backgroundColor: "#8CACE5",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headingText: {
    color: "white",
    fontWeight: "bold",
  },
});
