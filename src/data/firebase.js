import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCU3KgHyKBv7L3nrZGGZk61gUxRew1t7OA",
  authDomain: "clone-cbb9f.firebaseapp.com",
  projectId: "clone-cbb9f",
  storageBucket: "clone-cbb9f.appspot.com",
  messagingSenderId: "673043815963",
  appId: "1:673043815963:web:b6c9f91455b8dd327ea2be"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
