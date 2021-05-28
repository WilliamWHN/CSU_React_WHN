import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native'; 
import { Picker } from '@react-native-community/picker'
import { Input, Button } from 'react-native-elements';

import API from '../Api.js';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';

export default class Card extends Component{

    constructor(props){
        super(props)
        this.state = {
            bases: new Array(),
            initals: null,
            password: null
            
        }
    }

    componentDidMount(){
        API.get(`api/bases`)
        .then(res =>{
            this.setState({bases: res.data})
        })
        .catch(error => console.log(error));
    }

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
                SecureStore.setItemAsync('token', res.data.token);
            })
            .catch(error =>{
                console.log(error.message)
                Toast.show({
                    type: 'error',
                    position: 'top',
                    
                });
            });
    }


    render(){
        return (
            <View style={styles.container}>
                <Input placeholder='Itiniales' onChange={e => this.setState({initals: e.target.value})}/>
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