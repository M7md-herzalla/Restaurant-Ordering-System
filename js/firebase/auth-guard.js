import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";

export function requireAuth(onReady, onError, onGuest) {
  return onAuthStateChanged(auth, user => {
    if (!user) {
      onGuest();
      return;
    }

    onReady(user);
  }, onError);
}