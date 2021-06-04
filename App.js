import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigator'
import { SafeAreaProvider } from "react-native-safe-area-context";
import asyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./screens/SplashScreen";
import { UserContext } from "./context/userContext";
import Toast from 'react-native-toast-message';

export default class App extends Component {

  state = {
    user: {},
    isLoading: true,
  };

  // Get user connection if he is already connected
  async componentDidMount() {
    const token = await asyncStorage.getItem("token");
    const initials = await asyncStorage.getItem("initials");
    const currentBaseId = await asyncStorage.getItem("currentBaseId");

    this.setState({
      user: {
        initials,
        token,
        currentBaseId,
      },
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) {
      return <SplashScreen />;
    }

    return (
      <UserContext.Provider
        value={{
          ...user,
          setUser: (newUser) => {
            this.setState({ user: newUser });
          },
          clear: () => {
            this.setState({ user: {} });
            asyncStorage.removeItem('token')
          },
        }}
      >
        <SafeAreaProvider>
          <NavigationContainer>
              <StackNavigation />
                <Toast ref={(ref) => Toast.setRef(ref)} />
          </NavigationContainer>
        </SafeAreaProvider>
      </UserContext.Provider>
    )
  }
}