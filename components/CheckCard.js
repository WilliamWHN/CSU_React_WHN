import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import InputSpinner from "react-native-input-spinner";
import API from '../Api.js';
import Toast from 'react-native-toast-message';

export default class CheckCard extends Component{

    constructor(props){
        super(props)
        this.info = this.props.info
        this.state = {
            start_quantity: this.info.start,
            end_quantity: this.info.end
        }
    }

    postFarmaCheck(){
        
        this.info.nova ? 
            API.post('api/novacheck', {
                nova_id: this.info.nova_id,
                drugsheet_id: this.info.drugsheet_id,
                start: this.state.start_quantity,
                end: this.state.end_quantity,
                date: this.info.date,
                drug_id: this.info.drug_id
            })
        : 
            API.post('api/pharmacheck', {
                batch_id: this.info.batch_id,
                drugsheet_id: this.info.drugsheet_id,
                start: this.state.start_quantity,
                end: this.state.end_quantity,
                date: this.info.date,
            })
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Modification effectuées',
            
        });
        this.props.onSubmit()
    }

    render(){
        return(
            <View style={styles.container}>
                {this.info.nova ? 
                    <Text style={styles.cardTitle}>De {this.info.drug} de la nova {this.info.nova}</Text>
                    : 
                    <Text style={styles.cardTitle}>Du lot {this.info.batch_number} de {this.info.drug}</Text>}
                <Text style={styles.text}>Matin :</Text>
                <InputSpinner
                    style={styles.inputSpinner}
                    skin="square"
                    min={0}
                    step={1}
                    colorMin={"red"}
                    value={this.info.start}
                    onChange={(num) => {
                        this.setState({start_quantity: num})
                    }}
                />
                <Text style={styles.text}>Soir :</Text>
                <InputSpinner
                    skin="square"
                    style={styles.inputSpinner}
                    min={0}
                    step={1}
                    colorMin={"red"}
                    value={this.info.end}
                    onChange={(num) => {
                        this.setState({end_quantity: num})
                    }}
                />
                <TouchableOpacity  onPress={() => {this.postFarmaCheck()}} style={styles.submitButton}><Text style={styles.submitButtonText}>Envoyer</Text></TouchableOpacity>
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