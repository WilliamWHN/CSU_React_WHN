import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './Navbar'
import Carrousel from './Carrousel'
import Card from './Card'

export default function App() {
  return (
    <React.Fragment>
      <Navbar appName='ReactAPP'></Navbar>
      <Carrousel/>
      <Card rate="Bon" flex="flex-start" imgRotate="360deg"/>
      <Card rate="Médiocre" flex="center" imgRotate="270deg"/>
      <Card rate="Nul" flex="flex-end" imgRotate="180deg"/>
    </React.Fragment>
  );
}

