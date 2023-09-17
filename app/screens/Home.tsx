import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { CONFIG_AUTH } from '../../firebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
  return (
    <ImageBackground source={require('../../assets/gradientbackground.jpg')} style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => CONFIG_AUTH.signOut()} style={styles.button}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Rewards')} style={styles.button}>
          <Text style={styles.text}>Rewards</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile Page')} style={styles.button}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
      </View>

      
    </ImageBackground>
 
  )
}

export default Home

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  buttonContainer: {
    flexDirection: 'row',    // This will align the buttons in a row
    justifyContent: 'space-around', // This will add some space between the buttons
    marginTop: -680
  },

  button:{
    width: 100,
    padding: 8,
    borderWidth: 2,
    borderColor: 'rgba(138, 48, 224, 0.47)',
    borderRadius: 8,
    margin: 50,
    marginLeft: 25,
    backgroundColor: 'rgba(138, 48, 224, 0.47)',
    shadowColor: '#A134F6',
    shadowOffset: {width: -4, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    alignItems: 'center'
  },

  text: {
    fontSize:20
  },


})