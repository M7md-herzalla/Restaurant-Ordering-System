import { auth } from "./firebase-config.js";
import { requireAuth } from "./auth-guard.js";
import { updateProfile, signOut,sendPasswordResetEmail } from "firebase/auth";

const content = document.getElementById("profileContent");
const status = document.getElementById("profileStatus");
const form = document.getElementById("profileForm");
const nameInput = document.getElementById("profileName");
const emailInput = document.getElementById("profileEmail");
const avatar = document.getElementById("profileAvatar");
const provider = document.getElementById("profileProvider");
const saveButton = document.getElementById("saveProfileBtn");
const logoutButton = document.getElementById("logoutBtn");
const message = document.getElementById("profileMessage");
const passwordButton = document.getElementById("changePasswordBtn");

let currentUser = null;
let busy = false;


function setBusy(value) {
  busy = value;
  saveButton.disabled = value || !currentUser;
  logoutButton.disabled = value || !currentUser;
  nameInput.disabled = value || !currentUser;
  passwordButton.disabled = value || !currentUser;
}

function updateAvatar(user) {
  const text = user.displayName?.trim() || user.email || "?";
  avatar.textContent = Array.from(text)[0].toUpperCase();
  
  if (!user.photoURL) {
    return;
  }
  const image=document.createElement("img");
  image.alt="";
  image.onload=()=>{
    if (currentUser?.uid !== user.uid) {
      return;
    }
    avatar.replaceChildren(image);
  };
image.src=user.photoURL;

}

requireAuth((user) => {
  currentUser = user;
  passwordButton.hidden= !user.providerData.some(
    item=>item.providerId==="password"
  );
  nameInput.value = user.displayName || "";
  emailInput.value = user.email || "";
  updateAvatar(user);

  const providerNames = {
    "google.com": "Google",
    "password": "Email and password"
  };
 provider.textContent = [...new Set(user.providerData.map(
    item => providerNames[item.providerId] || item.providerId
  ))].join(" / ") || "Not available";

  status.hidden = true;
  content.hidden = false;
  setBusy(busy);
}, (error) => {
  currentUser = null;
  content.hidden = true;
  status.hidden = false;
  status.textContent = "Could not check your session. Please reload the page.";
  setBusy(false);
  console.error("Profile session error:", error);
});

form.addEventListener("submit",async(event)=>{
    event.preventDefault();
    if(busy || !currentUser || currentUser!==auth.currentUser){
        return;
    }
    const name=nameInput.value.trim();
    if (!name) {
    message.dataset.state = "error";
    message.textContent = "Please enter your name.";
    nameInput.focus();
    return;
    }


const user = currentUser;
setBusy(true);
saveButton.textContent = "Saving…";
message.textContent = ""


try{
    await updateProfile(user,{displayName:name});
    if (auth.currentUser !==user) {
        return;
    }
    nameInput.value=name;
    updateAvatar(user);
    message.dataset.state = "success";
    message.textContent = "Your name has been updated.";
}
catch (error) {
     message.dataset.state = "error";
    message.textContent = "Could not save your name. Please try again.";
     console.error("Profile update error:", error);
  } finally {
    setBusy(false);
    saveButton.textContent = "Save changes";
}

});

logoutButton.addEventListener("click",async()=>{
    if (busy || !currentUser) {
        return;
    }
    setBusy(true);
    logoutButton.textContent="Signing out...";
    message.textContent="";

    try {
        await signOut(auth);
        currentUser=null;
        content.hidden=true;
        window.location.replace("./login.html");

    }
    catch(error){
        message.dataset.state="error";
        message.textContent="Could not sign out. please try again";
        console.error("Sign-out error:", error);

    }
    finally {
    setBusy(false);
    logoutButton.textContent = "Sign out";
  }
})
passwordButton.addEventListener("click", async () => {
  const user = currentUser;

  if (busy || !user || user !== auth.currentUser) return;

  const hasPassword = user.providerData.some(
    item => item.providerId === "password"
  );

  if (!hasPassword || !user.email) return;

  setBusy(true);
  passwordButton.textContent = "Sending…";
  message.textContent = "";

  try {
    await sendPasswordResetEmail(auth, user.email);

    message.dataset.state = "success";
    message.textContent =
      "Password reset link sent. Check your inbox and spam folder.";
  } catch (error) {
    message.dataset.state = "error";

    const errors = {
      "auth/too-many-requests": "Please wait before trying again.",
      "auth/network-request-failed": "Check your internet connection."
    };

    message.textContent =
      errors[error.code] || "Could not send the link. Please try again.";

    console.error("Password reset error:", error);
  } finally {
    setBusy(false);
    passwordButton.textContent = "Change password";
  }
});