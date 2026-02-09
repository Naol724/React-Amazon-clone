// firebase.js (Firebase v9 - correct)

import  firebase  from "firebase/compat/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDOT-2clmH6MgKt108fUGV0XVb1FXuhPJw",
  authDomain: "clone-b2076.firebaseapp.com",
  projectId: "clone-b2076",
  storageBucket: "clone-b2076.appspot.com",
  messagingSenderId: "510631943790",
  appId: "1:510631943790:web:286258b04d11524efb507f"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = app.firestore();
