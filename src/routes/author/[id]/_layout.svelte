<script>
  // Let's now import some modules.
  import { currentData as data } from "../../../config/stores/currentData.js";

  import { fade } from "svelte/transition";

  import { user } from "../../../config/stores/user.js";
  import { goto, stores } from "@sapper/app";

  const { page } = stores();

  import { onMount } from "svelte";

  // Importing components
  import {
    Spinner,

    Avatar
  } from "darkmode-components/src/index";

  import Statistics from "../../../components/Profile/Statistics.svelte";
  import FollowButton from "../../../components/Profile/FollowButton.svelte";

  // onMount event
  onMount(() => {
    if (!$data.loaded) {
      data.loadData($page.params.id, "user");
    };
  });
</script>

<!-- Main Layout -->
<main style="min-height: 100vh;" class="w-full relative pb-32">

  <!-- Loading Spinner -->
  {#if !$data.loaded}
    <div out:fade style="z-index: 1004;" class="w-full h-full absolute inset-x-0 top-0 flex justify-center items-center bg-black">
      <div class="flex flex-col items-center justify-center">
        <!-- Error Screen -->
        {#if $data.error}
          <div class="mt-8 text-center">
            <p class="text-sm text-white">Error occured. Please, try to reload this page.</p>

            <button on:click={(e) => window.reload()} class="px-4 py-2 mt-4 rounded-full bg-white text-xs text-black hover:text-white hover:bg-black">
              Reload
            </button>
          </div>
        { :else }
          <Spinner size="15" color="#fff" />
        {/if}
      </div>
    </div>
  {/if}

  <!-- Header -->
  <div class="w-full flex justify-center py-2 bg-black items-center">
    <!-- Posts Button -->
    <a href="/discover" class="mx-6 text-sm text-gray-300">Discover</a>

    <!-- Logotype -->
    <div class="mx-6 text-center">
      {#if $user.tokens.length > 0}
        <span style="cursor: pointer;" on:click={(e) => goto(`/${$user.current.id}`)}>
          <Avatar type="image" size="2.5" avatar={$user.current.avatar} />
        </span>
      { :else }
        <h1 style="font-family: Junegull;" class="text-base text-white text-bold">wavees</h1>
        <p class="text-xs text-gray-200">blog</p>
      {/if}
    </div>

    <!-- New Post -->
    <a href="/write" class="mx-6 text-sm text-gray-300">New Post</a>
  </div>

  <!-- Page content -->
  {#if $data.loaded}
    <div class="w-full px-0 md:px-6 lg:px-12 flex flex-col md:flex-row py-4 md:py-8 lg:py-12">
      <!-- Author Information -->
      <div class="w-full md:w-1/4 lg:w-1/5 px-3 py-4 md:py-6">
        <div class="flex items-center">
          <Avatar size="4" type="image" avatar={$data.user.avatar} />
        
          <div class='mx-6'>
            <h1 class="text-black text-xl font-semibold uppercase">{$data.user.username}</h1>
            <p class="text-gray-700 text-sm">Author</p>
          </div>
        </div>

        <div class="mt-6">
          <p class="text-sm text-gray-700">The author has decided not to say anything about himself. Keeping secrets?</p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-center w-full items-center mt-6">
          <FollowButton uid={$data.user.id} />

          <button class="mx-4 px-4 py-2 rounded-full bg-white text-black hover:text-white hover:bg-black">
            Message
          </button>
        </div>

        <!-- Statistics -->
        <Statistics uid={$data.user.id} />

        <!-- Some Other Buttons -->
        <div class="mt-6 w-full">
          <!-- Activity -->
          <div style="cursor: pointer;" class="my-4 w-full flex items-center bg-black rounded-lg shadow-xl py-3 px-4 md:px-6 text-white">
            <!-- Icon -->
            <span style="height: 1.2rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </span>
            
            <!-- Text -->
            <h1 class="ml-4">Activity Feed</h1>
          </div>

          <!-- Blog Posts -->
          <div style="cursor: pointer;" class="w-full flex items-center py-3 px-4 md:px-6 my-4">
            <!-- Icon -->
            <img style="height: 1.2rem;" src="./icons/book-open.svg" alt="Stories Icon">

            <!-- Text -->
            <h1 class="ml-4">Blog Posts</h1>
          </div>

          <!-- Life Story -->
          <div style="cursor: pointer;" class="w-full flex items-center py-3 px-4 md:px-6 my-4">
            <!-- Icon -->
            <img style="height: 1.2rem;" src="./icons/archive.svg" alt="Life Story Icon">

            <!-- Text -->
            <h1 class="ml-4">Life Story</h1>
          </div>
        </div>
      </div>

      <!-- Stories List -->
      <div class="w-full mt-6 md:mt-0 h-full md:w-3/4 lg:w-4/5">
        <slot></slot>
      </div>
    </div>
  {/if}

  <!-- Footer -->
  <div class="absolute inset-x-0 bottom-0 w-full py-4 w-full flex justify-between px-2 md:px-6 lg:px-8 bg-gray-200">
    <!-- Logotype -->
    <div>
      <h1 style="font-family: Junegull;" class="text-base text-black text-bold">wavees</h1>
      <p class="text-xs text-gray-700">Company</p>
    </div>

    <div class="flex items-center">
      <!-- Buttons -->
      <div class="hidden md:flex text-sm text-gray-700 items-center">
        <a href="https://wavees.ml" class="mx-6">All Services</a>
        <a href="https://github.com/wavees/blog" class="mx-6">Source Code</a>

        <button class="rounded-full bg-black text-white hover:text-black hover:bg-white px-6 py-2 mx-6">
          Learn more about Company
        </button>
      </div>

      <!-- Copyright -->
      <p class="text-sm mx-6">© Wavees Company, 2020</p>
    </div>
  </div>
</main>