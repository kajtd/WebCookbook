<template>
  <div
    :class="[
      'z-[1] w-full rounded-full border-2 border-black h-16 bg-white flex items-center justify-between pr-2 gap-2',
      fullscreen ? 'max-w-5xl' : 'max-w-lg'
    ]"
  >
    <input
      v-model="store.searchQuery"
      placeholder="Search articles"
      class="w-[80%] h-full text-sm sm:text-base pl-6 border-black rounded-l-full placeholder:text-sm sm:placeholder:text-base outline-none focus:border focus:border-r-4"
    />
    <div class="rounded-full z-10 bg-primary !h-12 !w-12 flex items-center justify-center border-2 border-black">
      <Icon icon="akar-icons:search" class="h-full text-lg sm:text-2xl text-white" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useStore } from './../../store'
import { useRoute } from 'vue-router'

defineProps<{
  fullscreen?: boolean
}>()

const route = useRoute()
const store = useStore()

watch(
  () => store.searchQuery,
  newValue => {
    if (newValue) {
      store.searchedRecipes = store.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(newValue.toLowerCase())
      )
    } else {
      store.searchedRecipes = []
    }
  }
)

// clear search bar when route changes
watch(
  () => route.fullPath,
  () => {
    store.searchQuery = ''
    store.searchedRecipes = []
  }
)
</script>
