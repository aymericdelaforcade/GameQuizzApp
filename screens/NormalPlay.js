import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { scale, verticalScale } from 'react-native-size-matters';

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'


import * as XLSX from 'xlsx';

// Attention, enlever la vérification des majuscules !!

export default function NormalPlay({navigation}) {

  const [jeuActuel, setjeuActuel] = useState(0);
  const [Cross1Opacity, setCross1Opacity] = useState(0)
  const [Cross2Opacity, setCross2Opacity] = useState(0)
  const [Cross3Opacity, setCross3Opacity] = useState(0)
  const intervalRef = useRef(null);

  const [Timer, setTimer] = useState(40)

  const [ListeNombreAleatoireState, setListeNombreAleatoireState] = useState([])

  const [GameInput, setGameInput] = useState('')

  const BaseDonnée = require('../assets/BaseDonnée1.json')

  const Basedonnéeconvertie = Object.entries(BaseDonnée);

  const TailledeBasedonnée = Basedonnéeconvertie.length


  let ListeNombreAleatoire = []

  function TimerFunction () {

    intervalRef.current = setInterval(() => {
      setTimer(Timer => Timer - 1);
    }, 1000);
  }
  
  useEffect(() => {
    ListeNombreAleatoire = Array.from({ length: TailledeBasedonnée + 1 }, (v, k) => k); //code chat GPT qui permet de générer l'array de l'ordre des questions
    for (let i = ListeNombreAleatoire.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ListeNombreAleatoire[i], ListeNombreAleatoire[j]] = [ListeNombreAleatoire[j], ListeNombreAleatoire[i]];
    }

    setListeNombreAleatoireState(ListeNombreAleatoire)
  }, []);


  //console.log(ListeNombreAleatoireState[jeuActuel])

  console.log(Basedonnéeconvertie[ListeNombreAleatoireState[jeuActuel]][1]['Nom simple'] + 'nom simple ')

  function BonJeuouPas () {
    if (GameInput === Basedonnéeconvertie[ListeNombreAleatoireState[jeuActuel]][1]['Nom simple']){
      setjeuActuel(jeuActuel => jeuActuel + 1)
      clearInterval(intervalRef.current);
    }else{
      if(Cross1Opacity == 0){
        setCross1Opacity(1)
      }else{
        if (Cross2Opacity == 0){
          setCross2Opacity(1)
        }else{
          if (Cross3Opacity == 0){
            setCross3Opacity(1)
            clearInterval(intervalRef.current);

            setTimeout(() => {
              setjeuActuel(jeuActuel => jeuActuel + 1)
              setCross1Opacity(0)
              setCross2Opacity(0)
              setCross3Opacity(0)
              setGameInput('')
          }, 800);
          }
        }
      }


    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{marginBottom: '2%'}}>0: </Text>
          <Progress.Bar progress={0.3} width={scale(100)} height={verticalScale(8)} style={{marginBottom: '15%', borderColor: 'grey'}} color='red'/>
        </View>
        <View style={styles.viewButtonMiddle}>
            <Image
                source={{ uri: Basedonnéeconvertie[ListeNombreAleatoireState[jeuActuel]][1]['URL'] }}
                style={{ width: scale(320), height: verticalScale(170), marginBottom: '5%', borderRadius: 12}} // Taille de l'image
            />
            <View style={{flexDirection: 'row'}}>
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
              <TouchableOpacity style={styles.textInputGameArrowRight} onPress={() => BonJeuouPas()}>
                <AntDesign name="arrowright" color={'white'} size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewdes3essais}>
                <View style={styles.unboxEssai}><Entypo name="cross" color={'red'} size={25} style={{opacity: Cross1Opacity}}/></View>
                <View style={styles.unboxEssai}><Entypo name="cross" color={'red'} size={25} style={{opacity: Cross2Opacity}}/></View>
                <View style={styles.unboxEssai}><Entypo name="cross" color={'red'} size={25} style={{opacity: Cross3Opacity}}/></View>
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
    alignItems: 'center',
    justifyContent: 'center'
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

  textInputGameArrowRight:{
    height: verticalScale(43),
    width: scale(50),
    backgroundColor:'#353535',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '1%',
    borderRadius: 10,
    marginTop: '5%',
    borderWidth: 0.5,
    marginLeft: '1%'
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
