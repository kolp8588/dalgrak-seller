import firebase from "firebase";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDkrM-XREwwcjb9H0MpfIj51yipgbBSw_s",
    authDomain: "dalgrak-seller.firebaseapp.com",
    databaseURL: "https://dalgrak-seller.firebaseio.com",
    projectId: "dalgrak-seller",
    storageBucket: "dalgrak-seller.appspot.com",
    messagingSenderId: "sender-id",
    appId: "1:799616121424:android:73cf9fcde51da2b6f82f55",
    measurementId: "G-measurement-id"
  };

const SECONDARY_FIREBASE_CONFIG = {
    apiKey: "AIzaSyAhovGC4_w4Fl8TjR4dqE6gQVV4ei82PvY",
    authDomain: "dalgrak-7c604.firebaseapp.com",
    databaseURL: "https://dalgrak-7c604.firebaseio.com",
    projectId: "dalgrak-7c604",
    storageBucket: "dalgrak-7c604.appspot.com",
    messagingSenderId: "sender-id",
    appId: "1:799616121424:android:73cf9fcde51da2b6f82f55",
    measurementId: "G-measurement-id"
  };
  
export const sellerApp = firebase.initializeApp(FIREBASE_CONFIG)
export const secondaryApp = firebase.initializeApp(SECONDARY_FIREBASE_CONFIG, "secondary")