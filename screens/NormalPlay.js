import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { scale, verticalScale } from 'react-native-size-matters';

import Entypo from 'react-native-vector-icons/Entypo'
import * as XLSX from 'xlsx';



export default function NormalPlay({navigation}) {

    const [data, setData] = useState([]);

    const BaseDonnée = require('../assets/BaseDonnée1.json')

    console.log(BaseDonnée.Destiny2['Nom simple'])
    

  const [GameInput, setGameInput] = useState('')

  return (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.viewButtonMiddle}>
            <Progress.Bar progress={0.3} width={200} />
            <Image
                source={{ uri: BaseDonnée.Destiny2['URL'] }}
                style={{ width: scale(320), height: verticalScale(170), marginBottom: '5%'}} // Taille de l'image
            />
            <View style={styles.textInputGame}>
                <TextInput 
                    marginTop ={'-1.2%'}
                    maxLength= {25}
                    placeholder= 'Game name ?'
                    value={GameInput}
                    onChangeText={setGameInput}
                    color={'#FFFFFF'}
                    placeholderTextColor={'#FFFFFF'}
                />
            </View>
            <View style={styles.viewdes3essais}>
                <View style={styles.unboxEssai}><Entypo name="cross" color={'red'} size={25} /></View>
                <View style={styles.unboxEssai}><Entypo name="cross" color={'red'} size={25} /></View>
                <View style={styles.unboxEssai}><Entypo name="cross" color={'red'} size={25} /></View>
            </View>
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
    flex: 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  header:{
    flex: 1.2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  textInputGame:{
    height: verticalScale(43),
    width: scale(260),
    backgroundColor:'#353535',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '1%',
    borderRadius: 10,
    marginTop: '5%',
    borderWidth: 0.5,
  },

  viewdes3essais:{
    height: verticalScale(30), 
    flexDirection: 'row', 
    width: scale(120),
    marginTop: '4%',
    justifyContent: 'space-evenly'
  },

  unboxEssai:{
    height: verticalScale(22), 
    width: verticalScale(22),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  viewButtonMiddle:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomview: {
    flex: 1,
  }
});
