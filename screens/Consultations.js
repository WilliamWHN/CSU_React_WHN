import React, { Component } from "react";
import {View, Text, Button} from "react-native";
import {UserContext} from "../context/userContext.js"
import API from '../Api.js';


export default class ConsultationsScreen extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props)
    }

    async componentDidMount(){
       console.log(API.post('api/reports'))
    }

    render(){
        return(
            <View>
                <Text>Voir mes rapports de</Text>
                <Button  
                    title="Garde"
                />
                <Button  
                    title="Stup"
                />
            </View>
        );
    }
}