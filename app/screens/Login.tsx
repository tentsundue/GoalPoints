import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
      alert('Please Work...')
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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

        { loading ? (
              <ActivityIndicator size="large" color="0000ff" />
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
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },

  input: {
      height: 40,
      borderColor: 'gray',
      paddingHorizontal: 100,
      paddingVertical: 10,
      borderWidth: 1,
      margin: 8,
      borderRadius: 4,
  },

  buttonContainer: {
      width:'60%',
      justifyContent:'center',
      alignItems: 'center',
      marginTop: 40,

  },

  button: {
      width: '100%',
      padding: 15,
      margin: 8,
      borderRadius: 10,
      backgroundColor: '#89CFF0',
      alignItems:'center',
  },

  buttonOutline: {
      backgroundColor: 'white',
      borderColor: '#89CFF0',
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