import {
     addDoc,
     collection,
     getDocs,
     getFirestore,
     setDoc,
     doc,
     query,
     where,
     onSnapshot,
     deleteDoc,
   } from "firebase/firestore";
   import { app, db } from "./Config";
   const firestoreDB = getFirestore(app);

   const fetchData = async () => {
        try {
          const collectionRef = collection(firestoreDB, "posts");
          const querySnapshot = await getDocs(collectionRef);
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
          })
        } catch (error) {
          console.error("Error Fetching data: ", error);
        }
   };

   export { fetchData };