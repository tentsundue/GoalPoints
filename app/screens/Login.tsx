import { ActivityIndicator, Button, ImageBackground, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CONFIG_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = CONFIG_AUTH;
  
  const SignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Welcome Back!')
    } catch(error : any) {
      console.log(error);
      alert('Problem with Sign In: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const SignUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Success! Welcome to GoalPoints (Name Pending)')
    } catch(error : any) {
      console.log(error);
      alert('Sorry: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground source={require('../../assets/gradientbackground.jpg')} style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image source={require('../../assets/gplogo.png')} style={styles.logo}></Image>
        <View>
            <TextInput
             placeholder="Email"
             value={email}
             onChangeText={text => setEmail(text)}
             style={styles.input} 
            />
            <TextInput
             placeholder="Password"
             value={password}
             onChangeText={text => setPassword(text)}
             style={styles.input} 
             secureTextEntry={true}
            />
        </View>
        
        {/* if loading (means that user has attempted to login/register), display the loading indicator.
            else keep login and register buttons on display 
            NOTE: 'loading' is triggered upon SignIn() or SignUp()
        */}
        { loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => SignIn()} style={styles.button}>
                      <Text style={styles.buttonTextLogin}>Login</Text>
                  </TouchableOpacity>
                  <Text>OR</Text>
                  <TouchableOpacity onPress={() => SignUp()} style={[styles.button, styles.buttonOutline]}>
                      <Text style={styles.buttonTextRegister}>Register</Text>
                  </TouchableOpacity>
              </View>
              </>
            )}

      </KeyboardAvoidingView>
    </ImageBackground>

  )
}

export default Login

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },

  logo: {
    marginTop:-170,
    marginBottom:-150,

  },

  input: {
      height: 40,
      borderColor: 'black',
      paddingHorizontal: 100,
      paddingVertical: 10,
      borderWidth: 1.5,
      margin: 8,
      borderRadius: 4,
  },

  buttonContainer: {
      width:'60%',
      justifyContent:'center',
      alignItems: 'center',
      marginTop: 10,

  },

  button: {
      width: 250,
      padding: 15,
      margin: 8,
      borderRadius: 10,
      backgroundColor: 'black',
      alignItems:'center',
  },

  buttonOutline: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 2,
  },

  buttonTextLogin: {
      fontWeight: '700',
      color: 'white',
      fontSize: 15,
  },

  buttonTextRegister: {
      fontWeight: '700',
      fontSize: 15
  }

});