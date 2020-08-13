<script>
  // Importing modules
  import axios from "axios";
  import api from "../../../../config/application/api.js";

  import events from "../../../../config/stores/events.js";
  import { user } from "../../../../config/stores/user.js";
  import { onMount } from "svelte";

  // importing components
  import {
    Spinner
  } from "darkmode-components/src/index";

  // onMount event
  // Here we'll get some
  // information about this user.
  onMount(() => {
    updateFollowButton();
  });

  events.subscribe((event) => {
    if (event.event == "updateFollowButton") {
      // Let's now update our follow button.
      updateFollowButton();
    };
  });

  // Function, that'll update our follow button.
  function updateFollowButton() {
    loaded = false;
    axios.get(`${api.blog.url}/${api.blog.version}/user/${$user.current.id}/follows/${uid}`)
    .then((response) => {
      loaded = true;
      follows = response.data.follows;
    });
  };

  // Small function, that'll handle process
  // of following/unfollowing.
  function follow() {
    axios.post(`${api.blog.url}/${api.blog.version}/user/${$user.current.id}/follow/${uid}`)
    .then((response) => {
      loaded = true;

      if (response.data.follows == null) {
        follows = true;
      } else {
        follows = false;  
      };

      // And now we need to update our SidebarStatistics
      events.call("updateSidebarStatistics");
    });
  };

  let loaded  = false;
  let follows = false;
  
  export let uid;
</script>

<!-- Layout -->
{#if $user.tokens.length > 0}
  {#if $user.current.id != uid}
    <button on:click={(e) => follow()} class="mx-4 rounded-full { follows ? "bg-white text-black hover:text-white hover:bg-black" : "bg-black text-white hover:text-black hover:bg-white" } px-6 py-2">
      <!-- Loading state -->
      {#if !loaded}
        <Spinner size="15" color="{ follows ? "#000" : "#fff" }" />
      { :else }
        {#if follows}
          Unfollow
        { :else }
          Follow
        {/if}
      {/if}
    </button>
  {/if}
{/if}
