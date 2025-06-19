// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs8y-I2AgHWoZehX8VCQlXDsRq_ShNFtA",
  authDomain: "netflixgpt-d45fc.firebaseapp.com",
  projectId: "netflixgpt-d45fc",
  storageBucket: "netflixgpt-d45fc.firebasestorage.app",
  messagingSenderId: "932288108612",
  appId: "1:932288108612:web:f71f06e9d50851e2d8c411",
  measurementId: "G-G3FYB0NRCC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
