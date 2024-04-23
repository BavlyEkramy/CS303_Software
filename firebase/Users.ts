import { deleteUser } from "firebase/auth";
import { auth, db } from "./Config";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const colUser = collection(db, "users");

onSnapshot(colUser, (snapshot) => {
  let user = [];
  snapshot.docs.forEach((use) => {
    user.push({ ...use.data(), id: use.id });
  });
  console.log("Users ", user);
});

////////-------------------    take object to add new user  -----------/////////
async function AddUser(user) {
  let res = await addDoc(colUser, {
    uid: auth.currentUser.uid,
    name: user.name,
    email: user.email,
    image: "",
  });
  return res;
}

////////-------------------    get current user   -----------/////////
async function GetUser() {
  const userid = auth.currentUser.uid;
  const user = (await getDocs(query(colUser, where("uid", "==", userid)))).docs;
  console.log("current User", { ...user[0].data(), id: user[0].id });
  return { ...user[0].data(), id: user[0].id };
}

////////-------------------    Del account of user   -----------/////////
async function DelUser(user) {
  const docRef = doc(colUser, user.id);
  await deleteDoc(docRef);
  await deleteUser(auth.currentUser);
}

export { GetUser, AddUser, DelUser };
