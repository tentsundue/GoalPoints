import { Button, FlatList, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { CONFIG_AUTH } from '../../firebaseConfig';
import GoalsEntry from './GoalsEntry';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
  const [goal, setGoal] = useState(""); // 'goals' initialized as a empty object
  const [goalsArray, setGoalsArray] = useState<string[]>([]); // 'goalsArray' initialized as an empty array
  const flatListRef = useRef<FlatList<any>>(null);

  const handleAddGoal = () => {
    // if the goal being added is not an empty string, it is appended to the current goalsArray
    if (goal.trim()) {
      setGoalsArray([...goalsArray, goal]);
      setGoal(""); // Resets the 'goal' input after adding the goal to the array
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }
  const handleCompleteGoal = (index: number) => {

    let goalsCopy = [...goalsArray];
    goalsCopy.splice(index, 1); // removes the item at index in the goalsArray
    setGoalsArray(goalsCopy); // Reestablishes the new goalsArray as the copy which doesn't contain the completed goal
  }

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

      <View style={{flex: 1}}>
        {/* Lists of goals, each GoalsEntry component is an entry in a list of goals set by the user*/}
        <FlatList 
          ref={flatListRef}
          data={ goalsArray }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleCompleteGoal(index)}>
              <GoalsEntry key={index.toString()} text={item} />
            </TouchableOpacity>
          )}
        />


      </View>
      
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.GoalsWrapper}>
        <TextInput 
          placeholder='Add a Goal Here!'
          style={styles.GoalInputText}
          onChangeText={text => setGoal(text)}
          value={goal}
        />

        <TouchableOpacity onPress={() => handleAddGoal()}>
          <View style={styles.AddGoalWrapper}>
            <Text style={styles.AddGoal}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>
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
    marginTop: 0 // was -500
  },

  button:{
    width: 100,
    padding: 8,
    borderWidth: 2,
    borderColor: '#5783db',
    borderRadius: 10,
    margin: 50,
    marginLeft: 25,
    backgroundColor: 'transparent',
    shadowColor: '#5783db',
    shadowOffset: {width: -4, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: 'center'
  },

  text: {
    fontSize:20
  },

  GoalsWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
  },

  GoalInputText: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    marginLeft: 30
  },

  AddGoalWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    marginRight: 40,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    
  },

  AddGoal: {
    marginTop: 7,
    fontSize: 30,
    color: 'gray'
  },


})