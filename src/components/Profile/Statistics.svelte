<script>
  // Importing modules
  import axios from "axios";
  import api from "../../config/application/api.js";

  import { onMount } from "svelte"

  // Importing components
  import {
    Spinner
  } from "darkmode-components/src/index";

  // onMount event
  // Here we'll load all needed
  // information about this user.
  onMount(() => {
    // Loading Followers count;
    axios.get(`${api.blog.url}/${api.blog.version}/${uid}/followers`)
    .then((response) => {

      // Let's now gather Followers Count
      // from this response.
      followersLoaded = true;
      followers = response.data.count;
    });

    // Loading Posts count;
    postsLoaded = true;
  });

  let posts = 0;
  let postsLoaded = false;

  let followers = 0;
  let followersLoaded = false;

  export let uid;
</script>

<!-- Layout -->
<div class="flex relative mt-8">
  <div class="w-1/2 flex flex-col justify-center">
    <!-- Stories -->
    <div class="my-4 flex items-center relative">
      {#if !postsLoaded}
        <div class="absolute inset-x-0 top-0 bg-white w-full h-full flex justify-center items-center">
          <Spinner size="15" />
        </div>
      {/if}

      <!-- Icon -->
      <img style="height: 1.5rem;" src="./icons/book.svg" alt="Stories Icon">

      <div class="ml-4">
        <h1 class="text-bold text-black text-xl">100</h1>
        <p class="text-gray-700">stories</p>
      </div>
    </div>

    <!-- Followers -->
    <div class="my-4 flex items-center relative">
      {#if !followersLoaded}
        <div class="absolute inset-x-0 top-0 bg-white w-full h-full flex justify-center items-center">
          <Spinner size="15" />
        </div>
      {/if}
      
      <!-- Icon -->
      <img style="height: 1.5rem;" src="./icons/heart.svg" alt="Followers Icon">
      
      <div class="ml-4">
        <h1 class="text-bold text-black text-xl">{followers}</h1>
        <p class="text-gray-700">followers</p>
      </div>
    </div>
  </div>

  <div class="w-1/2 flex">
    <!-- More statistics -->
    <div class="my-4 flex flex-col flex-grow items-center rounded-lg bg-gray-200 py-4 px-4">
      <h1 class="text-bold text-black text-sm">Soon on Blog:</h1>
      <p class="text-gray-700 text-xs">«‎Statistics update: More statistics means more information!»‎</p>
    </div>
  </div>
</div>
