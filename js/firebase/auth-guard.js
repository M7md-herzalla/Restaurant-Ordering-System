import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";

export function requireAuth(onReady, onError) {
  return onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("./login.html");
      return;
    }

    onReady(user);
  }, onError);
}
