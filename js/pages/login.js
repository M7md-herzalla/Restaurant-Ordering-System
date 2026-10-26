export function renderLogin() {
  return `
  <form id="loginForm" class="auth-form">
        <h1 class="name-resturant">M O J</h1>
            <h1>Sign in</h1>
 <label for="loginEmail">Email*</label>
      <input
        id="loginEmail"
        type="email"
        autocomplete="username"
        required
      >
        
       <label for="loginPassword">Password*</label>
      <div class="password-field">
        <input
          id="loginPassword"
          type="password"
          autocomplete="current-password"
          required
        >

        <button
          id="togglePasswordBtn"
          class="password-toggle"
          type="button"
          aria-controls="loginPassword"
          aria-label="Show password"
          aria-pressed="false"
        >😣</button>
      </div>
      <button
  id="forgotPasswordBtn"
  class="forgot-password"
  type="button"
  disabled
>
  Forgot password?
</button>
  <button id="loginBtn" type="submit" disabled>
        Sign in
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
        Don’t have an account?
      <a href="/register" data-link>Register now</a>
        </p>
      <p id="authMessage" class="auth-message" role="status">
         Preparing…
        </p>
    </form>
  `;
}
