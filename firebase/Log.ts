import { auth, db } from "./Config";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  verifyPasswordResetCode,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log(user);
  } else {
    console.log("user doesn't exist");
  }
});

async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}

async function forgetPassword(email) {
  const cred = await sendPasswordResetEmail(auth, email);
  return cred;
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function logout() {
  await signOut(auth);
}

async function getUserUId() {
  if (auth.currentUser != null) {
    return auth.currentUser.uid;
  } else {
    return null;
  }
}

export { register, login, forgetPassword, logout, getUserUId };
