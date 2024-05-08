import { useState } from "react";
import { db , auth } from "./Config";
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

   const colCourse = collection(db, "Courses" );


//////////-------------------    take object to add new course  -----------/////////
 async function AddCourse(course , admin) {
   let res = await addDoc(colCourse, { 
     ...course,
     admin : admin,
   });
   return res;
 }
////////////-------------------    get current course   -----------/////////
async function GetCourse() {
     const course = (await getDocs(colCourse)).docs;
     const c = [];
     course.forEach( (doc) => {
       c.push({ ...doc.data(), id: doc.id });
     });
     return c;
}



 ////////-------------------    Delete course   -----------////
  async function DelCourse(course) {
    const docRef = doc(colCourse, course.id);
    await deleteDoc(docRef); 
  }



   ////////-------------------    update course   -----------////
   async function updateCourse(course ) {
     const docRef = doc(colCourse, course.id);
     await updateDoc(docRef, course);
   }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////----------------- add chapter for course ------------------/////
   async function addChapter(course , c) {
     const coll = collection(db, `Courses/ ${course.id}/ chapters`);
     const t = []
     c.videos.forEach( (video) => {
          
     })
     let res = await addDoc(coll, {
       ...c,
       isComleted : false,
       isOpen : false,
     });
     return res;
   }


   //     -------------------    update chapter   -----------////
   async function updateChapter(idCourse , c) {
     const coll = collection(db, `Courses/ ${idCourse}/ chapters`);
     const docRef = doc(coll, c.id);
      await updateDoc(docRef, c);
}

async function getChapters(idCourse) {
  const coll = collection(db, `Courses/ ${idCourse}/ chapters`);
  const querySnapshot = await getDocs(coll);
  let chapters = [];
  querySnapshot.forEach((doc) => {
    chapters.push({ ...doc.data(), id: doc.id });
  });
  return chapters;
}

async function deleteChapter( idCourse , idChapter ) {
      const coll = collection(db, `Courses/ ${idCourse}/ chapters`);
      const docRef = doc(coll, idChapter);
      await deleteDoc(docRef);
}


function sup() {
const yyyy = onSnapshot(colCourse, (snapshot) => {
     let user = [];
     snapshot.docs.forEach((use) => {
       user.push({ ...use.data(), id: use.id });
     });
    return( user);
   });
}
  export { AddCourse, DelCourse , updateCourse , addChapter , updateChapter , getChapters , deleteChapter , sup , GetCourse  };

