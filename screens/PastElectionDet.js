import React, { Component } from 'react';
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
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import db from '../config';

import Modal from 'react-native-modal';
import firebase from 'firebase';

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default class PastElectionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      totalVote: this.props.route.params.details['totalVotes'],
      postTitle: this.props.route.params.details['postTitle'],
      lastDate: this.props.route.params.details['lastDate'],
      nominees: [],
      roles: this.props.route.params.details['roles'],
      modalVisible: false,
      creteria: this.props.route.params.details['eligibility'],
      docId: this.props.route.params.details['docId'],
      nomineeIdex: 0,
      nomineeModalVisible: false,
    };
  }

  componentDidMount = async () => {

    await db
      .collection('elections')
      .doc(this.state.docId)
      .collection('nominees')
      .onSnapshot((snapshot) => {
        var dbnominees = [];

        snapshot.docs.map((doc) => {
          var nominee = doc.data();
          nominee['ndocId'] = doc.id;
          dbnominees.push(nominee);
        });

        dbnominees.sort(function(a, b){return b.votes-a.votes});
        this.setState({ nominees: dbnominees });
      });
  };

  render() {
    if (this.state.nominees.length !== 0) {
      return (
        <View style={styles.container}>
          <View style={styles.bg}>
            <View style={styles.heading}>
              <Feather
                name="arrow-left-circle"
                size={24}
                color="white"
                onPress={() => this.props.navigation.goBack()}
              />
              <Text style={styles.headingTest}>Past Election details</Text>
            </View>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  marginTop: 70,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  backgroundColor: '#92BFE7',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: -50,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    Total Vote Count
                  </Text>
                  <ImageBackground
                    source={require('../assets/vote.jpg')}
                    style={{
                      width: 70,
                      height: 70,
                      margin: 5,
                      padding: 10,
                      borderRadius: 35,
                      overflow: 'hidden',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#00000099',
                        width: 50,
                        height: 50,
                        borderRadius: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <Text style={styles.appTitleText}>
                        {this.state.totalVote}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
                <View>
                  <Modal
                    style={styles.modalView}
                    isVisible={this.state.modalVisible}
                    backdropOpacity={0.4}
                    onBackdropPress={() =>
                      this.setState({ modalVisible: false })
                    }>
                    <View style={styles.modalMainView}>
                      <Text
                        style={{ textAlign: 'center', margin: 5, padding: 5 }}>
                        Nomination Creteria
                      </Text>
                      <Text
                        style={{ textAlign: 'center', margin: 5, padding: 5 }}>
                        {this.state.creteria}
                      </Text>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          backgroundColor: '#F9B5B2',
                          borderRadius: 10,
                          width: '50%',
                          alignSelf: 'center',
                        }}
                        onPress={() => {
                          this.setState({
                            modalVisible: false,
                          });
                        }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>
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
                    }>
                    <View style={styles.modalMainView}>
                      <Text
                        style={{ textAlign: 'center', margin: 5, padding: 5 }}>
                        Nominee Details
                      </Text>
                      <Text
                        style={{ textAlign: 'center', margin: 5, padding: 5 }}>
                        {this.state.nominees[this.state.nomineeIdex].details}
                      </Text>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          backgroundColor: '#F9B5B2',
                          borderRadius: 10,
                          width: '50%',
                          alignSelf: 'center',
                        }}
                        onPress={() => {
                          this.setState({
                            nomineeModalVisible: false,
                          });
                        }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>
                          Ok
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>
                <View
                  style={{
                    marginTop: 50,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      alignSelf: 'center',
                    }}>
                    {this.state.postTitle}
                  </Text>
                </View>
                <ImageBackground
                  source={require('../assets/vote.jpg')}
                  style={{
                    backgroundColor: '#ffffffaa',
                    marginTop: 10,
                    borderRadius: 10,
                    margin: 10,
                    padding: 5,
                    overflow:"hidden"
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      alignSelf: 'flex-start',
                      marginTop: 10,
                      fontSize: 14,
                    }}>
                    Results:
                  </Text>
                  <View style={{ marginBottom: 10 }}>
                    {this.state.nominees.map((nominee, index) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          justifyContent: 'space-evenly',
                          backgroundColor:
                            index === 0 ? '#7864D0aa' : '#ffffffaa',
                          width: index === 0 ? '70%' : '60%',
                          alignSelf: 'center',
                          padding: 10,
                          borderRadius: 5,
                        }}>
                        <Text style={{ color: index == 0 ? 'white' : 'black' }}>
                          {nominee.name}
                        </Text>
                        <Text style={{ color: index == 0 ? 'white' : 'black' }}>
                          {nominee.votes}
                        </Text>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#00000099',
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => {
                            this.setState({
                              nomineeModalVisible: true,
                              nomineeIdex: index,
                            });
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: 14,
                            }}>
                            i
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </ImageBackground>
                 <Text
                    style={{
                      color: 'white',
                      alignSelf: 'flex-start',
                      marginTop: 10,
                      marginLeft:10,
                      fontSize: 14,
                    }}>
                    Election Details:
                  </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'space-evenly',
                  }}>
                  
                  <View
                    style={{
                      backgroundColor: '#000000aa',
                      borderRadius: 20,
                      padding: 10,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      Last Date: {this.state.lastDate}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      alignSelf: 'flex-end',
                      paddingBottom: 10,
                      marginVertical: 10,
                    }}>
                    Nomination Creteria
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#00000099',
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: -30,
                    }}
                    onPress={() => {
                      this.setState({ modalVisible: true });
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}>
                      i
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: '#ffffffaa',
                    width: '85%',
                    height: 100,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom:50
                  }}>
                  <Text
                    style={{
                      color: 'black',

                      fontSize: 14,
                    }}>
                    {this.state.roles}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
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
  bg: {
    flex: 1,
    backgroundColor: '#8CACE5',
  },
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 35,
  },

  appTitleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  heading: {
    alignItems: 'center',

    padding: 20,
    margin: 10,
    flexDirection: 'row',
  },

  headingTest: {
    textAlign: 'center',
    marginLeft: 50,
    color: 'white',
    fontSize: 18,
  },
  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '60%',
    height: '60%',
  },
  modalMainView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowColor: '#bbbb',
  },
});
