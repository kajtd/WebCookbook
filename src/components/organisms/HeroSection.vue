<template>
  <section
    class="border-0 sm:border-4 border-black rounded-3xl bg-blueLight p-4 sm:p-12 -mt-6 w-full max-w-5xl flex flex-col items-center gap-8 z-[-1]"
  >
    <div class="text-center mt-12">
      <h2 class="text-3xl sm:text-5xl font-bold">Not sure what to eat? 👨‍🍳</h2>
      <h3 class="text-base sm:text-lg font-medium text-gray-800 mt-6">
        Use our cookbook with thousands of different recipes and cook an amazing meal!
      </h3>
    </div>
    <div class="flex items-center">
      <img
        src="https://blush.design/api/download?shareUri=QsRbEmDzq&w=800&h=800&fm=png"
        alt=""
        class="my-8 h-24 sm:h-48"
      />
      <img
        src="https://blush.design/api/download?shareUri=CvkJHK6OO&w=800&h=800&fm=png"
        alt=""
        class="my-8 h-24 sm:h-48"
      />
    </div>
    <SearchBar />
  </section>
</template>

<script setup lang="ts">
import SearchBar from '../molecules/SearchBar.vue'
</script>
