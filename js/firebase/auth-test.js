import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(
    auth,(user)=>{
        console.log(user ? "There is a signed in User" : "There is no User")
    },
    (error) => {
    console.error("Firebase Auth:", error.code, error.message);
  }
);