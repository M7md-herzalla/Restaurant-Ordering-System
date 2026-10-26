export function renderRegister() {
  return `
   
 <form id="registerForm" class="auth-form">
    <h1 class="name-resturant">M O J</h1>
    <h1>Create Account</h1>



    <label for="registerName">Full name*</label>
<input
  id="registerName"
  type="text"
  autocomplete="name"
  maxlength="80"
  required
>

    <label for="registerEmail">Email*</label>
    <input
      id="registerEmail"
      type="email"
      autocomplete="email"
      required
    >

   <label for="registerPassword">Password*</label>

    <div class="password-field">
  <input
    id="registerPassword"
    type="password"
    autocomplete="new-password"
    aria-describedby="passwordHelp"
    required
  >

  <button
    type="button"
    class="password-toggle"
    data-password-target="registerPassword"
    aria-controls="registerPassword"
    aria-label="Show password"
    aria-pressed="false"
  >😣</button>
</div>
    <p id="passwordHelp" role="status" hidden>
  **Use at least 8 characters, one uppercase letter,
  two numbers, and one special character.
</p>
    <label for="registerConfirmPassword">Confirm password*</label>
<div class="password-field">
  <input
    id="registerConfirmPassword"
    type="password"
    autocomplete="new-password"
    required
  >

  <button
    type="button"
    class="password-toggle"
    data-password-target="registerConfirmPassword"
    aria-controls="registerConfirmPassword"
    aria-label="Show password"
    aria-pressed="false"
  >😣</button>
</div>


    <button id="registerBtn" type="submit" disabled>
      Create Account
    </button>
    <p class="auth-divider">or</p>
<button
  id="googleSignInBtn"
  class="google-sign-in"
  type="button"
  disabled
>
  <img
    src="https://developers.google.com/static/identity/images/g-logo.png"
    alt=""
    width="20"
    height="20"
  >
  <span id="googleButtonText">Continue with Google</span>
</button>


<p class="auth-switch">
  Already have an account?
  <a href="/login" data-link>Sign in</a>

  </p>



    <p id="authMessage" role="status">Preparing…</p>
  </form>

  `;
}