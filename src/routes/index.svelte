<script>
  // Let's now import some modules
  import axios from "axios";
  import { onMount } from "svelte";

  import { general } from "../config/stores/global.js";
  import { user } from "../config/stores/user.js";

  // 

  // onMount event
  // Here we'll get the list of popular
  // blog posts.
  onMount(() => {

  });

  let menuOpened = false;
</script>

<!-- Main site Layout -->
<main class="h-100vh w-full flex">

  <!-- Sidebar -->
  <div class="h-100vh w-1/3 bg-black flex justify-center items-center relative">
    <!-- Mini-Header -->
    <div class="absolute inset-0-x top-0 w-full flex justify-between items-center py-6 px-8">
      <!-- Logotype -->
      <div>
        <h1 style="font-family: Junegull" class="text-white font-bold">wavees</h1>
        <p class="text-gray-300 text-xs">blog</p>
      </div>

      <!-- Links -->
      <div class="flex items-center">
        <!-- All Services Icon -->
        <div class="mx-3 relative">
          <span on:click={(e) => {
            if (menuOpened) {
              menuOpened = false;
            } else {
              menuOpened = true;
            };
          }} style="width: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </span>
          {#if menuOpened}
            <div class="absolute w-64 rounded-lg bg-white mt-4 py-6 px-6">
              <!-- Soo, I still haven't done this,
              so let's just show our exuse message. -->
              <div class="text-center">
                <p class="text-sm">Uh-oh! So, apparently, we don't have any other working projects. But you can subscribe to our Updates!</p>

                <button class="rounded-full bg-black text-white hover:text-black hover:bg-white px-6 py-2 mt-4">
                  Subscribe
                </button>
              </div>
            </div>
          {/if}
        </div>

        <!-- Settings icon -->
        <div class="mx-3">
          <span style="width: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </span>
        </div>
      </div>
    </div>

    <!-- Some texts -->
    <div class="w-full px-4 md:px-8 lg:px-12">
      <h1 class="text-3xl font-bold text-white">The simplest bloging platform out there.</h1>
      <p class="text-gray-300 text-sm">Even though it's a very simple platform, we try to make it the best. We always listen to what our users ask of us and what they say about us.</p>
    </div>

    <!-- Create new Post -->
    <div class="absolute inset-x-0 bottom-0 w-full px-8 py-6 flex justify-between items-center">
      <!-- Texts -->
      <div>
        {#if $user.tokens.length >= 1}
          <h1 class="text-semibold font-semibold text-white">Want to tell something?</h1>
          <p class="text-xs text-gray-300">We can try to help you.</p>
        { :else }
          <h1 class="text-semibold font-semibold text-white">Log in your account,</h1>
          <p class="text-xs text-gray-300">so we can help with your blogging things.</p>
        {/if}
      </div>

      <!-- Buttons -->
      <div>
        {#if $user.tokens.length >= 1}
          <button class="px-4 py-2 rounded-full bg-white text-black hover:text-white hover:bg-black">
            Write Something
          </button>
        { :else }
          <button on:click={(e) => {
            window.location.href = `https://account.${$general.globalURL}/authorize/blog@wavees`;
          }} class="px-4 py-2 rounded-full bg-white text-black hover:text-white hover:bg-black">
            Log in
          </button>
        {/if}
      </div>
    </div>
  </div>

  <!-- List of blog posts -->
  <div class="w-2/3 bg-gray-100 h-full">
    
  </div>
</main>