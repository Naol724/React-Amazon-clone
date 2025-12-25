// firebase.js (Firebase v9 - correct)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOT-2clmH6MgKt108fUGV0XVb1FXuhPJw",
  authDomain: "clone-b2076.firebaseapp.com",
  projectId: "clone-b2076",
  storageBucket: "clone-b2076.appspot.com",
  messagingSenderId: "510631943790",
  appId: "1:510631943790:web:286258b04d11524efb507f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
