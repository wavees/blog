import { readable, writable } from 'svelte/store';

const general =
readable({
  // Site url
  // Hmm, just site url, isn't it?
  globalURL: "wavees.ml",
  currentURL: "blog.wavees.ml",

  permissions: [
    "blog/changeAlias",
    "blog/follow",
    "blog/unfollow"
  ]
});

export { general };