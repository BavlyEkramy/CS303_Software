import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiCQ0yXz7fd55czzku2Z9dbhZIcs5jhaE",
  authDomain: "project-cs303.firebaseapp.com",
  projectId: "project-cs303",
  storageBucket: "project-cs303.appspot.com",
  messagingSenderId: "308275545245",
  appId: "1:308275545245:web:752385287ae6b003bcc074",
  measurementId: "G-FZRPKMV1Y8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  

export { app, db, auth };
