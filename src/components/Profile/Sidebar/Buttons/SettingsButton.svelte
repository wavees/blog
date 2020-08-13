<script>
  // Importing modules
  import { user } from "../../../../config/stores/user.js";
  import { currentData as data } from "../../../../config/stores/currentData.js";

  export let uid = $data.user.id;
</script>

<!-- Main Layout -->
{#if $user.current.id == uid}
  <button class="mx-4 rounded-full bg-black text-white hover:text-black hover:bg-white px-6 py-2">
    Settings
  </button>
{/if}