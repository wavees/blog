// import
import { writable } from "svelte/store";
import axios from "axios";

import { wavees } from "../application/api";

const url = wavees.url;
const version = wavees.version;

// 
function createCurrentDataStore() {
  // Main store structure
  let store = {
    loaded: false,
    user: {}
  };

  // Let's now get some 
  const { subscribe, set, update } = writable(store);

  return {
    subscribe,

    // loadData
    // This function will load
    // some data (?)
    loadData: (id, type = "user") => {
      
      // Let's now load some data about
      // user with this id.
      if (type == "user") {
        axios.get(`${url}/${version}/user/${id}`)
        .then((response) => {
          let data = response.data;

          update((object) => {
            object.type = "user";

            object.user.username = data.username;
            object.user.provider = data.provider;
            object.user.email    = data.email;
            object.user.avatar   = data.avatar;
            object.user.id       = id;
            object.user.coins    = data.coins;

            object.loaded   = true;

            return object;
          });
        }).catch(() => {
          update((object) => {
            object.error = true;
            
            return object;
          })
        });
      };
    }
  }
};

const currentData = createCurrentDataStore();

export { currentData };