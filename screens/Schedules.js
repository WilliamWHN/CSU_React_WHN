import React, { Component } from "react";
import {View, Text} from "react-native";
import ScheduleCard from '../components/ScheduleCard';
import API from "../Api";
import { StyleSheet } from "react-native";
import Toast from 'react-native-toast-message';

export default class SchedulesScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            schedules: []
        }

        this.getUnconfirmedSchedules = this.getUnconfirmedSchedules.bind(this)
    }

    async componentDidMount(){
       this.getUnconfirmedSchedules()
    }

    getUnconfirmedSchedules(){
        API.get(`api/unconfirmedworkplans`)
        .then(res =>{
            this.setState({schedules: null})
            this.setState({schedules: res.data})
        })
    }

    render(){
        return(
            <View>
                {
                    this.state.schedules?.length == 0 ? (
                        <View style={styles.loadingTextContainer}>
                            <Text style={styles.loadingText}>Vous avez confirmé tous vos horaires</Text>
                        </View>
                    ) : (
                    <Text style={styles.countText}>Horaires restant a confirmer : {this.state.schedules?.length}</Text>
                    )
                }
                {
                this.state.schedules?.map((schedule) => (
                    <ScheduleCard info={schedule} onSubmit={this.getUnconfirmedSchedules}/>
                ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingText:{
        textAlign: 'center',
        fontSize: 40,
        color: "black",
    },
    countText:{
        textAlign: 'center',
        fontSize: 27,
        color: "#3e525f",
    },
    loadingTextContainer:{
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flex:1
    },
})