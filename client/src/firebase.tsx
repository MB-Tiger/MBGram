import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCVSqcJlb2A6mLS5GosloSfEQORyuw3kRU",
    authDomain: "mbgram-d3916.firebaseapp.com",
    projectId: "mbgram-d3916",
    storageBucket: "mbgram-d3916.appspot.com",
    messagingSenderId: "552723191371",
    appId: "1:552723191371:web:55380e07ab6cdcb19c1fce",
  })
  .auth();
