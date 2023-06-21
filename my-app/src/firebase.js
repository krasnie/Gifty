import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAIFCT6x0yvQQ8Kfw144em8Ivc1kfWH0tk",
    authDomain: "gifty-170d8.firebaseapp.com",
    projectId: "gifty-170d8",
    storageBucket: "gifty-170d8.appspot.com",
    messagingSenderId: "975326850077",
    appId: "1:975326850077:web:672636add178db559e6af4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {db};
export default firebase;
export {auth};