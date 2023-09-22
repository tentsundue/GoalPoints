import { Button, FlatList, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { CONFIG_AUTH, CONFIG_DB } from '../../firebaseConfig';
import GoalsEntry from './GoalsEntry';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import RewardsEntry from './RewardsEntry';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Rewards = ({ navigation }: RouterProps) => {
  const [reward, setReward] = useState(""); // 'goals' initialized as a empty object
  const [rewardsArray, setRewardsArray] = useState<Array<{ text: string, points: number}>>([]); // 'RewardsArray' initialized as an empty array
  const [userPoints, setUserPoints] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const flatListRef = useRef<FlatList<any>>(null);
  const pts = getRandomInt(50, 250);
  const userId = CONFIG_AUTH.currentUser?.uid;


const handleAddRewards = () => {
  // if the goal being added is not an empty string, it is appended to the current rewardsArray
  if (reward.trim()) {
    setRewardsArray([...rewardsArray, {text: reward, points: pts}]);
    setReward(""); // Resets the 'goal' input after adding the goal to the array
    flatListRef.current?.scrollToEnd({ animated: true });
  }
}
const handleRedeemReward = async (index: number) => {
  let rewardCost = rewardsArray[index].points;
  if (userId) {
    const userDocRef = doc(CONFIG_DB, 'users', userId); // create a reference to a document in the Firestore db where the user's data is stored
    const userDoc = await getDoc(userDocRef); // retrieves the user's document from Firestore | fetching data from Firestore is asynchronous (hence 'await')
    let currentPoints = userDoc.data()?.points || 0;
    if (currentPoints < rewardCost) {
      alert("Sorry not enough points :(");
    } else {
      currentPoints -= rewardCost;
      let rewardsCopy = [...rewardsArray];
      rewardsCopy.splice(index, 1); // removes the item at index in the rewardsArray
      setRewardsArray(rewardsCopy); // Reestablishes the new rewardsArray as the copy which doesn't contain the completed goal
      await setDoc(userDocRef, { points: currentPoints }, { merge: true });
    }
    setLastUpdated(Date.now()); 
  }
}

const handleRetrievePoints = async() => {
  if (userId) {
    const userDocRef = doc(CONFIG_DB, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    setUserPoints(userDoc.data()?.points);
  }
}

// Used for every time Rewards Screen comes into focus
useFocusEffect(
  // useCallback() remembers the result of a function call instead of re-running it every time (AKA it memoizes)
  React.useCallback(() => {
    // Only retrieves points when lastUpdated changes (it only changes when a reward is redeemed)
    handleRetrievePoints();
  }, [lastUpdated])
);

  return (
    <ImageBackground source={require('../../assets/rewardsBackground.jpeg')} style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => CONFIG_AUTH.signOut()} style={styles.button}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home Page')} style={styles.button}>
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile Page')} style={styles.button}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lineDivisor}>

      </View>

      <View style={styles.totalPoints}>
        <Text style={styles.totalPointsText}>Total Points: {userPoints}</Text>
      </View>

      <View style={{flex: 1}}>
        {/* Lists of goals, each GoalsEntry component is an entry in a list of goals set by the user*/}
        <FlatList 
          ref={flatListRef}
          data={ rewardsArray }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleRedeemReward(index)}>
              <RewardsEntry key={index.toString()} text={item["text"]} points={item["points"]}/>
            </TouchableOpacity>
          )}
        />
      </View>
 
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.GoalsWrapper}>
        <TextInput 
          placeholder='Add a Reward Here!'
          style={styles.GoalInputText}
          onChangeText={text => setReward(text)}
          value={reward}
        />

        <TouchableOpacity onPress={() => handleAddRewards()}>
          <View style={styles.AddGoalWrapper}>
            <Text style={styles.AddGoal}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </ImageBackground>
 
  )
}

export default Rewards

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  buttonContainer: {
    flexDirection: 'row',    // This will align the buttons in a row
    justifyContent: 'space-around', // This will add some space between the buttons
    marginTop: 15
  },
  
  lineDivisor: {
    borderWidth: 1,
    borderColor: 'black',
    width: 300,
    marginTop: -30,
    marginBottom: 10,
    opacity: 0.4,
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
    fontSize:20,
  },

  totalPoints: {
    alignItems: 'center',
    marginBottom: 15,
  },

  totalPointsText: {
    fontSize: 25
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