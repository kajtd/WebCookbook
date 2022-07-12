<template>
  <router-link :to="`/recipes/${id}`">
    <article
      class="relative bg-pinkLight h-48 border-2 border-black rounded-xl flex flex-col items-center justify-between"
    >
      <button class="w-7 h-7 bg-transparent border-none absolute right-1 top-1 text-xl">
        <Icon icon="bi:three-dots" color="black" />
      </button>
      <div class="flex items-center justify-between pl-2 py-3 w-full h-3/4">
        <img :src="image" :alt="title" class="h-full rounded-xl object-cover min-w-[120px] w-full" />
        <div class="h-full w-full flex flex-col justify-center pl-5">
          <p class="text-xl font-bold mt-10 mb-auto">{{ title }}</p>
          <p class="text-xs font-semibold text-gray-800 flex items-center">
            <img :src="authorPhotoUrl" alt="" class="w-6 h-6 rounded-full" />
            <span class="ml-1 self-end">{{ authorName }}</span>
          </p>
        </div>
      </div>
      <footer class="w-full h-1/4 flex items-center justify-between px-2 py-1 border-t-2 border-black">
        <p class="font-bold text-sm ml-1">42 likes</p>
        <div class="ml-auto flex gap-1">
          <AppButton additionalClass="w-7 h-7 !px-1 !bg-blue-300">
            <Icon icon="akar-icons:comment" color="black" />
          </AppButton>
          <AppButton additionalClass="w-7 h-7 !px-1"><Icon icon="ant-design:heart-outlined" /></AppButton>
        </div>
      </footer>
    </article>
  </router-link>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppButton from '../atoms/AppButton.vue'

defineProps<{
  id: string
  title: string
  authorName: string
  authorPhotoUrl: string
  image: string
}>()
</script>
