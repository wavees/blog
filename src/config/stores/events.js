// import
import { writable } from "svelte/store";

function createEventsStore() {
  // Main Store structure
  let store = {
    event: null,
    data: {}
  };

  // Let's now get some 
  const { subscribe, set, update } = writable(store);

  return {
    subscribe,

    // Function, that'll clear our store.
    clear: () => {
      // Let's just update our store to
      // its default state.
      update((object) => {
        object = store;

        return object;
      });
    },

    // Function, that'll
    // call new event.
    call: (event, data) => {
      // Lets' now just update our store.
      update((object) => {
        object.event = event;
        object.data = data;

        return object;
      });
    }
  };
};

const events = createEventsStore();

export default events;