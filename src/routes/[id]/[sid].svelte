<script>
  // Importing modules
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";

  import components from "../../config/stores/components.js";
  import socket from "../../network/socket.js";

  const { page } = stores();

  // Importing components
  import {
    Spinner
  } from "darkmode-components/src/index";

  let loaded = false;
  let component;
  let subcomponent;

  // onMount event.
  // Here we'll determine if we need to
  // redirect our user to User Profile page
  // or to Blog Post page
  onMount(() => {
    // Let's now check our data.
    if (socket.connected) {
      socket.emit('getData', { type: "checkData", id: $page.params.id });
    } else {
      connectionProblems = true;

      socket.on('connect', () => {
        connectionProblems = false;

        socket.emit('getData', { type: "checkData", id: $page.params.id });
      });
    };
  });

  socket.on('checkData', (e) => {
    console.log(e);
    // @dataType: user
    if (e.type == "user") {
      // Let's now load all user-related
      // modules and pages.
      component = components.getPage("author");

      // And now let's check if we need to load
      // our subcomponent (subpage)
      if ($page.params.sid != null) {
        subcomponent = components.getPage(`author/${$page.params.sid}`);
      };
      
      loaded = true;
    };
  });

  let error = null;
  let connectionProblems = null;
</script>

{#if loaded}
  <!-- Main Page's component -->
  <svelte:component this={component}>
    <!-- Subcomponent -->
    <svelte:component this={subcomponent} />
  </svelte:component>
{ :else }
  <main style="min-height: 100vh;" class="w-full relative">
    <div style="z-index: 1001;" class="w-full h-full absolute inset-x-0 top-0 flex justify-center items-center bg-black">
      <div class="flex flex-col items-center justify-center">
        <!-- Error Screen -->
        {#if error}
          <div class="mt-8 text-center">
            <p class="text-sm text-white">Error occured. Please, try to reload this page.</p>

            <button on:click={(e) => window.reload()} class="px-4 py-2 mt-4 rounded-full bg-white text-xs text-black hover:text-white hover:bg-black">
              Reload
            </button>
          </div>
        { :else }
          {#if connectionProblems != null}
            <div class="mb-6 flex flex-col items-center">
              {#if connectionProblems}
                <svg style="width: 1.2rem; height: 1.2rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-wifi"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                
                <p class="mt-4 text-sm text-white">Network Problems</p>
              { :else }
                <svg style="width: 1.2rem; height: 1.2rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-wifi"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>

                <p class="mt-4 text-sm text-white">Network Stabilized</p>
              {/if}
            </div>
          {/if}

          <Spinner size="15" color="#fff" />
        {/if}
      </div>
    </div>
  </main>
{/if}