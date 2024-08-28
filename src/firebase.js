import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD5aSPBOdUL_sfdg3o4_Hn9bLJi7llt0NA",
  authDomain: "clone-instagram-236ff.firebaseapp.com",
  projectId: "clone-instagram-236ff",
  storageBucket: "clone-instagram-236ff.appspot.com",
  messagingSenderId: "443081589636",
  appId: "1:443081589636:web:f0d5c760a91bea07d453d1",
  measurementId: "G-82W9E20F36",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export { db, auth, storage, functions };
