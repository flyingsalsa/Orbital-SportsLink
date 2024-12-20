// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "sample.link.com",
  databaseURL: "sample.link.com",
  projectId: "ID sample",
  storageBucket: "ssample.link.com",
  messagingSenderId: "123456",
  appId: "AppID",
  measurementId: "Measurement ID"
};

// Initialize Firebase
export const FB_APP = initializeApp(firebaseConfig);
export const FB_AUTH = getAuth(FB_APP);
const FB_ANA = getAnalytics(FB_APP);
export const db = getFirestore(FB_APP);