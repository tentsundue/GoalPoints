import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import Profile from './app/screens/Profile';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { CONFIG_AUTH } from './firebaseConfig';
import Rewards from './app/screens/Rewards';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  // Holds all other screens after user successfully signs in
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home Page" component={Home} options={{ headerShown: false }}></InsideStack.Screen>
      <InsideStack.Screen name="Profile Page" component={Profile} options={{ headerShown: false }}></InsideStack.Screen>
      <InsideStack.Screen name="Rewards" component={Rewards} options={{ headerShown: false }}></InsideStack.Screen>
    </InsideStack.Navigator>
  )
}
export default function App() {
  const [user, setUser] = useState<User | null>(null) // useState type can be either the User object or null (hence: <User | null>)
  
  useEffect(() => {
    onAuthStateChanged(CONFIG_AUTH, (user) => {
      // Triggers whenever the user changes in the app
      console.log('USER:', user);
      setUser(user); // Set up as an object so that we can use the user
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* If the user is authenticated/registered already, transition into home page */}
        {user ? (
        <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
        ) : (
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )} 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
