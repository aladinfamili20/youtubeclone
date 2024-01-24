import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAYfLwX5TiNJqwlddgQ5IsVERTO3KHbK5w",
  authDomain: "arthubtest.firebaseapp.com",
  projectId: "arthubtest",
  storageBucket: "arthubtest.appspot.com",
  messagingSenderId: "323024746562",
  appId: "1:323024746562:web:fb529c72b50218b13d15db"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
