// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { apiKey } from "../constants/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "mern-book-inventory.firebaseapp.com",
  projectId: "mern-book-inventory",
  storageBucket: "mern-book-inventory-",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
