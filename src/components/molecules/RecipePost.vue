<template>
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
        <p class="text-xs font-semibold text-gray-800 flex items-center gap-2">
          <img
            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
            alt=""
            class="w-8 h-8 rounded-full border-2 border-black p-[2px]"
          />
          {{ author }}
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
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppButton from '../atoms/AppButton.vue'

defineProps<{
  id: number
  title: string
  author: string
  image: string
}>()
</script>
