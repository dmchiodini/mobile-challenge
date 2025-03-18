import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKWvRfjtqm30TOZhR1yAmKV7oTvgaPYSI",
  authDomain: "mobile-challenge-by-coodesh.firebaseapp.com",
  projectId: "mobile-challenge-by-coodesh",
  storageBucket: "mobile-challenge-by-coodesh.firebasestorage.app",
  messagingSenderId: "84533278494",
  appId: "1:84533278494:web:e7f65d05ae9ce8ed2d7b0f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth };
