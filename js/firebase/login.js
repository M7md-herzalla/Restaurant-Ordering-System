import { auth, googleProvider } from "./firebase-config.js";
import {signInWithEmailAndPassword,signInWithPopup,sendPasswordResetEmail} from "firebase/auth";
export function initLogin(navigate) {
  const controller =new AbortController();
  const {signal}=controller;

const form =document.getElementById("loginForm");
const emailInput =document.getElementById("loginEmail");
const passwordInput =document.getElementById("loginPassword");
const loginButton =document.getElementById("loginBtn");
const googleButton  =document.getElementById("googleSignInBtn");
const googleButtonText   =document.getElementById("googleButtonText");
const toggleButton = document.getElementById("togglePasswordBtn");
const message = document.getElementById("authMessage");
const forgotButton =document.getElementById("forgotPasswordBtn");
let busy=false;


const errorMessages = {
  "auth/invalid-credential":
    "Incorrect email or password.",
  "auth/user-not-found":
    "Incorrect email or password.",
  "auth/wrong-password":
    "Incorrect email or password.",
  "auth/invalid-email":
    "Please enter a valid email.",
  "auth/user-disabled":
    "This account has been disabled.",
  "auth/too-many-requests":
    "Too many attempts. Please try again later.",
  "auth/network-request-failed":
    "Check your internet connection.",
  "auth/popup-closed-by-user":
    "Google sign-in was cancelled.",
  "auth/popup-blocked":
    "Please allow pop-ups and try again.",
  "auth/cancelled-popup-request":
    "Please try Google sign-in again.",
  "auth/unauthorized-domain":
    "This domain is not authorized in Firebase.",
  "auth/operation-not-allowed":
    "This sign-in method is not enabled in Firebase.",
  "auth/account-exists-with-different-credential":
    "Please sign in using your existing method first."
};

async function signIn(method) {
    if (busy) {
        return;
    }
    busy=true;
    loginButton.disabled=true;
    googleButton.disabled=true;
    forgotButton.disabled = true;
    message.textContent = "";
    message.dataset.state = "";
    loginButton.textContent =method === "email" ? "Signing in…" : "Sign in";
    googleButtonText.textContent =method === "google" ? "Connecting…" : "Continue with Google";
    try {
        if (method==="google") {
            await signInWithPopup(auth,googleProvider); 
        }
        else{
                await signInWithEmailAndPassword(auth,emailInput.value.trim(),passwordInput.value);
        }
            message.dataset.state = "success";
            message.textContent = "Signed in successfully!";
            if (signal.aborted) {
                return;
              }
          navigate("/profile",{replace:true});
    }
    catch(error){
        message.dataset.state=error.code==="auth/popup-closed-by-user"?"info":"error";
         message.textContent = errorMessages[error.code] || "Could not sign in Please try again.";
         console.error("Sign-in error:", error.code);
    }
    finally {
        busy=false;
        loginButton.disabled=false;
        googleButton.disabled=false;
        forgotButton.disabled = false;
        loginButton.textContent="Sign in"
        googleButtonText.textContent="Continue with google";
    }
    
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  signIn("email");
},{ signal });

googleButton.addEventListener("click", () => {
  signIn("google");
},{ signal });

toggleButton.addEventListener("click",()=>{
const showPassword=passwordInput.type==="password";
passwordInput.type=showPassword?"text":"password";
toggleButton.textContent=showPassword?"🧐":"😣";

toggleButton.setAttribute("aria-pressed", String(showPassword));
  toggleButton.setAttribute(
    "aria-label",
    showPassword ? "Hide password" : "Show password"
  );

},{ signal });
forgotButton.addEventListener("click",async()=>{
    if (busy) {
        return;
    }
    emailInput.value=emailInput.value.trim();

    if (!emailInput.reportValidity()) {
        return;
    }

busy = true;
  loginButton.disabled = true;
  googleButton.disabled = true;
  forgotButton.disabled = true;
  forgotButton.textContent = "Sending…";
  message.textContent = "";
  message.dataset.state = "";

  const resetMessage =
    "If an eligible account exists for this email, " +
    "you will receive a password reset link. " +
    "Check your inbox and spam folder.";

    try {
    await sendPasswordResetEmail(auth, emailInput.value);
message.dataset.state="info";
message.textContent=resetMessage;
}
catch (error) {
    if (error.code ==="auth/user-not-found") {
        message.dataset.state = "info";
        message.textContent = resetMessage;
    }
    else{
        message.dataset.state="error";
        message.textContent = errorMessages[error.code] || "Could not request a reset link. Please try again.";
    }
        console.error("Password reset error:", error.code);

}
finally {
    busy=false;
    loginButton.disabled=false;
    googleButton.disabled=false;
    forgotButton.disabled=false;
    forgotButton.textContent="Forgot password?";

}
},{ signal });
forgotButton.disabled = false;
loginButton.disabled=false;
googleButton.disabled=false;
message.textContent = "";




  return ()=>controller.abort();
}

