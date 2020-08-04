<script>
  // Let's now import some modules
  import axios from "axios";
  import { onMount } from "svelte";

  import { general } from "../config/stores/global.js";
  import { user } from "../config/stores/user.js";

  // Importing components
  import {
    Avatar
  } from "darkmode-components/src/index";

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
      {#if $user.tokens.length >= 1}
        <h1 class="text-3xl font-bold text-white">How are you feeling today?</h1>
        <div>
          <p class="text-gray-300 text-xs">You'll feel much better if you tell everyone how you feel. You have something to say, show everyone how you feel? Just write what you want, and we'll try to tell others about your thoughts.</p>
          <p class="mt-4 text-gray-300 text-xs">We, together with <a class="text-white border-b-2 border-dotted border-gray-700" href="https://universes.wavees.ml/paw">Paw Universes</a>, will help you with your mood, and if something is wrong, we will try to make it better.</p>
        </div>
      { :else }
        <h1 class="text-3xl font-bold text-white">The simplest bloging platform out there.</h1>
        <p class="text-gray-300 text-sm">Even though it's a very simple platform, we try to make it the best. We always listen to what our users ask of us and what they say about us.</p>
      {/if}
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
  <div class="w-2/3 bg-gray-100 h-full relative py-6 md:py-16 py:py-32">
    <!-- Another Small Header -->
    <div class="absolute inset-x-0 top-0 w-full flex justify-end py-3">
      <!-- User Account -->
      {#if $user.tokens.length >= 1}
        <div class="flex items-center">
          <!-- Avatar -->
          <span class="relative">
            <Avatar size="2" type="image" avatar={$user.current.avatar} />
            <!-- Badge to show type of provider (Wavees) -->
            <span style="z-index: 1000;" class="absolute rounded-full w-4 h-4 flex justify-center items-center text-center bg-black top-0 right-0">
              <p style="font-family: Junegull; font-size: .50rem;" class="text-white">w</p>
            </span>
          </span>

          <!-- Texts (Username and Email) -->
          <div class="mx-4">
            <p class="">{$user.current.username}</p>
            <p class="text-gray-700 text-xs">{$user.current.email}</p>
          </div>

          <!-- Some Buttons -->
          <div class="flex">
            <!-- Favorites List Button -->
            <button class="p-2 hover:bg-gray-200 rounded-lg hover:shadow-md mx-2">
              <img style="width: 1.2rem;" src="./icons/star.svg" alt="Favorites Icon">
            </button>

            <!-- User Settings Button -->
            <button class="p-2 hover:bg-gray-200 rounded-lg hover:shadow-md mx-2">
              <img style="width: 1.2rem;" src="./icons/user.svg" alt="User Icon">
            </button>
          </div>
        </div>
      {/if}
    </div>

    <!-- Content -->
    <div class="w-full h-full bg-red-500">
      
    </div>

    <!-- Footer -->
    <div class="absolute inset-x-0 bottom-0 py-5 flex justify-between items-center px-12">
      <!-- Copyright -->
      <p class="text-gray-500 text-sm">© Wavees Group, 2020</p>

      <!-- Some links -->
      <div class="flex text-sm text-gray-400">
        <a class="mx-4" href="https://company.wavees.ml/">Company</a>
        <a class="mx-4" href="https://developer.wavees.ml/blog">Developers</a>
        <a class="mx-4" href="https://wavees.ml/contact">Contact</a>
      </div>
    </div>
  </div>
</main>