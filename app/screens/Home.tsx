import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { CONFIG_AUTH } from '../../firebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
  return (
    <View style={styles.signOut}>
    <Button onPress={() => navigation.navigate('Profile Page')} title="Profile" />
      <Button onPress={() => CONFIG_AUTH.signOut()} title="Sign Out"/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    signOut: {
        marginLeft: 300
    },

})