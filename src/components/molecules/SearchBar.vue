<template>
  <div class="w-full max-w-lg rounded-full border-2 border-black h-16 bg-white flex items-center justify-between p-2">
    <span class="text-xs sm:text-base pl-4 sm:pl-5">Search recipes</span>
    <button class="rounded-full z-10 bg-primary h-12 w-12 flex items-center justify-center border-2 border-black">
      <Icon icon="akar-icons:search" class="h-full text-lg sm:text-2xl" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>
