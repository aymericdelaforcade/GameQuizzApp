import { useEffect, useState, useRef} from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default function GameScreenChoice({navigation}) {
  
  useEffect(() => {

    console.log('useEffect Menu lancé')



  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={{fontSize: 25}}>Find the Game !</Text>
        </View>
        <View style={styles.viewButtonMiddle}>
        <TouchableOpacity style={[styles.touchablePlay, {backgroundColor: '#bb86fc'}]} onPress={() => navigation.navigate('Normal Play')}>
          <FontAwesome5 name={'play'} color={'black'} size={18}/>
          <Text style={{color: 'black', marginLeft: '4%'}}>Normal game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchablePlay}>
          <FontAwesome5 name={'user-astronaut'} color={'white'} size={18}/>
          <Text style={{marginLeft: '4%'}}>Character game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchablePlay}>
          <FontAwesome6 name={'users-viewfinder'} color={'white'} size={18}/>
          <Text style={{marginLeft: '3%'}}>Online Matchmaking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchablePlay}>
          <MaterialIcons name={'display-settings'} color={'white'} size={20}/>
          <Text style={{marginLeft: '3%'}}>Custom Game</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.bottomview}></View>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  header:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  touchablePlay:{
    height: verticalScale(43),
    width: scale(260),
    backgroundColor:'#353535',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '1%',
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: 'row'
  },

  viewButtonMiddle:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomview: {
    flex: 1
  }
});
