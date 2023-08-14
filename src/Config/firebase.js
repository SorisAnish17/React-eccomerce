// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdHINgSF0E0tmGllo1iy82FgGpJPr_bhg",
  authDomain: "eccomerce-d45fe.firebaseapp.com",
  projectId: "eccomerce-d45fe",
  storageBucket: "eccomerce-d45fe.appspot.com",
  messagingSenderId: "661932326221",
  appId: "1:661932326221:web:691c846530c5c56d4f8b04",
  measurementId: "G-8HYVW5CGZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
