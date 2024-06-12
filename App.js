import 'react-native-gesture-handler';
import React, { useReducer } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './screens/Menu';
import { NavigationContainer } from '@react-navigation/native';
import setDefaultProps from 'react-native-simple-default-props'
import {useEffect, useState} from 'react';

import * as Font from 'expo-font';
import GameScreenChoice from './screens/GameScreenChoice';
import NormalPlay from './screens/NormalPlay';


const Stack = createStackNavigator();




export default function App() {


  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'PoppinsBlack': require('./assets/fonts/Montserrat-Medium.ttf'),
      })
      .then(() => {
        setDefaultProps(Text, { style: [{ fontFamily: 'PoppinsBlack', color: '#FFFFFF'}], });
       }) 
  
      // Mettre en pause l'exécution pendant 2 secondes
      //await new Promise(resolve => setTimeout(resolve, 100));
  
      //setFontsLoaded(true);
      //await SplashScreen.hideAsync();
    }

    loadFonts();

  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, presentation: 'transparentModal'}}>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="GameScreenChoice" component={GameScreenChoice} />
        <Stack.Screen name="Normal Play" component={NormalPlay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
