import React, { Component } from "react";
import {View, Text, StatusBar, StyleSheet, TouchableOpacity, Image} from "react-native";
import API from '../Api.js';

export default class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            nbOfSchedules: null
        }
    }
    
    componentDidMount(){
        API.get(`api/unconfirmedworkplans`)
        .then(res =>{
            //TODO Gerer les erreurs
            this.setState({nbOfSchedules: res.data.length})
        })
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
                    { this.state.nbOfSchedules ? 
                    <TouchableOpacity style={styles.buttons} onPress={() => this.props.navigation.push('Horaires a confirmer')}>
                        <Text style={styles.textButtons}>Horaires a confirmer: {this.state.nbOfSchedules}</Text>
                    </TouchableOpacity> : null
                    }   
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