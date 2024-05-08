import { db , auth } from "./Config";
import { addDoc, collection, getDocs, setDoc, onSnapshot, deleteDoc, doc, query, where,  updateDoc} from "firebase/firestore";
import { GetUser  } from "./Users";

var s = auth.currentUser != null ? auth.currentUser.email.split("@")[0] + "Cart" : "User" ;




/* -------------------    get current user   --------------------- */
if (s) {
     const colUser = collection(db, s);
     onSnapshot(colUser, (snapshot) => {
       let user = [];
       snapshot.docs.forEach((use) => {
         user.push({ ...use.data(), id: use.id });
       });
       console.log("Users ", user);
     });
}


  /* -------------------    delete item -----------*/
async function deleteItemsCards(id){
     if(s) try{
          await deleteDoc(doc(db, s, id));
          console.log("deleted ");
     }catch(err){
          console.log("Error in deleting", err);
     }
}
  /* -------------------    take object to add new item  -----------*/
 async function AddItemsCards(item){
     if(s) try{
          await addDoc(collection(db, s), item);
          console.log("added" );
     }catch(err){
          console.log("Error in adding", err);
     }
}
  /* -------------------    get items    -----------*/
async function getCardItems(){
     if(s) try{
          const collectionRef = collection(db, s);
          const querySnapshot = await getDocs(collectionRef);
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
          })
     }catch(error){
          console.error("Error Fetching data: ", error);
     }
}
  /* -------------------    edit item  -----------*/
async function editCard(card){
     if(s) try{
          const docRef = doc(db, s, card.id);
          await updateDoc(docRef, card);
          console.log("edited" );
     }
     catch(err){
          console.log("Error in editing", err);
     }
}


  /* -------------------    subscribe  -----------*/
async function subscribe(callback){
     if(s) try{
          const collectionRef = collection(db, s);
          onSnapshot(collectionRef, callback);
     }
     catch(err){
          console.log("Error in subscribing", err);
     }
}

export {getCardItems,deleteItemsCards,AddItemsCards,subscribe,editCard};