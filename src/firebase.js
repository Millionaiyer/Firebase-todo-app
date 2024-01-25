// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apikey = import.meta.env.VITE_API_KEY;
// const test2 = import.meta.env.DB_PASSWORD;
// console.log("test", test);
// console.log("test2", test2);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apikey,
  authDomain: "to-do-app-76371.firebaseapp.com",
  projectId: "to-do-app-76371",
  storageBucket: "to-do-app-76371.appspot.com",
  messagingSenderId: "180979812002",
  appId: "1:180979812002:web:20adbe3b88e9c66ed7f9fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export default app;
