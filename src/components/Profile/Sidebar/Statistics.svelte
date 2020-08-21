<script>
  // Importing modules
  import axios from "axios";
  import api from "../../../config/application/api.js";

  import { currentData as data } from "../../../config/stores/currentData.js";

  let posts = 0;
  let followers = 0;

  data.subscribe((object) => {
    let followersObject = object.followers || {};
    if (followersObject.count) {
      followers = followersObject.count;
    };
  });

  // Importing components
  import {
    Spinner
  } from "darkmode-components/src/index";
</script>

<!-- Layout -->
<div class="flex relative mt-8">
  <div class="w-1/2 flex flex-col justify-center">
    <!-- Stories -->
    <div class="my-4 flex items-center relative">
      <!-- Icon -->
      <img style="height: 1.5rem;" src="./icons/book.svg" alt="Stories Icon">

      <div class="ml-4">
        <h1 class="text-bold text-black text-xl">{posts}</h1>
        <p class="text-gray-700">stories</p>
      </div>
    </div>

    <!-- Followers -->
    <div class="my-4 flex items-center relative">
      <!-- Icon -->
      <img style="height: 1.5rem;" src="./icons/heart.svg" alt="Followers Icon">
      
      <div class="ml-4">
        <h1 class="text-bold text-black text-xl">{followers}</h1>
        <p class="text-gray-700">followers</p>
      </div>
    </div>
  </div>

  <div class="w-1/2 flex">
    <!-- More statistics -->
    <div class="my-4 flex flex-col flex-grow items-center rounded-lg bg-gray-200 py-4 px-4">
      <h1 class="text-bold text-black text-sm">Soon on Blog:</h1>
      <p class="text-gray-700 text-xs">«‎Statistics update: More statistics means more information!»‎</p>
    </div>
  </div>
</div>
