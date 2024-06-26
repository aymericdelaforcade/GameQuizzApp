import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { scale, verticalScale } from 'react-native-size-matters';

import SwipeableViews from 'react-swipeable-views-native/lib/SwipeableViews.scroll'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { PageIndicator } from 'react-native-page-indicator';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';




import * as XLSX from 'xlsx';
import { retry } from '@reduxjs/toolkit/query';

// Attention, enlever la vérification des majuscules !!

//Tiny 5 font

export default function NormalPlay({navigation}) {

  const [jeuActuel, setjeuActuel] = useState(0);
  const [Cross1Opacity, setCross1Opacity] = useState(0)
  const [Cross2Opacity, setCross2Opacity] = useState(0)
  const [Cross3Opacity, setCross3Opacity] = useState(0)
  const intervalRef = useRef(null);
  const [currentPage, setcurrentPage] = useState(0)

  const [GameInput, setGameInput] = useState('')

  const [ImageisLoad, setImageisLoad] = useState(false)

  const [Timer, setTimer] = useState(50) //Tous les state du Timer
  const [TimerText, setTimerText] = useState(50)
  const [Entre10et0sec, setEntre10et0sec] = useState(null) //pour rajouter un 0 pour l'affichage

  const [NombreJeualaSuite, setNombreJeualaSuite] = useState(0)
  const [RevelationJeu, setRevelationJeu] = useState(0) //Opacity du texte en bas là
  const [ImageOpacity, setImageOpacity] = useState(1) //Opacity de l'image du jeu
  const [DeafeatScreen, setDefeatScreen] = useState(false)
  const [BonGuessCheck, setBonGuessCheck] = useState(false)
  const [Retry, setretry]  = useState(0) //permet de lancer le useEffect qui va regénérer l'aléatoirité des jeux

  const[Variablepourtest, setVariablepourtest] = useState(false)


  const [ListeNombreAleatoireState, setListeNombreAleatoireState] = useState([])
  const Basedonnéeconvertie = require('../assets/BaseDonnée1.json')
  const TailledeBasedonnée = Basedonnéeconvertie.length
  let ListeNombreAleatoire = []

  

  function GuessReussi(){
    setBonGuessCheck(true)
    Keyboard.dismiss()
    clearInterval(intervalRef.current);
    setTimer(0)
    setTimerText(0)
    setEntre10et0sec(0)
    setImageOpacity(0.6)
    setRevelationJeu(1)
    setGameInput('')
    setNombreJeualaSuite(ancien => ancien +1)
  }

  function GuessRaté(){ 
    setBonGuessCheck(false)
    Keyboard.dismiss()
    setTimer(0)
    setTimerText(0)
    setEntre10et0sec(0)
    setImageOpacity(0.6)
    setRevelationJeu(1)
    setGameInput('')
    clearInterval(intervalRef.current);
  }





  function TimerFunction () {

    intervalRef.current = setInterval(() => {
      if (Timer > 0){
        setTimer(Timer => Timer - 0.5);
      }
    }, 500);

    intervalRef.current = setInterval(() => {
      setTimerText(prevTimer => {
        if (prevTimer > 0) {
          if (prevTimer < 11){
            setEntre10et0sec(0)
          }
          return prevTimer - 1;
        } else {
          GuessRaté()
          //clearInterval(intervalRef.current);
          return 0;
        }
      });
    }, 1000);
  }

  function NextGame(){
    if (BonGuessCheck == false){
      setDefeatScreen(true)
      
    }else{
      setcurrentPage(0)
      setBonGuessCheck(false)
      setDefeatScreen(false)
      setImageOpacity(1)
      setRevelationJeu(0)
      clearInterval(intervalRef.current);
      setCross1Opacity(0)
      setCross2Opacity(0)
      setCross3Opacity(0)
      setjeuActuel(jeuActuel => jeuActuel + 1)
      setTimer(50)
      setTimerText(50)
      setEntre10et0sec(null)
      TimerFunction()
      
    }
  }

  useEffect(() => {  //codé lancé au unmount de l'écran (retour arrière) pour pas, si on revient dessus, provoquer de bugs
    return () => {
      setImageisLoad(false)
  }
  },[])

  function ContinueFunction (){
    setcurrentPage(0)
    setjeuActuel(jeuActuel => jeuActuel + 1)
    setBonGuessCheck(false)
    setDefeatScreen(false)
    setImageOpacity(1)
    setRevelationJeu(0)
    clearInterval(intervalRef.current);
    setCross1Opacity(0)
    setCross2Opacity(0)
    setCross3Opacity(0)
    setjeuActuel(0)
    setTimer(50)
    setTimerText(50)
    setEntre10et0sec(null)
    TimerFunction()  
  }

  function Retryfunction(){
    setImageisLoad(false)
    setNombreJeualaSuite(0)
    setcurrentPage(0)
    setretry(retry => retry + 1)
    setjeuActuel(0)
    setBonGuessCheck(false)
    setDefeatScreen(false)
    setImageOpacity(1)
    setRevelationJeu(0)
    clearInterval(intervalRef.current);
    setCross1Opacity(0)
    setCross2Opacity(0)
    setCross3Opacity(0)
    setjeuActuel(0)
    setTimer(50)
    setTimerText(50)
    setEntre10et0sec(null)
    TimerFunction()  
  }
  
  useEffect(() => {
    ListeNombreAleatoire = Array.from({ length: TailledeBasedonnée + 1 }, (v, k) => k); //code chat GPT qui permet de générer l'array de l'ordre des questions
    for (let i = ListeNombreAleatoire.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ListeNombreAleatoire[i], ListeNombreAleatoire[j]] = [ListeNombreAleatoire[j], ListeNombreAleatoire[i]];
    }

    setListeNombreAleatoireState(ListeNombreAleatoire)

    setImageisLoad(true)
    TimerFunction()

    setVariablepourtest(true)
  }, [Retry]);

  useEffect(() =>{
    if (Variablepourtest == true){
      // console.log('test d approche 3' + JSON.stringify(Basedonnéeconvertie[ListeNombreAleatoireState[jeuActuel]]['screenshots'][Math.floor(Math.random() * Basedonnéeconvertie[ListeNombreAleatoireState[jeuActuel]]['screenshots'].length)].image_id, null, 2) )
    }
  },[Variablepourtest])

  


  function BonJeuouPas () {

    const nomSimple = Basedonnéeconvertie[ListeNombreAleatoireState[jeuActuel]]['name'].toLowerCase().replace(/:/g, '')
    const BonJeuxSimples = nomSimple.split(' ').map(nom => nom.trim()).filter(nom => nom.length > 0);

    console.log(BonJeuxSimples + '  array bon jeux simples')

    const BonJeuxCompliqués = Basedonnéeconvertie[ListeNombreAleatoireState[jeuActuel]]['alternative_names'].map(nomDérivée => nomDérivée.name.toLowerCase().replace(/:/g, ''))
    //const BonJeuxCompliqués = nomCompliqué.split(' ').map(nom => nom.trim()).filter(nom => nom.length > 0);

    console.log(BonJeuxCompliqués + '  array bon jeux compliqués')

    GameInputArray = GameInput.split(' ').map(nom => nom.trim().toLowerCase()).filter(nom => nom.length > 0);

    console.log(GameInputArray + '  array game input')

    if (BonJeuxSimples.some(jeuxsimples => GameInputArray.includes(jeuxsimples)) ||
      BonJeuxCompliqués.some(jeuxcompliqué => GameInputArray.includes(jeuxcompliqué))
    ){
      GuessReussi()
    }else{
      if(Cross1Opacity == 0){
        setCross1Opacity(1)
      }else{
        if (Cross2Opacity == 0){
          setCross2Opacity(1)
        }else{
          if (Cross3Opacity == 0){
            setCross3Opacity(1)
            GuessRaté()
          }
        }
      }


    }
  }

  

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{marginBottom: '2%', color: 'white'}}>0:{Entre10et0sec}{TimerText}</Text>
          <Progress.Bar progress={Timer / 50} width={scale(100)} height={verticalScale(8)} style={{marginBottom: '7%', borderColor: 'grey'}} color='red'/>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 70 , fontFamily: 'SkiSilkscreen'}}>{NombreJeualaSuite}</Text>
            <Text style={{fontSize: 70 , fontFamily: 'SkiSilkscreen'}}>-</Text>
            <Text style={{fontSize: 70 , fontFamily: 'SkiSilkscreen', color: '#FFD700'}}>14</Text>
          </View>
        </View>
        <KeyboardAvoidingView enabled={false} style={styles.viewButtonMiddle}>
            {ImageisLoad && 
              <SwipeableViews style={styles.slideContainer} index={currentPage} onChangeIndex={(index) => {setcurrentPage(index)}}>
              {Basedonnéeconvertie[ListeNombreAleatoireState[jeuActuel]]['screenshots'].map((screenshot, index) => (
                <View key={index}>
                  <Image
                      source={{ uri: "https://images.igdb.com/igdb/image/upload/t_original/" + screenshot.image_id + ".jpg" }}
                      style={{ width: scale(340), height: verticalScale(170), marginBottom: '5%', borderRadius: 12, overflow: 'hidden' , opacity: ImageOpacity}} // Taille de l'image
                  />
                </View>))}
                </SwipeableViews>
              }
            {! ImageisLoad && <PacmanIndicator color='white' size={55} />}
            {ImageisLoad &&<PageIndicator style={{marginBottom: '14%'}} activeColor='#bb86fc' size={10} color='white' count={Basedonnéeconvertie[ListeNombreAleatoireState[jeuActuel]]['screenshots'].length} current={currentPage} />}
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
        </KeyboardAvoidingView>
        <View style={styles.bottomview}>
          <TouchableOpacity style={[styles.boutonSuivant, {opacity: RevelationJeu}]} onPress={() => NextGame()}>
            <Text style={{color: 'black'}}>Next</Text>
          </TouchableOpacity>
        </View>
        {ImageisLoad && <View style={styles.viewRevelationText}>
            <Text style={{opacity: RevelationJeu, fontSize: 35, textAlign: 'center', fontFamily:'Anton'}}>
              {Basedonnéeconvertie[ListeNombreAleatoireState[jeuActuel]]['name']}
            </Text>
            {BonGuessCheck && <Entypo name="check" color={'#7CFF00'} size={40} style={{opacity: RevelationJeu}}/>}
          </View>}
        <StatusBar style="auto" />
        { DeafeatScreen && <View style={styles.OverlayDefaite}>
          <Text style={{fontSize: 35, fontFamily: 'Anton'}}>Wrong Guess !</Text>
          <View style={styles.TouchableOpacityDeuxIconsWrongGuess}>
            <MaterialCommunityIcons name="cards-heart" color={'white'} size={50}  onPress={() => ContinueFunction()}/>
            <Ionicons name="refresh" color={'white'} size={50} onPress={() => Retryfunction()}/>
            <AntDesign name="arrowright" color={'white'} size={50} onPress={() => navigation.navigate('FinalScreenNormalPlay', {ListeNombreAleatoireState, jeuActuel})}/>
          </View>
          <View style={styles.TouchableOpacityTextWrongGuess}>
              <Text style={styles.troisTextDefeatScreen}>Continue</Text>
              <Text style={[styles.troisTextDefeatScreen, {marginLeft: '5%'}]}>Retry</Text>
              <Text style={styles.troisTextDefeatScreen}> View results</Text>
          </View>
        </View>}
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
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignItems: 'center'
  },

  boutonSuivant:{
    height: verticalScale(43),
    width: scale(260),
    backgroundColor:'#bb86fc',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '1%',
    marginTop: '10%',
    borderRadius: 10,
    borderWidth: 0.5,
  },

  viewRevelationText:{
    position: 'absolute', 
    top: '33%', 
    left:'15%',
    marginBottom: '15%',
    width: scale(250),
    height: verticalScale(150),
    justifyContent: 'center',
    alignItems:'center'
  },

  OverlayDefaite: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },

  TouchableOpacityDeuxIconsWrongGuess:{
    marginTop: '5%', 
    flexDirection: 'row', 
    width: scale(200), 
    justifyContent: 'space-evenly',
    paddingBottom: 0,
    marginBottom: 0
  },

  TouchableOpacityTextWrongGuess:{
    marginTop: '1%', 
    flexDirection: 'row', 
    width: scale(200), 
    justifyContent: 'space-evenly',
    paddingBottom: 0,
    marginBottom: 0
  },


  troisTextDefeatScreen:{
    fontSize: 10,
  }

});