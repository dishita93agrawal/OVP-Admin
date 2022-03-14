import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  FontAwesome5,
  FontAwesome,
  Entypo,
  Ionicons,
  MaterialIcons,
  Feather,
  Fontisto,
} from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

import Modal from 'react-native-modal';
export default class CreateElections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      lastDate: '',
      eligibility: '',
      roles: '',
      nominees: [],
      modalVisible: false,
      name: '',
      details: '',
      emailId: firebase.auth().currentUser.email,
      secretCode: '',
    };
  }
  getUserDetails() {
    db.collection('admins')
      .where('email', '==', this.state.emailId)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({ secretCode: doc.data().secretCode });
        });
      });
  }
  componentDidMount() {
    this.getUserDetails();
  }

  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };
  addDetails = async () => {
    var uniqueId = this.createUniqueId();

    if (
      this.state.name.postTitle !== 0 &&
      this.state.lastDate.length !== 0 &&
      this.state.eligibility.length !== 0 &&
      this.state.roles.length !== 0
    ) {
      if (this.state.nominees.length >= 2) {
        await db.collection('elections').doc(uniqueId).set({
          postTitle: this.state.postTitle,
          lastDate: this.state.lastDate,
          eligibility: this.state.eligibility,
          roles: this.state.roles,
          organizationId: this.state.emailId,
          totalVotes: 0,
          isActive: true,
          voters: [],
          secretCode: this.state.secretCode,
        });
        try {
          var nomineesArray = this.state.nominees;
          for (var i = 0; i < nomineesArray.length; i++) {
            console.log(nomineesArray[i]);

            await db
              .collection('elections')
              .doc(uniqueId)
              .collection('nominees')
              .add({
                name: nomineesArray[i].name,
                details: nomineesArray[i].details,
                votes: 0,
              });
          }
        } catch (e) {
          console.log(e);
        }
        alert('Election added successfully and it is active!');
        this.props.navigation.navigate('ActiveElectionsList');
      } else {
        alert('Enter more than 2 nominees');
      }
    } else {
      alert('Enter all information properly');
    }
  };
  render() {
    return (
      <View style={styles.container}>
      
        <LinearGradient
          // Button Linear Gradient
          colors={['#8CACE5', '#9ADAE9']}
          style={{
            flex: 1,
          }}>
          <Header
            backgroundColor="#"
            centerComponent={{
              text: 'Create Elections',
              style: {
                color: 'white',
                fontSize: 18,
              },
            }}
            leftComponent={
              <Feather
                name="arrow-left-circle"
                size={24}
                color="white"
                onPress={() => this.props.navigation.goBack()}
              />
            }
          />
          <View style={{ flex: 1, justifyContent: 'center', marginTop: -10 }}>
            <View>
              <Modal
                style={styles.modalView}
                isVisible={this.state.modalVisible}
                backdropOpacity={0.4}
                onBackdropPress={() => this.setState({ modalVisible: false })}>
                <View style={styles.modalMainView}>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: -13,
                      right: -10,
                      margin: 10,
                      padding: 10,
                    }}
                    onPress={() => this.setState({ modalVisible: false })}>
                    <MaterialIcons
                      name="cancel"
                      size={24}
                      color="#A5DAD2"
                      onPress={() => this.setState({ modalVisible: false })}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'center', margin: 5, padding: 5 }}>
                    Fill Details
                  </Text>
                  <TextInput
                    placeholder="Name"
                    onChangeText={(val) => {
                      this.setState({
                        name: val,
                      });
                    }}
                    style={{
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                      borderWidth: 1,
                      borderColor: 'gray',
                    }}
                    value={this.state.name}
                  />
                  <TextInput
                    placeholder="Candidate Experience and details"
                    onChangeText={(val) => {
                      this.setState({
                        details: val,
                      });
                    }}
                    style={{
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                      borderWidth: 1,
                      borderColor: 'gray',
                    }}
                    multiline={true}
                    numberOfLines={2}
                    value={this.state.details}
                  />
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: '#8DB1E5',
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      //add details in db
                      if (
                        this.state.name.length !== 0 &&
                        this.state.details.length !== 0
                      ) {
                        var nominee = {
                          name: this.state.name,
                          details: this.state.details,
                          votes: 0,
                        };
                        let { nominees } = this.state;
                        nominees.push(nominee);
                        console.log(this.state.nominees);
                        this.setState({
                          name: '',
                          details: '',
                          modalVisible: false,
                        });
                      }
                    }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
            <View
              style={{
                flex: 1,
                width: '85%',
                margin: 5,
                padding: 10,
                borderRadius: 10,
                backgroundColor: '#ffffffdd',
                alignSelf: 'center',
              }}>
              <ScrollView style={{ flex: 1 }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons name="title" size={24} color="grey" />

                  <Text
                    style={{
                      paddingLeft: 10,
                    }}>
                    Post Title
                  </Text>
                </View>
                <TextInput
                  style={styles.inputFont}
                  onChangeText={(postTitle) => this.setState({ postTitle })}
                  placeholder={'Post Title'}
                  placeholderTextColor={'grey'}
                  value={this.state.postTitle}
                />

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Fontisto name="date" size={24} color="grey" />

                    <Text
                      style={{
                        paddingLeft: 10,
                        width: '60%',
                      }}>
                      Last Date:
                    </Text>
                  </View>

                  <TextInput
                    style={{
                      width: '40%',
                      paddingHorizontal: 10,
                      marginHorizontal: 10,
                      borderBottomWidth: 1.5,
                      borderColor: 'black',
                    }}
                    onChangeText={(lastDate) => this.setState({ lastDate })}
                    placeholder={'Last Date'}
                    placeholderTextColor={'grey'}
                    value={this.state.lastDate}
                  />
                </View>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Feather name="user-check" size={24} color="grey" />

                  <Text
                    style={{
                      paddingLeft: 10,
                    }}>
                    Eligibilty
                  </Text>
                </View>

                <TextInput
                  style={styles.inputFont}
                  onChangeText={(eligibility) => this.setState({ eligibility })}
                  placeholder={'Eligibility'}
                  multiline={true}
                  numberOfLines={2}
                  placeholderTextColor={'grey'}
                  value={this.state.eligibility}
                />

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Feather name="info" size={24} color="grey" />

                  <Text
                    style={{
                      paddingLeft: 10,
                    }}>
                    Additional Information
                  </Text>
                </View>

                <TextInput
                  style={styles.inputFont}
                  onChangeText={(roles) => this.setState({ roles })}
                  placeholder={'Roles and responsibilities'}
                  multiline={true}
                  numberOfLines={2}
                  placeholderTextColor={'grey'}
                  value={this.state.roles}
                />
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      paddingLeft: 10,
                    }}>
                    Nominees
                  </Text>
                  <TouchableOpacity
                    style={styles.fab}
                    onPress={() => {
                      this.setState({ modalVisible: true });
                    }}>
                    <Ionicons
                      name="add-outline"
                      size={20}
                      color="white"></Ionicons>
                  </TouchableOpacity>
                </View>
                {this.state.nominees.map((nominee) => (
                  <View
                    style={{
                      padding: 10,
                      margin: 10,
                      borderRadius: 10,
                      backgroundColor: '#9ADAE9',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      flexDirection:"row",
                      alignItems: 'center',
                    }}>
                  <Ionicons name="person-circle" size={24} color="white" />
                    
                    <Text style={{color:"white", marginLeft:5}}>{nominee.name}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    this.addDetails();
                  }}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputFont: {
    width: '85%',
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: 'black',
    fontSize: 16,
    marginTop: 10,
    padding: 5,
  },
  fab: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ADAE9',
    borderRadius: 15,
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
  submitButton: {
    backgroundColor: '#7864D0',
    width: '50%',
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  submitText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
});
