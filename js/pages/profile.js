export function renderProfile(){
  return`
  <p id="profileStatus" role="status">
      Checking your session…
    </p>
        <section
      id="profileContent"
      class="auth-form profile-card"
      hidden
    >
            <div class="name-resturant">
                <h1>M O J</h1>
            </div>
           
            <div
        id="profileAvatar"
        class="profile-avatar"
        aria-hidden="true"
      ></div>

      <h1>My Profile</h1>
         <form id="profileForm" class="profile-fields">
        <label for="profileName">Full name</label>
        <input
          id="profileName"
          type="text"
          autocomplete="name"
          maxlength="80"
          required
        >

        <label for="profileEmail">Email</label>
        <input
          id="profileEmail"
          type="email"
          readonly
        >

        <p class="profile-method">
          Sign-in methods:
          <span id="profileProvider"></span>
        </p>

        <button
          id="saveProfileBtn"
          type="submit"
          disabled
        >
          Save changes
        </button>
      </form>

<div id="verificationPanel" class="verification-panel">
  <p id="verificationStatus"></p>

  <div id="verificationActions" hidden>
    <button
      id="resendVerificationBtn"
      type="button"
      class="profile-logout"
      data-verification="send"
    >
      Resend verification email
    </button>

    <button
      id="checkVerificationBtn"
      type="button"
      class="profile-logout"
      data-verification="check"
    >
      I have verified my email
    </button>
  </div>

  <p
    id="verificationMessage"
    class="auth-message"
    role="status"
  ></p>
</div>
      
      <button
  id="changePasswordBtn"
  class="profile-logout"
  type="button"
  hidden
  disabled
>
  Change password
</button>
      
      <button
        id="logoutBtn"
        class="profile-logout"
        type="button"
        disabled
      >
        Sign out
      </button>

      <p
        id="profileMessage"
        class="auth-message"
        role="status"
      ></p>
        </section>
  
  `;
}