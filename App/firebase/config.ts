// config.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAlif0HtxQps-q8-W-rYmhjOeYnX_wLqR0",
    authDomain: "vietanh-38a14.firebaseapp.com",
    databaseURL: "https://vietanh-38a14-default-rtdb.firebaseio.com",
    projectId: "vietanh-38a14",
    storageBucket: "vietanh-38a14.appspot.com",
    messagingSenderId: "1051530777638",
    appId: "1:1051530777638:web:470493e08a798cf86302e7",
    measurementId: "G-FL9KF0Y0QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, database, storage, firestore }; 