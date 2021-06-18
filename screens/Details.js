import React, { Component } from "react";
import {View, Text, StyleSheet, StatusBar, SafeAreaView} from "react-native";
import API from '../Api.js';
import {IoSunny, IoMoon} from 'react-icons/io5'
import { BiLoaderCircle } from "react-icons/bi";

export default class DetailsScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            actions: null
        }
    }

    componentDidMount(){
        API.get('api/myactionsinshift/'+ this.props.route.params.reportId)
            .then(res =>{
                this.setState({actions: res.data.data})
            })
            
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Dans le rapport du {this.props.route.params.date} à {this.props.route.params.base}</Text>
                 {
                     this.state.actions ? this.state.actions.map((action) => (
                        <View style={styles.actionsContainer}> 
                            <Text style={styles.actionDay}>{action.day ? <IoSunny/> : <IoMoon /> }</Text>   
                            <Text style={styles.actionText}>{action.action}</Text>
                            <Text style={styles.actionDate}>{action.at}</Text>
                        </View>
                     )):(
                        <View style={styles.loadingTextContainer}><Text style={styles.loadingText}><BiLoaderCircle/> Chargement</Text></View>
                     )
                 }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    actionsContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        textAlignVertical: 'center',
        alignItems: 'center',
        padding: 5,
        paddingTop: 10,
    },
    loadingText:{
        textAlign: 'center',
        fontSize: 40,
        color: "black",
    },
    loadingTextContainer:{
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flex:1
    },
    title:{
        color: "black",
        fontStyle: "italic",
        fontSize: 25,
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    actionDay:{
        flex: 0.5,
        paddingLeft: 10,
        marginTop: 3,
        paddingRight: 5
    },
    actionText:{
        flex: 6.5,
        fontSize: 15,
    },
    actionDate:{
        flex: 3,
        fontSize: 10
    }
  });