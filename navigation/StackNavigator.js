import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/Home";
import ReportScreen from "../screens/Report";
import DrugsScreen from "../screens/Drugs";
import SignInScreen from "../screens/SignIn";

const Stack = createStackNavigator()

export default class StackNavigator extends Component{

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            isSignedIn: null
        }
    }

    render() {
        if(this.state.isLoading){
            return <SplashScreen />
        }

        return(
            <Stack.Navigator>
                {this.state.isSignedIn == null ? (
                    // No token found, user isn't signed in
                    <Stack.Screen
                        name="SignIn"
                        component={SignInScreen}
                        options={{
                            title: 'Login'
                        }}
                    />
                ) : (
                // User is signed in
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Reports" component={ReportScreen} />
                        <Stack.Screen name="Drugs" component={DrugsScreen} />
                    </>
                )}
            </Stack.Navigator>
        )
    }

}