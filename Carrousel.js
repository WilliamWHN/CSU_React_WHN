import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'; 

export default class Carrousel extends Component {
    constructor(props){
        super(props)
    }

    render(){
        styles = {
            container: {
              flex: 2,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            },
            text:{
                color: "black",
            }
          };

        return (
            <View style={styles.container}>
              <Text>Carrousel APP</Text>
            </View>
        );  
    }
}