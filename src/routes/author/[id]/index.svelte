<script>
  // Let's now just redirect user
  // to main activity page.
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";

  const { page } = stores();

  // onMount event
  // Here we'll redirect our user
  // to main Activity page.
  onMount(() => {
    goto(`/author/${$page.params.id}/activity`);
  });
</script>