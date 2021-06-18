import React, { Component } from "react";
import {UserContext} from "../context/userContext.js"
import { ListItem } from 'react-native-elements'
import API from '../Api.js';
import { BiLoaderCircle } from "react-icons/bi";
import { View, Button, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, ModerateScale, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";


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
                    <TouchableOpacity style={styles.buttonShift} onPress={() => { this.setState({reports: this.state.shifts})}}>
                        <Text style={styles.textButtons}>Garde</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStup} onPress={() => { this.setState({reports: this.state.drugs})}}>
                        <Text style={styles.textButtons}>Stup</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.reports ? this.state.reports.map((report, i) => (
                        <ListItem key={i} bottomDivider onPress={() => {
                            !report.week ? this.props.navigation.push('Details', {reportId: report.id, date: report.date, base: report.base}) : Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: 'Pas de rapport a afficher',
                        });}}>
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
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
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
    buttonStup:{
        margin: 12,
        height: 40,
        width: 150,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
    },
    buttonShift:{
        margin: 12,
        height: 40,
        width: 150,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
    textButtons:{
        color: "white",
        fontSize: 18,
    }
  });