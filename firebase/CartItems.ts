import { auth, db } from "./Config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const colCart = collection(db, "Carts");

/* -------------------    get current user   --------------------- */
onSnapshot(colCart, (snapshot) => {
  let user = [];
  snapshot.docs.forEach((use) => {
    user.push({ ...use.data(), id: use.id });
  });
  console.log("Carts ", user);
});

// /* -------------------    delete item  ---------------*/
async function deleteItemsCards(id) {
  try {
    const d = await doc(colCart, id);
    await deleteDoc(d);
    console.log("deleted cart with id", id);
  } catch (err) {
    console.log("Error in deleting", err);
  }
}
/* -------------------    take object item and object user to add new item  -----------*/

async function AddItemsCards(item, user) {
  await addDoc(colCart, {
    ...item,
    user,
  });
}

// /* -------------------    get items    -----------*/
async function getCardItems() {
  try {
    const querySnapshot = (await getDocs(colCart)).docs;
    const cart = [];
    querySnapshot.forEach((doc) => {
      cart.push({ cartId: doc.id, ...doc.data() });
    });
    return cart;
  } catch (error) {
    console.error("Error Fetching data: ", error);
  }
}
// /* -------------------    edit item  -----------*/
async function editCard(card) {
  try {
    const docRef = doc(colCart, card.cartId);
    await updateDoc(docRef, card);
    console.log("edited");
  } catch (err) {
    console.log("Error in editing", err);
  }
}

// /* -------------------    get item With id -----------*/

async function getCardItemsWithId(id) {
  try {
    const q = query(colCart, where("id", "==", id));
    const querySnapshot = (await getDocs(q)).docs;
    const cart = [];
    querySnapshot.forEach((doc) => {
      cart.push({ cartId: doc.id, ...doc.data() });
    });
    return cart;
  } catch (error) {
    console.error("Error Fetching data: ", error);
  }
}

// /* -------------------    subscribe  -----------*/
// async function subscribe() {
//   const t = () =>
//     onSnapshot(colCart, (snapshot) => {
//       let cart = [];
//       snapshot.docs.forEach((use) => {
//         cart.push({ ...use.data(), id: use.id });
//       });
//       return cart;
//     });
//   return t();
// }
////////////////////////////////////////////////////////////////////////////////////////////////

// ////////-------------------  add Chapter take id of cart and object  -----------/////////

async function addChapter(idCart, ch) {
  const coll = collection(db, `Carts/${idCart}/Chapter`);
  let res = await addDoc(coll, {
    ...ch,
  });
  return res;
}

// ////////------------------- get all Chapters   take id of cart -----------/////////

async function getChapters(idCart) {
  const coll = collection(db, `Carts/${idCart}/Chapter`);
  const q = query(coll, orderBy("time"));
  const docSnap = (await getDocs(coll)).docs;
  const All = [];
  docSnap.forEach((m) => {
    All.push({ ...m.data(), chId: m.id });
  });
  return All;
}

// ////////-------------------  add Chapter take id of cart and object  -----------/////////

async function updateChapter(idCart, item) {
  const coll = collection(db, `Carts/${idCart}/Chapter`);
  const docRef = doc(coll, item.chId);
  await updateDoc(docRef, item);
}

// ////////-------------------  del Chapter take id of cart and id of Chapter -----------/////////
async function delChapter(idCart, chId) {
  const coll = collection(db, `Carts/${idCart}/Chapter`);
  const docRef = doc(coll, chId);
  await deleteDoc(docRef);
}

export {
  AddItemsCards,
  getCardItems,
  deleteItemsCards,
  editCard,
  addChapter,
  delChapter,
  updateChapter,
  getChapters,
  getCardItemsWithId,
};
