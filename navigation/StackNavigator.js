import React, { Component } from "react";
import {Button} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { UserContext } from "../context/userContext";

import HomeScreen from "../screens/Home";
import ConsultationsScreen from "../screens/Consultations";
import ReportsScreen from "../screens/Reports";
import DrugsScreen from "../screens/Drugs";
import SignInScreen from "../screens/SignIn";
import DetailsScreen from "../screens/Details";

const Stack = createStackNavigator()

export default class StackNavigator extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props)
    }

    render() {
        return(
            <Stack.Navigator>
                {this.context.token == null ? (
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
                                  onPress={this.context.clear}
                                  title={"Logout " + this.context.initials}
                                  color="#000"
                                />
                                ),
                            }} />
                        <Stack.Screen name="Consultations" component={ConsultationsScreen} />
                        <Stack.Screen name="Reports" component={ReportsScreen} />
                        <Stack.Screen name="Drugs" component={DrugsScreen} />
                        <Stack.Screen name="Details" component={DetailsScreen} />
                    </>
                )}
            </Stack.Navigator>
        )
    }

}