import { useState } from "react";
import { db, auth } from "./Config";
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
  Timestamp,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

const colCourse = collection(db, "Courses");

onSnapshot(colCourse, (snapshot) => {
  let Courses = [];
  snapshot.docs.forEach((use) => {
    Courses.push({ ...use.data(), id: use.id });
  });
  console.log("All of courses ", Courses);
});

//////////-------------------    take object to add new course  -----------/////////
async function AddCourse(course, admin) {
  let res = await addDoc(colCourse, {
    ...course,
    admin: admin,
  });
  return res;
}
////////////-------------------    get current course   -----------/////////
async function GetCourses() {
  const course = (await getDocs(colCourse)).docs;
  const c = [];
  course.forEach((doc) => {
    c.push({ ...doc.data(), id: doc.id });
  });
  console.log(c);
  return c;
}

////////-------------------    Delete course   -----------////
async function DelCourse(course) {
  const docRef = doc(colCourse, course.id);
  await deleteDoc(docRef);
}

////////-------------------    update course take object for course  -----------////
async function updateCourse(course) {
  const docRef = doc(colCourse, course.id);
  await updateDoc(docRef, course);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////------------- add one chapter for course take course Id and object for chapter  -------------/////
async function addChapter(idCourse, ch) {
  const coll = collection(db, `Courses/${idCourse}/chapters`);
  ch.videos.forEach((video, index) => {
    ch.videos[index] = { ...video, isComleted: false, isOpen: false };
  });
  let res = await addDoc(coll, {
    ...ch,
    isComleted: false,
    isOpen: false,
  });
  return res;
}

//     -------------------    update chapter   -----------////
async function updateChapter(idCourse, c) {
  const coll = collection(db, `Courses/${idCourse}/chapters`);
  const docRef = doc(coll, c.id);
  await updateDoc(docRef, c);
}

//     -------------------    get chapters for course take course id   -----------////
async function getChapters(idCourse) {
  console.log(idCourse);

  const coll = collection(db, `Courses/${idCourse}/chapters`);
  const querySnapshot = (await getDocs(coll)).docs;
  let chapters = [];
  querySnapshot.forEach((doc) => {
    chapters.push({ ...doc.data(), id: doc.id });
  });
  console.log(chapters);
  return chapters;
}

////////-------------------    Delete chapter take id of course and id of chapter   -----------////
async function deleteChapter(idCourse, idChapter) {
  const coll = collection(db, `Courses/${idCourse}/chapters`);
  const docRef = doc(coll, idChapter);
  await deleteDoc(docRef);
}

function sup() {
  const yyyy = onSnapshot(colCourse, (snapshot) => {
    let user = [];
    snapshot.docs.forEach((use) => {
      user.push({ ...use.data(), id: use.id });
    });
    return user;
  });
}
export {
  AddCourse,
  DelCourse,
  updateCourse,
  addChapter,
  updateChapter,
  getChapters,
  deleteChapter,
  sup,
  GetCourses,
};
