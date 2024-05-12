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
import { getChapters as getCh } from "./Courses";
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
  const u = await addDoc(colCart, {
    ...item,
    user,
  });

  const t = await getCh(item.id);
  t[0] = { ...t[0], isOpen: true };
  t[0].videos[0].isOpen = true;
  t.forEach(async (value) => {
    await addChapter(u.id, value);
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

async function IsExistInCart(id) {
  const uid = auth.currentUser.uid;
  const arr = await getCardItemsWithId(id);
  const u = [];
  arr.filter((value) => {
    if (value.user.uid == uid) {
      u.push(value);
    }
  });
  if (u.length !== 0) {
    return u[0];
  }
  return false;
}

async function GetCartForUser() {
  const id = auth.currentUser.uid;
  const arr = await getCardItems();
  const c = [];
  arr.map((value) => {
    if (value.user.uid == id) {
      c.push(value);
    }
  });
  console.log("GetCartForUser", c);
  return c;
}

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
  const docSnap = (await getDocs(q)).docs;
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
  GetCartForUser,
  IsExistInCart,
};
