import React, { Component } from "react";
import {View, Text, Button} from "react-native";

export default class HomeScreen extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Drugs"
                    onPress={() => this.props.navigation.push('Drugs')}
                />
                <Button
                    title="Go to Reports"
                    onPress={() => this.props.navigation.push('Reports')}
                />
            </View>
        );
    }
}