// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9VrTQWu2P4J7JxiXoxEq-qu2W0PTE7Xg",
  authDomain: "vite-contact-eb702.firebaseapp.com",
  projectId: "vite-contact-eb702",
  storageBucket: "vite-contact-eb702.appspot.com",
  messagingSenderId: "974388024037",
  appId: "1:974388024037:web:ee9f691a309e08436a7a0c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);