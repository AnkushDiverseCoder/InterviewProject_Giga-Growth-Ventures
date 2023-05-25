// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "gigagrowthventures.firebaseapp.com",
  projectId: "gigagrowthventures",
  storageBucket: "gigagrowthventures.appspot.com",
  messagingSenderId: "782252927103",
  appId: "1:782252927103:web:7e9ea882ed149b1b75374a"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

