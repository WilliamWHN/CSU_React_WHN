import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigator'
import Toast from 'react-native-toast-message'


export default class App extends Component {
  render() {
      return (
          <NavigationContainer>
              <StackNavigation />
              <Toast ref={(ref) => Toast.setRef(ref)} />
          </NavigationContainer>
      )
  }
}