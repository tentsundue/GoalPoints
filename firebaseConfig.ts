// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGjTngE7XF6PKkBS6ICF0Tdr8VIpXMX8Y",
  authDomain: "goalpoints-17b86.firebaseapp.com",
  projectId: "goalpoints-17b86",
  storageBucket: "goalpoints-17b86.appspot.com",
  messagingSenderId: "912239409207",
  appId: "1:912239409207:web:6a8b1878b3cc23e422a7b2",
  measurementId: "G-GD1T9BV6M3"
};


export const CONFIG_APP = initializeApp(firebaseConfig); // Initialize app
export const CONFIG_AUTH = getAuth(CONFIG_APP); // initialize user authentication
export const CONFIG_DB = getFirestore(CONFIG_APP); // initialuze database to store points


export const analytics = getAnalytics(CONFIG_APP); // Might use in the future?