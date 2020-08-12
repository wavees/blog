<script>
  // Importing modules
  import { user } from "../../../../config/stores/user.js";
  import Cookie from "cookie-universal";

  // Cookie Manager
  const cookies = Cookie();

  // Function, that'll handle logout process.
  function logout() {
    // Let's firstly delete our _account_token cookie.
    cookies.remove("_account_token", { path: "/" });

    // And now let's clear our User Store.
    user.clearStore();
  };
</script>

<button on:click={() => logout()} class="mx-4 px-4 py-2 rounded-full bg-white text-black hover:text-white hover:bg-black">
  Logout
</button>