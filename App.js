import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; 
import Home from './screens/Home';
import Login from './screens/Login'; 
import Signup from './screens/Signup';   
import UpdateProfile from './screens/UpdateProfile'; 
import ActiveElectionsList from './screens/ActiveElectionsList'; 
import ActiveElectionDet from './screens/ActiveElectionDet';
import UserActiveElectionDetails from './screens/UserActiveElectionDetails';
import PastElectionDet from './screens/PastElectionDet'; 
import PastElectionsList from './screens/PastElectionsList';
import CreateElection from './screens/CreateElection';
import ForgotPassword from './screens/ForgotPassword'; 

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Home" component={HomeStackNav} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}

const HomeStack = createStackNavigator();
export const HomeStackNav = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="ActiveElectionsList"
        component={ActiveElectionsList}
      />
      <HomeStack.Screen
        name="PastElectionsList"
        component={PastElectionsList}
      />
      <HomeStack.Screen name="CreateElection" component={CreateElection} />
      <HomeStack.Screen name="PastElectionDet" component={PastElectionDet} />
      <HomeStack.Screen
        name="ActiveElectionDet"
        component={ActiveElectionDet}
      />
      <HomeStack.Screen name="UpdateProfile" component={UpdateProfile} />
    </HomeStack.Navigator>
  );
};
