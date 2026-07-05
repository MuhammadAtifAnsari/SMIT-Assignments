  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
  import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
  import { getFirestore, collection, addDoc,  doc, setDoc, getDocs, deleteDoc, query, where, } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD2DETQ-iNp7M_OSDVB8v8T6wAPllN_Evw",
    authDomain: "e-commerce-1ae58.firebaseapp.com",
    projectId: "e-commerce-1ae58",
    storageBucket: "e-commerce-1ae58.firebasestorage.app",
    messagingSenderId: "539400854951",
    appId: "1:539400854951:web:d5376481c66621773faa82",
    measurementId: "G-PY3VEF1J2Y"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export { collection, addDoc, db, getFirestore,  doc, setDoc, getDocs, deleteDoc, auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, query, where }
