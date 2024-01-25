import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBfiL8PWDEowfiijf5n347wjIM7aVzgSDw",
  authDomain: "rich-a804c.firebaseapp.com",
  projectId: "rich-a804c",
  storageBucket: "rich-a804c.appspot.com",
  messagingSenderId: "460587217917",
  appId: "1:460587217917:web:d5177cca4773a0392fdf94"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
