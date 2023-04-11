// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrkS1GtVagLkovTw3J45TL8wz9J0aof6E",
  authDomain: "chatapp-15280.firebaseapp.com",
  projectId: "chatapp-15280",
  storageBucket: "chatapp-15280.appspot.com",
  messagingSenderId: "851350836146",
  appId: "1:851350836146:web:2b9b551db94fd5753ccaab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);