import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'; 

export default class Card extends Component{
    constructor(props){
        super(props)
    }

    render(){
          const styles = StyleSheet.create({
            container: {
                flex: 2,
                padding: 10,
                margin: 10,
                justifyContent: this.props.flex,
                alignItems: this.props.flex,
                backgroundColor: "blue",
                borderRadius: 15/2,
            },
            tinyLogo: {
                width: 70,
                height: 70,
                transform: [{ rotate: this.props.imgRotate }]
              },
            button: {
                display: 'flex',
                width: 'auto',
                height: 'auto',
                alignItems: 'center',
              },  
          });

        return (
            <View style={styles.container}>
            <TouchableHighlight onPress={() => {alert("Ce cours était : " + this.props.rate);}} underlayColor="blue" >
                <View style={styles.button}><Image style={styles.tinyLogo} source={require('./big_thumb.png')} /></View>
            </TouchableHighlight>  
            </View>
        );  

        
    }
}