import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXLE-40SuO5llx_fmH8xGi49WrVfcDr_w",
  authDomain: "angellkerr-47c79.firebaseapp.com",
  projectId: "angellkerr-47c79",
  storageBucket: "angellkerr-47c79.firebasestorage.app",
  messagingSenderId: "815391100180",
  appId: "1:815391100180:web:bdd0bf78e0a1a5b9390601",
  measurementId: "G-02Q8X8L963"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (database)
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;

