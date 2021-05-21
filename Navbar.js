import React, { Component } from 'react'
import NavigationBar from 'react-native-navbar';
import { StyleSheet, Text, View } from 'react-native';

export default class Navbar extends Component {

    constructor(props){
        super(props)
    }

    render(){
        styles = {
            container: {
              flex: 1,
              marginTop: 20,
              padding: 10,
              justifyContent: "center",
            },
          };
          
        rightButtonConfig = {
            title: 'Next',
            handler: () => alert('Next!'),
          };

        let leftButtonConfig = {
            title: 'Previous',
            handler: () => alert('Previous!'),
          };
          
        titleConfig = {
            title: this.props.appName,
          };

        return (
            <View style={styles.container}>
              <NavigationBar
                leftButton={leftButtonConfig}
                title={titleConfig}
                rightButton={rightButtonConfig}
              />
            </View>
        ); 
    }
}