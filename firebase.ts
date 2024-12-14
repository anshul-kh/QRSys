// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWFCxLCOUL1e4KJAg4_Z_2zvBoeTHTT0U",
  authDomain: "qrsys-eeb28.firebaseapp.com",
  projectId: "qrsys-eeb28",
  storageBucket: "qrsys-eeb28.firebasestorage.app",
  messagingSenderId: "903114849161",
  appId: "1:903114849161:web:526e24e6c21114f7223f58",
  measurementId: "G-6W4FR8Y616"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app)
export {app,db}