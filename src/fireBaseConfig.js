import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const API_KEY = import.meta.env.VITE_GOOGLE_FIREBASE_API_KEY;
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.VITE_APP_ID;
const MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENT_ID;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "filmoteka-5e0c2.firebaseapp.com",
  projectId: "filmoteka-5e0c2",
  storageBucket: "filmoteka-5e0c2.appspot.com",
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
let auth, db, provider;
try {
  const firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  provider = new GoogleAuthProvider();
} catch (error) {
  console.log(error);
}
export default { auth, db, provider };
