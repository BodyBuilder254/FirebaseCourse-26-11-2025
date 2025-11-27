
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNsmkl3HbcNPrZqFyMlmM3NpIG94mTlCM",
  authDomain: "fir-course-24725.firebaseapp.com",
  projectId: "fir-course-24725",
  storageBucket: "fir-course-24725.firebasestorage.app",
  messagingSenderId: "1070278682254",
  appId: "1:1070278682254:web:e02529571c33df087f8bdf",
  measurementId: "G-3D7THHJBSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getFirestore(app); 
export const storage = getStorage(app);
