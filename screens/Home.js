import React, { Component } from "react";
import {View, Text, StatusBar, StyleSheet, TouchableOpacity} from "react-native";

export default class HomeScreen extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <TouchableOpacity style={styles.buttons} onPress={() => this.props.navigation.push('Consultations')}>
                   <Text style={styles.textButtons}>Consulter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={() => this.props.navigation.push('Reports')}>
                   <Text style={styles.textButtons}>Rapporter</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    buttons:{
        margin: 12,
        height: 40,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
    },
    textButtons:{
        color: "white",
        fontSize: 18,
    }
  });