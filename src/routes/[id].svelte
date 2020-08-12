<script>
  // Importing modules
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";

  import { currentData as data } from "../config/stores/currentData.js";
  
  const { page } = stores();

  // Importing components
  import {
    Spinner
  } from "darkmode-components/src/index";

  // onMount event.
  // Here we'll determine if we need to
  // redirect our user to User Profile page
  // or to Blog Post page
  onMount(() => {
    data.checkData($page.params.id);
  });

  data.subscribe((object) => {
    if (object.loaded) {
      // And now let's redirect our user
      // to specific page...

      // Redirect to Author page
      if (object.type == "user") {
        document.location.replace(`/author/${object.user.id}`);
      }
    };
  });
</script>


<main style="min-height: 100vh;" class="w-full relative">
  <div style="z-index: 1001;" class="w-full h-full absolute inset-x-0 top-0 flex justify-center items-center bg-black">
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
</main>