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

const colAdmin = collection(db, "admins");

onSnapshot(colAdmin, (snapshot) => {
  let admin = [];
  snapshot.docs.forEach((use) => {
     admin.push({ ...use.data(), id: use.id });
  });
  console.log("Users ", admin);
});

////////-------------------    take object to add new Admin  -----------/////////
async function AddAdmin(admin) {
  let res = await addDoc(colAdmin, {
    uid: auth.currentUser.uid,
    name: admin.name,
    email: admin.email,
    image: "",
  });
  return res;
}

////////-------------------    get current Admin   -----------/////////
async function GetAdmin() {
  const adminid = auth.currentUser.uid;
  const admin = (await getDocs(query(colAdmin, where("uid", "==", adminid)))).docs;
  console.log("current User", { ...admin[0].data(), id: admin[0].id });
  return { ...admin[0].data(), id: admin[0].id };
}

////////-------------------    check current Admin  -----------/////////
async function checkAdmin(id) {
     const adminid = id;
     const admin = (await getDocs(query(colAdmin, where("uid", "==", adminid)))).docs;
     console.log("current User", { ...admin[0].data(), id: admin[0].id });
     return { ...admin[0].data(), id: admin[0].id };
   }
   


////////-------------------    Del account of Admin   -----------/////////
async function DelAdmin(admin) {
  const docRef = doc(colAdmin, admin.id);
  await deleteDoc(docRef);
  await deleteUser(auth.currentUser);
}

export { GetAdmin, AddAdmin, DelAdmin , checkAdmin};
