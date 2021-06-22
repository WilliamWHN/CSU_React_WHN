import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native'; 
import { Picker } from '@react-native-community/picker'
import { Input, Button } from 'react-native-elements';

import API from '../Api.js';
import Toast from 'react-native-toast-message';
import { UserContext } from "../context/userContext";

export default class Card extends Component{

    constructor(props){
        super(props)
        this.state = {
            bases: [],
            currentBaseId: null,
        }
    }

    static contextType = UserContext;

    componentDidMount(){
        API.get(`api/bases`)
        .then(res =>{
            this.setState({
                bases: res.data,
                currentBaseId: res.data[3].id,
            })
        })
        .catch(error => console.log(error));
    }


    //Connexion de l'utilisateur
    submitLogin = () =>{    
        //Creation du formData a passer a la requete
        let formData = new FormData();
        formData.append('initials', this.state.initials)
        formData.append('password', this.state.password)

        //Requete post pour recup le token et stocker les données de l'utilisateur dans le context
        API.post(`api/gettoken`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(res =>{
                localStorage.setItem('token', res.data.token);
                localStorage.setItem("initials", this.state.initials);
                localStorage.setItem("currentBaseId", this.state.currentBaseId);
                const user = {
                    initials: this.state.initials,
                    token: res.data.token,
                    currentBaseId: this.state.currentBaseId,
                }
                this.context.setUser(user)
                console.log(this.state.currentBaseId)
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
                <Input placeholder='Initiales' onChange={e => this.setState({initials: e.target.value})}/>
                <Input placeholder='Mot de passe'  secureTextEntry={true}  onChange={e => this.setState({password: e.target.value})}/>
                {/*Selection de la base avec un picker*/}
                <Picker selectedValue={this.state.currentBaseId} onValueChange={(itemValue) => this.setState({ currentBaseId: itemValue })}>
                    {this.state.bases.map((base) => (
                        <Picker.Item label={base.name} value={base.id}></Picker.Item>
                    ))}
                </Picker>
                <Button title="Login" onPress={this.submitLogin}/>
                <Text>Version: eval WHN</Text>
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