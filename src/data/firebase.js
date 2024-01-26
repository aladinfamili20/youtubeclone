import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDBJpvj2WZ6iwongam6XvN1Rwfb5ps2rN8",
  authDomain: "todo-72b7f.firebaseapp.com",
  projectId: "todo-72b7f",
  storageBucket: "todo-72b7f.appspot.com",
  messagingSenderId: "965429072990",
  appId: "1:965429072990:web:bdca180d8e9371f1be50cf"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
