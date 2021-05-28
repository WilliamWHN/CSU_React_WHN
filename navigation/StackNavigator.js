import React, { Component } from "react";
import {Button} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import  UserContext  from "../App";

import HomeScreen from "../screens/Home";
import ReportsScreen from "../screens/Reports";
import DrugsScreen from "../screens/Drugs";
import SignInScreen from "../screens/SignIn";

const Stack = createStackNavigator()

export default class StackNavigator extends Component{

    static contextType = UserContext

    constructor(props){
        super(props)
    }

    render() {
        return(
            <Stack.Navigator>
                {this.context.user?.token == null ? (
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
                        <Stack.Screen name="Home" component={HomeScreen} options={{
                            headerRight: () => (
                                <Button
                                  onPress={this.logout}
                                  title="Logout"
                                  color="#000"
                                />
                                ),
                            }} />
                        
                        <Stack.Screen name="Reports" component={ReportsScreen} />
                        <Stack.Screen name="Drugs" component={DrugsScreen} />
                    </>
                )}
            </Stack.Navigator>
        )
    }

}