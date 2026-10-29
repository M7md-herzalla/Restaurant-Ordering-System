import { auth,googleProvider } from "./firebase-config.js"; 
import { createUserWithEmailAndPassword,updateProfile,signInWithPopup,sendEmailVerification } from "firebase/auth";
export function initRegister(navigate) {
  const controller =new AbortController();
  const {signal}=controller;

const form=document.getElementById("registerForm");
const button=document.getElementById("registerBtn");
const message=document.getElementById("authMessage");
const passwordHelp = document.getElementById("passwordHelp");
const passwordInput = document.getElementById("registerPassword");
const googleButton = document.getElementById("googleSignInBtn");


const errorMessages = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/invalid-email": "Please enter a valid email.",
  "auth/weak-password": "Please choose a stronger password.",
  "auth/operation-not-allowed": "Email registration is not enabled.",
  "auth/configuration-not-found": "Check your Firebase Authentication setup.",
  "auth/network-request-failed": "Check your internet connection.",
  "auth/too-many-requests": "Please wait before trying again."
};
form.addEventListener("submit",async(event)=>{
    event.preventDefault();
    if (button.disabled) {
        return;
    }
const nameInput = document.getElementById("registerName");
const email=document.getElementById("registerEmail").value.trim()

const name=nameInput.value.trim();
const password = document.getElementById("registerPassword").value;
const confirmInput =document.getElementById("registerConfirmPassword");

message.textContent="";
passwordHelp.hidden=true;
passwordHelp.textContent="";
if (!name) {
    message.textContent="Please enter your name";
    nameInput.focus();
    return;
}

const speicalChar="^$*.[]{}()?\"!@#%&/\\,><':;|_~`-"
const passwordRules=[
    {
        valid:password.length>=10,
        message:"Password must contain at least 10 characters."

    },
      {
        valid: /[a-z]/.test(password),
        message: "Password must contain a lowercase letter."
    },
    {
        valid: /[A-Z]/.test(password),
        message: "Password must contain an uppercase letter."
    },
    {
        valid:(password.match(/[0-9]/g) || []).length>=1,
        message:"Password must contain at least one number."
    },
    {
        valid:Array.from(password).some(
        character=>speicalChar.includes(character)
    ),
        message: "Password must contain a special character, such as @ or #."
    }

];

const failedRule = passwordRules.find(rule => !rule.valid);

if (failedRule) {

  passwordHelp.textContent = failedRule.message;
  passwordHelp.hidden=false;
  passwordInput.focus();
  return;
}


if (password!==confirmInput.value) {
passwordHelp.textContent="Passwords do not match";
passwordHelp.hidden=false;
confirmInput.focus();
return;
}
button.disabled=true;
googleButton.disabled=true;
button.textContent="Creating Account";

try{
    const credential=await createUserWithEmailAndPassword(auth,email,password);
try{
    await updateProfile(credential.user,{displayName:name});
message.textContent ="Account created! You are now signed in.";
}
catch(profileError){
    message.textContent =
        "Account created, but your name could not be saved. " +
        "You can update it later.";
console.error("Profile update error:", profileError.code);

}
if (!credential.user.emailVerified) {
  try{
    await sendEmailVerification(credential.user);

  }catch(verificationError){
    console.error("Verification email error",verificationError.code);
  }
}
 form.reset();

if (signal.aborted) {
  return;
}
navigate("/home",{replace:true});
}
catch(error){
    message.textContent =
      errorMessages[error.code] ||
      "Could not create your account.";
console.error("Registration error:", error.code);

}

finally{
button.disabled = false;
googleButton.disabled=false;
button.textContent = "Create Account";

}



},{ signal });
button.disabled = false;
message.textContent = "";
passwordHelp.hidden=true;


document.querySelectorAll(".password-toggle").forEach(toggle=>{
    toggle.addEventListener("click",()=>{
        const input=document.getElementById(toggle.dataset.passwordTarget);
        const showPassword=input.type==="password";
        input.type=showPassword?"text":"password";
         toggle.setAttribute("aria-pressed", String(showPassword));
    toggle.setAttribute(
      "aria-label",
      showPassword ? "Hide password" : "Show password"
    );
    toggle.textContent = showPassword ? "🧐" : "😣";

    },{ signal });
});
document.getElementById("registerConfirmPassword").addEventListener("input", () => {
    passwordHelp.hidden = true;
    passwordHelp.textContent = "";
  },{ signal });
  const googleButtonText =
  document.getElementById("googleButtonText");
  const googleErrorMessages = {
  "auth/popup-closed-by-user":
    "Google sign-in was cancelled.",
  "auth/popup-blocked":
    "Please allow pop-ups for this website and try again.",
  "auth/cancelled-popup-request":
    "Please try Google sign-in again.",
  "auth/unauthorized-domain":
    "This domain is not authorized in Firebase.",
  "auth/operation-not-allowed":
    "Google sign-in is not enabled in Firebase.",
  "auth/account-exists-with-different-credential":
    "Please sign in using your existing method first."
};
googleButton.addEventListener("click",async()=>{
if (button.disabled || googleButton.disabled) {
    return;
}
button.disabled = true;
  googleButton.disabled = true;
  googleButtonText.textContent = "Connecting…";
  message.textContent = "";
  passwordHelp.hidden = true;
  passwordHelp.textContent = "";

try{
    await signInWithPopup(auth,googleProvider);
      if (signal.aborted) return;

    navigate("/home", { replace: true })
    message.textContent="Signed in successfully with Google";

}
catch (error) {
  message.textContent =
    googleErrorMessages[error.code] ||
    errorMessages[error.code] ||
    "Could not sign in with Google.";

  console.error("Google sign-in error:", error.code);
} finally {
  button.disabled = false;
  googleButton.disabled = false;
  googleButtonText.textContent = "Continue with Google";
}
},{ signal });
googleButton.disabled = false;


  return ()=>controller.abort();
}



