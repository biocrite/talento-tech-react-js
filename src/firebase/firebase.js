// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfGpYwUa5L-GGuDHtZeQqu_k6g5guCtEg",
  authDomain: "awesomeshop-e1a04.firebaseapp.com",
  projectId: "awesomeshop-e1a04",
  storageBucket: "awesomeshop-e1a04.firebasestorage.app",
  messagingSenderId: "662519940219",
  appId: "1:662519940219:web:1d4473f53efaff98f00ede"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
