import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";

const accountLink = document.querySelector(".account-link");
const accountText = document.getElementById("navAccountText");
const accountPhoto = document.getElementById("navAccountPhoto");

if (accountLink && accountText && accountPhoto) {
const profileURL=accountLink.href;


function updateHeader(user){
     accountPhoto.onload = null;
    accountPhoto.onerror = null;
    accountPhoto.hidden = true;
    accountPhoto.removeAttribute("src");
    accountText.hidden = false;

  document.querySelectorAll("[data-guest-only]").forEach(item => {
        item.hidden = Boolean(user);
    });
    document.querySelectorAll("[data-user-only]").forEach(item => {
        item.hidden = !user;
    });
     if (!user) {
      return;
     }

    const name = user.displayName?.trim() || user.email || "User";
    accountLink.dataset.state = "member";
    accountLink.href = profileURL;
    accountLink.setAttribute("aria-label", "Open my profile");
    accountLink.title = name;
    accountText.textContent = Array.from(name)[0].toUpperCase();
  if (user.photoURL) {
    accountPhoto.onload=()=>{
        if (auth.currentUser?.uid !==user.uid) {
            return;
        }
        accountPhoto.hidden = false;
        accountText.hidden = true;

    };
      accountPhoto.onerror = () => {
        accountPhoto.hidden = true;
        accountText.hidden=false;
      };
      accountPhoto.src = user.photoURL;


  }
}

onAuthStateChanged(auth,updateHeader,error=>{
updateHeader(null);
console.error("Header authentication error:",error);
});
}
