import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCMCSJcjJmKU3mhiPvXthHZ7bD_HJp6Nmc",
    authDomain: "new-gifty.firebaseapp.com",
    projectId: "new-gifty",
    storageBucket: "new-gifty.appspot.com",
    messagingSenderId: "834185582074",
    appId: "1:834185582074:web:98a6e0d7d548a0ab1f0043"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app)

export {db};
export default firebase;
export {auth};
export {storage}