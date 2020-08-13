<script>
  // Importing modules
  import events from "../../../config/stores/events.js";
  
  import { user } from "../../../config/stores/user.js";
  import { currentData as data } from "../../../config/stores/currentData.js";
  
  import axios from "axios";
  import api from "../../../config/application/api.js";

  import { onMount } from "svelte";

  // Importing components.
  import {
    Spinner
  } from "darkmode-components/src/index";

  // onMount function
  // Here we'll load our user's
  onMount(() => {
    updateAlias();
  });

  // Function to update user's alias
  // information.
  function updateAlias() {
    // Let's now make request to remote
    // server to retrieve user's alias.
    axios.get(`${api.blog.url}/${api.blog.version}/author/${uid}/alias`)
    .then((response) => {
      let data = response.data;

      if (data.alias != null) {
        alias = data.alias;
        originalAlias = data.alias
      };
    });
  };

  // Function, that'll handle alias-changing
  // process.
  function changeAlias(alias) {
    if (uid != $user.current.id) return;
    if (alias == originalAlias) {
      editing = false;
    };

    loading = true;
    // Let's, by the way, get our current
    // token.
    const token = $user.current.token;

    // Let's now make our request to
    // Blog API.
    axios.put(`${api.blog.url}/${api.blog.version}/author/${token}/alias`, { alias: alias })
    .then((response) => {
      let data = response.data;
      loading = false;
      editing = false;

      // Let's update our alias.
      if (data.alias != null) {
        alias = data.alias;
        originalAlias = alias;
      };
    }).catch((response) => {
      loading = false;
      editing = false;

      // And now we need to check what
      // type of error is it.
      let data = response.response.data;

      if (data.error == "AliasAlreadyTaken") {
        error = "Alias already taken";
      } else {
        error = "ServerError";
      };
    });
  };

  // Function, that'll start our little
  // "alias" editor
  function editAlias() {
    error = null;

    loading = false;
    editing = true;
  };

  // EventListener
  events.subscribe((event) => {
    // Event to update our user alias.
    if (event.event == "updateSidebarAuthorAlias") {
      updateAlias();
    };
  });

  // Editing state
  // (Is user editing his current)
  // alias or no?)
  let editing = false;

  // Loading state
  let loading = false;

  // Error "state"
  let error = null;

  let alias = $data.user.id;
  let originalAlias;
  export let uid = $data.user.id;
</script>

<div style="cursor: pointer;" class="h-5 w-full flex items-center">
  <!-- 
    Let's now check if user is
    viewing his own profile or no.
   -->

  {#if uid == $user.current.id}
    <!-- 
      And now we need to check:
      "Has user ever changed his Alias?" 
     -->
    {#if editing}
      {#if loading}
        <div class="w-full flex justify-center items-center">
          <Spinner size="15" />
        </div>
      { :else }
        <p class="font-bold mx-0">/</p>

        <!-- Input -->
        <input class="border-b-2 border-dotted border-gray-700 font-bold mx-0" bind:value={alias} type="text" >

        {#if alias == originalAlias}
          <!-- Cancel Button -->
          <button style="min-width: 30px;" class="px-1" on:click={() => editing = false}>
            <img style="cursor: pointer;" src="./icons/x.svg" alt="Cancel icon">
          </button>
        { :else }
          <!-- Save Changes Button -->
          <button style="min-width: 30px;" class="px-1" on:click={() => {
              changeAlias(alias);
            }}>
            <img style="cursor: pointer;" src="./icons/save.svg" alt="Save icon">
          </button>
        {/if}
      {/if}
    { :else }

      <!-- Error Message -->
      {#if error != null}
        <!-- Text -->
        <input class="mx-0 font-semibold border-b-2 border-solid border-white" bind:value={error} type="text" readonly >
      { :else }
        {#if alias == uid}
          <p class="text-base font-semibold">Change profile's Alias</p>
        { :else }
          <p class="font-bold mx-0">/</p>
          <input class="mx-0 font-bold border-b-2 border-solid border-white" bind:value={alias} type="text" readonly >
        {/if}
      {/if}

      <!-- Edit Alias Icon -->
      <button on:click={(e) => editAlias()} style="min-width: 30px;" class="px-1">
        <img src="./icons/edit-3.svg" alt="Pen icon">
      </button>
    {/if}
  { :else }
    <h1 class="text-base font-bold">/{alias}</h1>
  
    <!-- Share Icon -->
    <button class="mx-2">
      <img style="width: 1rem;" src="./icons/share-2.svg" alt="Share icon">
    </button>
  {/if}
</div>