// Firebase configuration for Al Mazloum Stud
// Note: this apiKey is a public client identifier — safe to ship in the bundle.
// All sensitive access is enforced via Firebase Security Rules (Firestore + Storage)
// and Firebase Authentication for the admin area.

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqWFVqM7akVvnBiqEgVaZHZ-jL1C0Vl3U",
  authDomain: "al-mazloum-stud.firebaseapp.com",
  projectId: "al-mazloum-stud",
  storageBucket: "al-mazloum-stud.firebasestorage.app",
  messagingSenderId: "628827437223",
  appId: "1:628827437223:web:efc37a0f0be6fce9954382",
};

// Avoid re-initializing during HMR
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;
