


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';

export default function FinalScreenNormalPlay({navigation}) {

  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <Text style={{fontSize: 25}}>Elo: 15</Text>
        </View>
        <View style={styles.header}>
            <Text style={{fontSize: 25}}>Find the Game !</Text>
        </View>
        <View style={styles.viewButtonMiddle}>
        <TouchableOpacity style={[styles.touchablePlay, {backgroundColor: '#bb86fc'}]} onPress={() => navigation.navigate('GameScreenChoice')}>
            <Text style={{color: 'black'}}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchablePlay}>
            <Text>Revise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchablePlay}>
            <Text>Settings</Text>
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

  top:{
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  header:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
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
