<template>
  <article class="comment border-2 border-black p-4 rounded-lg bg-orangeLight">
    <header class="flex items-center gap-2">
      <img :src="authorPhotoUrl" :alt="authorName" class="border-2 border-black w-10 h-10 rounded-full" />
      <div class="w-full flex self-start">
        <span class="font-bold">{{ authorName }}</span>
        <span class="text-[10px] text-gray-700 font-semibold ml-1">{{ createdAt }}</span>
      </div>
    </header>
    <p class="mt-4">{{ text }}</p>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  authorName: string
  authorPhotoUrl: string
  createdAt: string
}>()
</script>
