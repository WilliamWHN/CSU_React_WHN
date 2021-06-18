import React, { Component } from "react";
import {UserContext} from "../context/userContext.js"
import {View, Text,TouchableOpacity , StyleSheet, StatusBar, SafeAreaView} from "react-native";
import API from '../Api.js';
import CheckCard from '../components/CheckCard'

export default class ReportsScreen extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props)
        this.pharma, this.nova = null
        this.state = {
            checks: null,
        }
    }

    async componentDidMount(){
        API.get('api/missingchecks/' + this.context.currentBaseId)
        .then(res => {
            this.nova = res.data.nova
            this.pharma = res.data.pharma
            this.setState({
                checks: res.data.pharma,
            })
            
        })
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonShift} onPress={() => {this.setState({checks: this.pharma})}}>
                        <Text style={styles.textButtons}>Pharma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStup} onPress={() => {this.setState({checks: this.nova})}}>
                        <Text style={styles.textButtons}>Nova</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.checks ? this.state.checks.map((check) => (
                        <CheckCard info={check}/>
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