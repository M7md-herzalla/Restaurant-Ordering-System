import {initializeApp} from"firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ0g3qBsPleESNfxHkh87ljaki9L1sVps",
  authDomain: "restaurant-ordering-syst-d6ac7.firebaseapp.com",
  projectId: "restaurant-ordering-syst-d6ac7",
  appId: "1:805022708319:web:9a6199d9f4e88448a321ea",

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();