<script>
  // Importing modules
  import { user } from "../../../config/stores/user.js";
  import { currentData as data } from "../../../config/stores/currentData.js";

  // Importing components
  
    // FollowButton and MessageButton
  import FollowButton from "./Buttons/FollowButton.svelte";
  import MessageButton from "./Buttons/MessageButton.svelte";

    // LogoutButton and SettingsButton
  import LogoutButton from "./Buttons/LogoutButton.svelte";
  import SettingsButton from "./Buttons/SettingsButton.svelte";

  export let uid = $data.user.id;
</script>

<!-- Main Layout -->
<div class="flex justify-center w-full items-center mt-6">
  <!-- 
    If user if viewing his own
    profile, than we need to show
    him "Logout" and "Settings" button.

    If he is viewing someone else's
   -->
  {#if uid != $user.current.id}
    <FollowButton uid={uid} />

    <MessageButton uid={uid} />
  { :else }
    <LogoutButton />

    <SettingsButton />
  {/if}
</div>