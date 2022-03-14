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
import { AntDesign, Ionicons, Fontisto } from "@expo/vector-icons";
import db from "../config";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      adminName: "",
      email: firebase.auth().currentUser.email,
      activeElections: [],
      pastElections: [],
    };
  }

  getUserData = async () => {
    try {
      console.log(this.state.email);

      await db
        .collection("admins")
        .where("email", "==", this.state.email)
        .get()
        .then((snapshot) => {
          var organizationName = "";
          snapshot.docs.map((doc) => {
            organizationName = doc.data().organizationName;
            console.log(organizationName);
          });
          this.setState({ adminName: organizationName });
        });

      await db
        .collection("elections")
        .where("organizationId", "==", this.state.email)
        .onSnapshot((snapshot) => {
          var activeElections = [];
          var pastElections = [];
          snapshot.docs.map((doc) => {
            var election = doc.data();
            election["docId"] = doc.id;
            //
            if (doc.data().isActive) {
              activeElections.push(election);
            } else {
              pastElections.push(election);
            }
          });

          this.setState({
            activeElections: activeElections,
            pastElections: pastElections,
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount = () => {
    this.getUserData();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UpdateProfile")}
          >
            <Ionicons
              name="person-circle"
              size={24}
              color="#fff"
              style={{ alignSelf: "flex-end", marginRight: 10, marginTop: 15 }}
            />
          </TouchableOpacity>
          <Text style={styles.headingText}>Hi, {this.state.adminName}</Text>
        </View>
        <Image
          style={{
            width: "95%",
            height: 200,
            margin: 15,
            resizeMode: "center",
          }}
          source={require("../assets/homeLogo.png")}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>
              Active Elections
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ActiveElectionsList")
              }
            >
              <Text
                style={{
                  alignSelf: "flex-end",
                  fontSize: 14,
                  marginBottom: 6,
                  color: "#604547",
                  marginRight: 10,
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.activeElections}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  margin: 10,
                  alignSelf: "center",
                  justifyContent: "center",
                  width: 250,
                  borderRadius: 10,

                  margin: 3,
                  alignItems: "center",
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
                    justifyContent: "center",
                    borderRadius: 10,

                    alignItems: "center",
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
            horizontal={true}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>
              Past Elections!
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("PastElectionsList")
              }
            >
              <Text
                style={{
                  alignSelf: "flex-end",
                  fontSize: 14,
                  marginBottom: 6,
                  color: "#604547",
                  marginRight: 10,
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.pastElections}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  margin: 10,
                  alignSelf: "center",
                  justifyContent: "center",
                  width: 250,
                  borderRadius: 10,

                  margin: 3,
                  alignItems: "center",
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
                    justifyContent: "center",
                    borderRadius: 10,

                    alignItems: "center",
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
            horizontal={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("CreateElection");
          }}
          style={styles.fab}
        >
          <AntDesign name="plus" size={32} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    height: 60,
    padding: 10,
    backgroundColor: "#8CACE5",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginLeft: 20,
  },
  fab: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    top: 240,
    backgroundColor: "#8CACE5",
    borderRadius: 30,
    elevation: 8,
  },
});
