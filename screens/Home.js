import React, { Component } from "react";
import {View, Text, StatusBar, StyleSheet, TouchableOpacity, Image} from "react-native";

export default class HomeScreen extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
                <View style={styles.containerNavButton}>
                    <TouchableOpacity style={styles.buttons} onPress={() => this.props.navigation.push('Consultations')}>
                    <Text style={styles.textButtons}>Consulter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={() => this.props.navigation.push('Reports')}>
                    <Text style={styles.textButtons}>Rapporter</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Image style={styles.stretch} source={require("./img/csunvb_logo.png")} />
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    containerNavButton:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        justifyContent: 'center', //Centered vertically
    },
    container: {
        flex: 3,
        paddingTop: StatusBar.currentHeight,
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally

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
    },
    stretch: {
        width: 206,
        height: 115,
    }
    
  });