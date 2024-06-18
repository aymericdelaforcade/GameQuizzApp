import AntDesign from 'react-native-vector-icons/AntDesign'

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';

export default function FinalScreenNormalPlay({ route, navigation }) {

  const argumentsArrivée = route.params
  const ListeJeuTrouveOrdre = argumentsArrivée['ListeNombreAleatoireState']
  const JeuMaxTrouvé = argumentsArrivée['jeuActuel']

  const [nbJeuxTrouvés, setnbJeuxTrouvés]  = useState(0)
  const [AucunjeuTrouvéState, setAucunjeuTrouvéState] = useState(false)

  const ListeJeuTrouveCoupée = ListeJeuTrouveOrdre.slice(0,JeuMaxTrouvé)
  const Basedonnéeconvertie = require('../assets/BaseDonnée1.json')

  useEffect(() => {
    setnbJeuxTrouvés(ListeJeuTrouveCoupée.length)
    if (ListeJeuTrouveCoupée.length == 0){
      setAucunjeuTrouvéState(true)
    }
  },[])

  const renderItem = ({item}) => { //Ce que rend la flat list qui gère la liste des matière

    const jeuActuelTrouvé = Basedonnéeconvertie[item]['name']

      return(
      <View style={{flexDirection: 'row', width: scale(350), backgroundColor: '#474747', padding: '1%', paddingTop: '2%', marginTop: '2%'}}>
          <View style={{ flex: 1}}>
            <Image
                source={{ uri: "https://images.igdb.com/igdb/image/upload/t_original/" + Basedonnéeconvertie[item]['screenshots'][0] + ".jpg"}}
                style={{ width: scale(180), height: verticalScale(110), marginBottom: '5%', borderRadius: 12, marginTop: '2%'}} // Taille de l'image
            />
          </View>
          <View style={{alignItems: 'center', justifyContent: 'flex-start', flex: 0.8}}>
            <View style={{flex: 10}}>
              <Text style={{fontFamily:'PoppinsBlack', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginBottom: '7%'}}>{Basedonnéeconvertie[item]['name']}</Text>
            </View>
            <View style={styles.viewStudioetDateJeu}>
              <Text style={{fontFamily:'PoppinsBlack', fontWeight: 'bold', fontSize: 17, lineHeight: 19}}>Sudio:</Text>
              <Text style={{fontFamily:'PoppinsBlack'}}>{Basedonnéeconvertie[item]['release_dates'][0].y}</Text>
            </View>
            <View style={styles.viewStudioetDateJeu}>
              <Text style={{fontFamily:'PoppinsBlack', fontWeight: 'bold', fontSize: 17, lineHeight: 21}}>Date:</Text>
              <Text style={{fontFamily:'PoppinsBlack'}}>{Basedonnéeconvertie[item]['release_dates'][0].y}</Text>
            </View>
            <View style={[styles.viewStudioetDateJeu,  {marginBottom: '18%'}]}>
              <Text style={{fontFamily:'PoppinsBlack', fontWeight: 'bold', fontSize: 17, lineHeight: 21}}>Genre:</Text>
              <Text style={{fontFamily:'PoppinsBlack'}} numberOfLines={2} adjustsFontSizeToFit={true}>{Basedonnéeconvertie[item]['screenshots'][0].y}</Text>
            </View>
          </View>

        
      </View>
    )
  }


  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <AntDesign name="arrowleft" color={'white'} size={35} onPress={() => navigation.navigate('GameScreenChoice')}/>
            <Text style={{fontSize: 25, lineHeight: 40, marginRight: '14%'}}>Game Found: {nbJeuxTrouvés}</Text>
        </View>

        <View style={styles.viewButtonMiddle}>
          {AucunjeuTrouvéState && <Text style={{marginTop: '2%'}}>No game found</Text>}
          <FlatList data={ListeJeuTrouveCoupée} renderItem={renderItem}/>
        </View>
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
    backgroundColor: 'grey',
    flex: 0.2,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: '2%',
    flexDirection: 'row'
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
    marginTop:'2%'
  },

  bottomview: {
    flex: 1
  },

  viewStudioetDateJeu:{
    flexDirection: 'row', 
    flex: 2, 
    width: scale(150),
    justifyContent: 'space-between',
    marginRight: '8%'
  }
});
