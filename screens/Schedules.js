import React, { Component } from "react";
import {View, Text} from "react-native";
import ScheduleCard from '../components/ScheduleCard';
import API from "../Api";

export default class SchedulesScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            shedules: []
        }
    }

    componentDidMount(){
        API.get(`api/unconfirmedworkplans`)
        .then(res =>{
            console.log(res.data)
            this.setState({shedules: res.data})
        })
    }

    render(){
        return(
            <View>
                {
                this.state.shedules?.map((schedule) => (
                    <ScheduleCard info={schedule}/>
                ))
                }
            </View>
        );
    }
}