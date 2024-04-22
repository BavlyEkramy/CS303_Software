import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzQM64ovtl2cegNC6jLHOzHVyTkjh0TOM",
  authDomain: "fir-67fa3.firebaseapp.com",
  projectId: "fir-67fa3",
  storageBucket: "fir-67fa3.appspot.com",
  messagingSenderId: "658273225930",
  appId: "1:658273225930:web:c743e7c2cce0b9ec273833",
  measurementId: "G-MD6RMLX542",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  

export { app, db, auth };
