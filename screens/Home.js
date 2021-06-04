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
                    title="Consulter"
                    onPress={() => this.props.navigation.push('Consultations')}
                />
                <Button
                    title="Rapporter"
                    onPress={() => this.props.navigation.push('Reports')}
                />
                <Button
                    title="Drogues"
                    onPress={() => this.props.navigation.push('Drugs')}
                />
            </View>
        );
    }
}