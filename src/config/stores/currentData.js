// import
import { writable } from "svelte/store";
import axios from "axios";

import api from "../application/api";

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

    // checkData
    // This function will  
    checkData: (id) => {
      currentData.clearData();

      // Firstly, let's check if it's an
      // user's alias or not.
      axios.get(`${api.blog.url}/${api.blog.version}/author/${id}`)
      .then((response) => {
        let data = response.data;
        
        // It's an user's alias, so
        // let's now load information
        // about this user.
        currentData.loadData(data.uid);
      }).catch(() => {
        // Let's now check if it's an user
        // object or not.
        axios.get(`${api.wavees.url}/${api.wavees.version}/user/${id}`)
        .then(() => {
          // It's an user id, so let's load some information
          // about this user.
          currentData.loadData(id);
        }).catch((error) => {
          // And now let's check if it's a
          // blog post or no...
          update((object) => {
            object.error = true;

            return object;
          });
        });
      });
    },

    setAlias: (alias) => {
      update((object) => {
        object.alias = alias;

        return object;
      });
    },

    // loadData
    // This function will load
    // some data (?)
    loadData: (id, type = "user") => {
    
      // Let's now load some data about
      // user with this id.
      if (type == "user") {
        axios.get(`${api.wavees.url}/${api.wavees.version}/user/${id}`)
        .then((response) => {
          let data = response.data;
          loadAlias(id);

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

async function loadAlias(uid) {
  axios.get(`${api.blog.url}/${api.blog.version}/author/${uid}/alias`)
  .then((response) => {
    let data = response.data;

    if (data.alias != null) {
      currentData.setAlias(data.alias);
    };
  });
};

export { currentData };