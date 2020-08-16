// import
import { writable } from "svelte/store";

// Importing all Pages and Components,
// that'll be exported.
import PageAuthorIndex from "../../routes/_pages/author/index.svelte";
import PageAuthorActivity from "../../routes/_pages/author/activity.svelte";

// 
function createComponentsStore() {
  // Main store structure
  const store = [
    {
      id: "author",
      module: PageAuthorIndex,
      
      index: "activity"
    },
    {
      id: "author/activity",
      module: PageAuthorActivity
    }
  ];

  // Let's now get some 
  const { subscribe, set, update } = writable(store);

  return {
    subscribe,

    getPage: (id) => {
      let returnPage;

      // Let's now find page with
      // this id and try to return it.
      store.forEach((page) => {
        console.log(page.id);
        if (page.id == id) {
          console.log("ID YES");
          console.log(page.module);
          returnPage = page.module;
        };
      });

      return returnPage;
    }
  }
};

const components = createComponentsStore();

export default components;