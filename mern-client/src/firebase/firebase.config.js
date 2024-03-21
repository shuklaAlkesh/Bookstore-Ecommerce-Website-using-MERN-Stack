// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARLdbMCVay9chvgl3ls8thOS4jbd8YjT8",
  authDomain: "mern-book-inventory-73a34.firebaseapp.com",
  projectId: "mern-book-inventory-73a34",
  storageBucket: "mern-book-inventory-73a34.appspot.com",
  messagingSenderId: "648174859487",
  appId: "1:648174859487:web:ab5db46f46115b714a256a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;