<script>
  // Importing modules
  import axios from "axios";
  import api from "../../config/application/api.js";

  import { stores } from "@sapper/app";
  import { onMount } from "svelte";

  const { page } = stores();

  // Importing components
  import {
    Spinner,

    Avatar
  } from "darkmode-components/src/index";

  // onMount event
  // Here we'll get this user's
  // activity.
  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 2000);
  });

  let activity = [];
  let loaded = false;
</script>

<!-- Main Layout -->
<main style="min-height: 100vh;" class="w-full h-full px-4 md:px-8 lg:px-12 relative">
  {#if !loaded}
    <div style="z-index: 1003; min-height: 100vh;" class="absolute bg-white inset-x-0 top-0 w-full h-full flex justify-center items-center">
      <Spinner size="25" />
    </div>
  {/if}

  <!-- Header -->
  <div class="w-full py-4 md:py-6 px-2 md:px-6 flex justify-center md:justify-between items-center">
    <h1 class="uppercase text-2xl font-semibold">Activity</h1>

    <!-- Small Statistics window -->
    <div class="md:flex hidden">
      <div class="mx-6">
        <h1 class="font-bold">{activity.length}</h1>
        <p class="text-gray-700 text-sm">Activity Posts</p>
      </div>
    </div>
  </div>

  <!-- Content -->
  <div class="w-full h-full">
    {#if activity.length > 0}
      <p>Some Activity</p>
    { :else }
      <div style="min-height: 90vh;" class="w-full h-full flex justify-center items-center">
        <div class="text-center">
          <!-- Illustration -->
          <img style="height: 35vh;" src="./illustrations/undraw_taken.svg" alt="Taken Illustration by undraw">
        
          <!-- Texts -->
          <div class="mt-6">
            <h1 class="text-2xl uppercase font-bold">Nothing found</h1>
          </div>
        </div>
      </div>
    {/if}
  </div>
</main>