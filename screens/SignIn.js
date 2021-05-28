import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native'; 
import { Picker } from '@react-native-community/picker'
import { Input, Button } from 'react-native-elements';

import API from '../Api.js';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from "../context/userContext";

export default class Card extends Component{

    constructor(props){
        super(props)
        this.state = {
            bases: [],
            user: {
                initals: null,
                password: null,
                currentBaseId: 0,
            }
        }
    }

    static contextType = UserContext;

    componentDidMount(){
        API.get(`api/bases`)
        .then(res =>{
            this.setState({bases: res.data})
        })
        .catch(error => console.log(error));
    }


    //Connexion de l'utilisateur
    submitLogin = () =>{
        let formData = new FormData();
        formData.append('initials', this.state.initals)
        formData.append('password', this.state.password)
        //Todo Stock this token
        API.post(`api/gettoken`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(res =>{
                AsyncStorage.setItem('token', res.data.token);
            })
            .catch(error =>{
                console.log(error.message)
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Mauvaise combinaison',
                    text2: 'Veuillez reessayer'
                    
                });
            });
    }


    render(){
        return (
            <View style={styles.container}>
                <Input placeholder='Initiales' onChange={e => this.setState({initals: e.target.value})}/>
                <Input placeholder='Mot de passe'  onChange={e => this.setState({password: e.target.value})}/>
                <Picker>
                {this.state.bases.map((base) => (
                    <Picker.Item label={base.name} value={base.name}></Picker.Item>
                ))}
                </Picker>
                <Button title="Login" onPress={this.submitLogin}/>
            </View>
        );  
    }

   
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 50,
        marginTop: 100,
        flex: 9,
    }
  });