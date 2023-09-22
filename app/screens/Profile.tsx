import { ImageBackground, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { CONFIG_AUTH, CONFIG_DB } from '../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const Profile = ({ navigation }: RouterProps) => {

  const userId = CONFIG_AUTH.currentUser?.uid;
  const [username, setUsername] = useState<string>('');
  const [realName, setRealname] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');

  const [editableName, setEditableName] = useState<boolean>(true);
  const [editableUsername, setEditableUsername] = useState<boolean>(true);
  const [editableBio, setEditableBio] = useState<boolean>(true);
  const [hasPFP, setPFPState] = useState<boolean>(false);
  

  const handleChangePFP = async () => {
    setPFPState(true)
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    // console.log(JSON.stringify(image)); // to make sure the image uri is accepted
    if (image.assets) {
      setSelectedImage(image['assets'][0]['uri']);
      console.log(selectedImage);
    }
    
  }

  const handleSaveName = async () => {
    setRealname(realName);
    setEditableName(false);
    if (userId) {
      const userDocRef = doc(CONFIG_DB, 'users', userId); // create a reference to a document in the Firestore db where the user's data is stored
      const userDoc = await getDoc(userDocRef); // retrieves the user's document from Firestore | fetching data from Firestore is asynchronous (hence 'await')
      await setDoc(userDocRef, { name: realName }, { merge: true });
    }
  }

  const handleSaveUsername = async () => {
    setUsername(username);
    setEditableUsername(false);
    if (userId) {
      const userDocRef = doc(CONFIG_DB, 'users', userId); // create a reference to a document in the Firestore db where the user's data is stored
      const userDoc = await getDoc(userDocRef); // retrieves the user's document from Firestore | fetching data from Firestore is asynchronous (hence 'await')
      await setDoc(userDocRef, { username: username }, { merge: true });
    }
  }
  const handleSaveBio = async () => {
    setBio(realName);
    setEditableBio(false);
    if (userId) {
      const userDocRef = doc(CONFIG_DB, 'users', userId); // create a reference to a document in the Firestore db where the user's data is stored
      const userDoc = await getDoc(userDocRef); // retrieves the user's document from Firestore | fetching data from Firestore is asynchronous (hence 'await')
      await setDoc(userDocRef, { userBio: bio }, { merge: true });
    }
  }

  return (
    <ImageBackground source={require('../../assets/profileBackground.jpeg')} style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => CONFIG_AUTH.signOut()} style={styles.button}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Rewards')} style={styles.button}>
          <Text style={styles.text}>Rewards</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home Page')} style={styles.button}>
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.UserPfpBox}>
        {!hasPFP ? (
            <>
              <TouchableOpacity onPress={() => handleChangePFP()}>
                <Image source={require('../../assets/emptyProfileIcon.png')} style={styles.UserPfp}></Image>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.uploadButton} onPress={() => handleChangePFP()}>
                <Image source={{uri: selectedImage}} style={styles.UserPfp}></Image>
              </TouchableOpacity>
            </>
          )
        }
      </View>
      <View style={styles.UserInfoContainer}>
        <View style={styles.nameInputBox}>
          {/* If editable var is true, then make text box editable, else keep as view only */}
          {editableUsername ? (
            <>
              <TextInput
              placeholder= ' Enter your Username'
              style={styles.nameText}
              onChangeText={text => setRealname(text)}
              value={realName}
              />
              <TouchableOpacity style={styles.confirmation} onPress={() => handleSaveUsername()}>
                <Text style={styles.text}>OK</Text>
              </TouchableOpacity>
            </>
            ) : (
              <>
                <Text style={styles.nameText}>{username || ' Username'}</Text>
                <TouchableOpacity style={styles.editBox} onPress={() => setEditableName(true)}>
                  <Image source={require('../../assets/editIcon.png')} style={styles.editBox}></Image>
                </TouchableOpacity>
              </>
            )
          }
        </View>

        <View style={styles.nameInputBox}>
          {/* If editable var is true, then make text box editable, else keep as view only */}
          {editableName ? (
            <>
              <TextInput
              placeholder= ' Enter your name'
              style={styles.nameText}
              onChangeText={text => setRealname(text)}
              value={realName}
              />
              <TouchableOpacity style={styles.confirmation} onPress={() => handleSaveName()}>
                <Text style={styles.text}>OK</Text>
              </TouchableOpacity>
            </>
            ) : (
              <>
                <Text style={styles.nameText}>{realName || ' Name'}</Text>
                <TouchableOpacity style={styles.editBox} onPress={() => setEditableName(true)}>
                  <Image source={require('../../assets/editIcon.png')} style={styles.editBox}></Image>
                </TouchableOpacity>
              </>
            )
          }
        </View>

        <View style={styles.bioInputBox}>
          {/* If editable var is true, then make text box editable, else keep as view only */}
          {editableBio ? (
            <>
              <TextInput
              placeholder= ' Put your bio here!'
              style={styles.nameText}
              onChangeText={text => setUsername(text)}
              value={realName}
              />
              <TouchableOpacity style={styles.confirmation} onPress={() => handleSaveBio()}>
                <Text style={styles.text}>OK</Text>
              </TouchableOpacity>
            </>
            ) : (
              <>
                <Text style={styles.nameText}>{bio || ' Bio'}</Text>
                <TouchableOpacity style={styles.editBox} onPress={() => setEditableName(true)}>
                  <Image source={require('../../assets/editIcon.png')} style={styles.editBox}></Image>
                </TouchableOpacity>
              </>
            )
          }
        </View>
      </View>
    
    </ImageBackground>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonContainer: {
    flexDirection: 'row',    // This will align the buttons in a row
    justifyContent: 'space-around', // This will add some space between the buttons
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginLeft: 15
  },

  button: {
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
    fontSize: 20,
  },

  UserPfpBox: {
    marginTop: -100,
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 100,
    overflow: 'hidden',
  },

  uploadButton: {
    display:'flex',
    alignItems:"center",
    justifyContent:'center'
  },

  UserPfp: {
    width: 150,
    height: 150,
    marginLeft: 35,
    marginTop: 20,
  },

  UserInfoContainer: {
    marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center'
  },

  nameInputBox: {
    // position: 'absolute',
    // right: 60,
    // top:150,
    marginTop: 10,
    width: 200,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },

  nameText: {
    padding: 10,
    fontSize: 15,
  },

  editBox: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    right: -20,
  },

  confirmation: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: -50,
    top: -1,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    backgroundColor: '#5783db'

  },
  bioInputBox: {
    // position: 'absolute',
    // top: 230,
    // right: 60,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    width: 200,
    height: 170

  },

  // usernameInputBox: {
  //   // position: 'absolute',
  //   // top: 430,
  //   // right: 60,
  //   marginTop: 10,
  //   borderWidth: 2,
  //   borderColor: 'black',
  //   borderRadius: 10,
  //   width: 200,
  // },
  
})