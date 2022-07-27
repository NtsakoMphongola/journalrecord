import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat//firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCmx3BWXhHfTC_zggeTR1vGobIz6q7jsEw",
    authDomain: "journal-voice.firebaseapp.com",
    projectId: "journal-voice",
    storageBucket: "journal-voice.appspot.com",
    messagingSenderId: "19502546613",
    appId: "1:19502546613:web:937f229b87b2bb7e8908fc"
}

if (!firebase.apps.length) {
         firebase.initializeApp(firebaseConfig);
}

// import * as React from 'react';
// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCmx3BWXhHfTC_zggeTR1vGobIz6q7jsEw",
//   authDomain: "journal-voice.firebaseapp.com",
//   projectId: "journal-voice",
//   storageBucket: "journal-voice.appspot.com",
//   messagingSenderId: "19502546613",
//   appId: "1:19502546613:web:937f229b87b2bb7e8908fc"
// };

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default () => {
//     return {firebase, auth}
// }