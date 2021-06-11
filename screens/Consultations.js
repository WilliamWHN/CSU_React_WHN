import React, { Component } from "react";
import {UserContext} from "../context/userContext.js"
import { ListItem } from 'react-native-elements'
import API from '../Api.js';
import { View, Button, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, ModerateScale, TouchableOpacity } from "react-native";


export default class ConsultationsScreen extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props)
        this.state = {
            reports: null,
            shifts: null,
            drugs: null,
        }
    }

    async componentDidMount(){
       API.get('api/reports')
       .then(res => {
           console.log(res.data)
            this.setState({
                shifts: res.data.shift,
                drugs: res.data.drug,
                reports: res.data.shift,
            })
       })
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button_shift} onPress={() => { this.setState({reports: this.state.shifts})}}>
                        <Text style={styles.text}>Garde</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button_stup} onPress={() => { this.setState({reports: this.state.drugs})}}>
                        <Text style={styles.text}>Stup</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.reports ? this.state.reports.map((report, i) => (
                        <ListItem key={i} bottomDivider onPress={() => {this.props.navigation.push('Details', {itemId: report.id})}}>
                            <ListItem.Content>
                                {
                                    report.week ? (
                                        <ListItem.Title>Semaine {report.week} à {report.base}</ListItem.Title>
                                    ):(
                                        <ListItem.Title>Le {report.date} à {report.base} {report.week}</ListItem.Title>
                                    )
                                }
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>                    
                    )) : (
                        <Text style={styles.loadingText}>Chargement...</Text>
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
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    loadingText:{
        textAlign: 'center',
        fontSize: 40,
        color: "blue",
    },
    button_stup:{
        margin: 12,
        height: 40,
        width: 150,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
    },
    button_shift:{
        margin: 12,
        height: 40,
        width: 150,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
    text:{
        color: "white",
        fontSize: 18,
    }
  });