import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import InputSpinner from "react-native-input-spinner";

export default class CheckCard extends Component{

    constructor(props){
        super(props)
        this.info = this.props.info
    }

    render(){
        return(
            <View style={styles.container}>
                {this.info.nova ? <Text>De {this.info.drug} de la nova {this.info.nova}</Text> : <Text style={styles.cardTitle}>Du lot {this.info.batch_number} de {this.info.drug}</Text>}
                <Text style={styles.text}>Matin :</Text>
                <InputSpinner
                    style={styles.inputSpinner}
                    skin="square"
                    min={0}
                    step={1}
                    colorMin={"red"}
                    value={this.info.start}
                    onChange={(num) => {
                        console.log(num);
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
                        console.log(this.info);
                    }}
                />
                <TouchableOpacity style={styles.submitButton}><Text style={styles.submitButtonText}>Envoyer</Text></TouchableOpacity>
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