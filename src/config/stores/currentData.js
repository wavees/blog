// import
import { writable } from "svelte/store";

// 
function createCurrentDataStore() {
  // Main store structure
  const store = {
    loaded: false,
    user: {},

    alias: null
  };

  // Let's now get some 
  const { subscribe, set, update } = writable(store);

  return {
    subscribe,

    clearData: () => {
      update((object) => {
        object = {
          loaded: false,
          user: {}
        };

        return object;
      });
    },

    pasteData: (type = "user", data) => {
      // Let's now load some data about
      // user with this id.
      if (type == "user") {
        update((object) => {
          object.type = "user";

          object.user.username = data.username;
          object.user.provider = data.provider;
          object.user.email    = data.email;
          object.user.avatar   = data.avatar;
          object.user.id       = data.id;
          object.user.coins    = data.coins;
          
          object.alias         = data.alias || {};
          object.followers     = data.followers || {};

          object.loaded   = true;

          return object;
        });
      };
    }
  }
};

const currentData = createCurrentDataStore();

export { currentData };