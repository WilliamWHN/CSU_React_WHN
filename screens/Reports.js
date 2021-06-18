import React, { Component } from "react";
import {UserContext} from "../context/userContext.js"
import {View, Text,TouchableOpacity , StyleSheet, StatusBar, SafeAreaView} from "react-native";
import API from '../Api.js';
import { BiLoaderCircle } from "react-icons/bi";
import CheckCard from '../components/CheckCard'

export default class ReportsScreen extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props)
        this.state = {
            tab: "pharma",
            refreshPage: 0,
            isLoading: true,
        }
        this.getMissingChecks = this.getMissingChecks.bind(this)
    }

    async componentDidMount(){
       this.getMissingChecks()
    }

    getMissingChecks(){
        API.get('api/missingchecks/' + this.context.currentBaseId)
        .then(res => {
            this.setState({
                isLoading: false,
                pharma: null,
                nova: null,
            }),
            this.setState({
                pharma: res.data.pharma,
                nova: res.data.nova,
            })
        })  
    }

    render(){
        return(
            this.state.isLoading ? <View style={styles.loadingTextContainer}><Text style={styles.loadingText}><BiLoaderCircle/> Chargement</Text></View> :
            <SafeAreaView style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonShift} onPress={() => {this.setState({tab: "pharma"})}}>
                        <Text style={styles.textButtons}>Pharma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStup} onPress={() => {this.setState({tab: "nova"})}}>
                        <Text style={styles.textButtons}>Nova</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.tab === "pharma" && this.state.pharma?.map((check) => (
                        <CheckCard info={check} onSubmit={this.getMissingChecks}/>
                    ))
                }
                {
                    this.state.tab === "nova" && this.state.nova?.map((check) => (
                        <CheckCard info={check} onSubmit={this.getMissingChecks}/>
                    ))
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