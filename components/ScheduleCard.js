import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import InputSpinner from "react-native-input-spinner";
import API from '../Api.js';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-community/picker';
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import { Input, Button } from 'react-native-elements';

export default class ScheduleCard extends Component{

    constructor(props){
        super(props)
        this.info = this.props.info
        this.reason = null
        this.state = {
            confirmation: 1
        }
    }

    //TODO Centraliser les messages d'erreurs car trop répétitifs (utilisé par des components & vues)
    postConfirmation(){
        API.post('api/confirmworkplan', {
            id: this.info.id,
            confirmation: this.state.confirmation,
            reason: this.reason,
        }).catch(err => {
            switch(err.response.status){
                case 400 :
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Raison inavlide',
                        text2: 'Veuillez en rentrez une plus longue SVP'
                        
                    });
                    break;
                case 500 :
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Serveur Inateignable',
                        
                    });
                    break; 
            }
        }).then(
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Horaire confirmé, Merci !',
                visibilityTime: 1000,
            })
        )
        this.props.onSubmit()
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.cardTitle}>Date : {this.info.date} / Code : {this.info.worktime.type}</Text>
                {this.info.confirmation === 0 ?
                <>
                    <Text style={styles.cardTitle}>Status: A discuter</Text>
                    <Text style={styles.cardTitle}>Raison: {this.info.reason}</Text>
                    <Picker selectedValue="0" onValueChange={(itemValue) => this.setState({ confirmation: itemValue })}>
                         <Picker.Item label="Confirmer" value="1"></Picker.Item>
                    </Picker>
                </>
                : 
                <>
                    <Text style={styles.cardTitle}>Status: A discuter/confirmer</Text>
                    <Picker selectedValue={this.state.confirmation} onValueChange={(itemValue) => this.setState({ confirmation: itemValue })}>
                         <Picker.Item label="Confirmer" value="1"></Picker.Item>
                         <Picker.Item label="A discuter" value="0"></Picker.Item>
                    </Picker>
                </>
                }
                {
                    this.state.confirmation == 0 &&
                        <Input placeholder='Raison' onChange={e => this.reason = e.target.value}/>
                    
                }
                <TouchableOpacity  onPress={() => {this.postConfirmation()}} style={styles.submitButton}><Text style={styles.submitButtonText}>Envoyer</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: "#f1f1f1",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        alignItems: 'center',
        justifyContent: "center",
    },
    inputSpinner:{
        flex: 2,
    },
    text:{
        padding: 5,
        flex: 3,
        fontSize: 15,
    },
    submitButton:{
        margin: 12,
        height: 40,
        width: 150,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3e525f",
        padding: 5,
        flex: 3
    },
    submitButtonText:{
        color: "white"
    },
    cardTitle: {
        textAlign: 'left', 
        alignSelf: 'stretch',
        padding: 10
    }
  });