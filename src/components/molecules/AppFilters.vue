<template>
  <div
    class="sticky top-4 h-full w-[450px] hidden sm:flex flex-col gap-3 pr-6 items-start p-4 rounded-lg bg-pinkLight border-2 border-black"
  >
    <h3 class="text-3xl font-semibold">Recipes 🍳</h3>
    <label for="calories" class="font-semibold text-lg">Calories - {{ calories }}</label>
    <input v-model="calories" type="range" name="Calories" min="0" max="1000" id="calories" class="slider" />
    <label for="calories" class="font-semibold text-lg">Cooking time - {{ cookingTime }}</label>
    <input v-model="cookingTime" type="range" name="cooking_time" min="0" max="1000" id="cooking_time" class="slider" />
    <label for="calories" class="font-semibold text-lg">Servings - {{ servings }}</label>
    <input v-model="servings" type="range" name="Servings" min="0" max="1000" id="servings" class="slider" />
    <div class="flex flex-col pt-3">
      <RecipeTag
        v-for="(tag, i) in tags"
        :key="i"
        :id="tag.id"
        :name="tag.name"
        :activeTagId="activeTagId"
        @click="setActiveTagId(tag.id)"
      >
        {{ tag.name }}
      </RecipeTag>
      <AppButton additionalClass="mt-5" @click="filterRecipes">Filter</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppButton from '../atoms/AppButton.vue'
import { onSnapshot, collection } from '@firebase/firestore'
import { database } from '../../firebase'
import RecipeTag from '../atoms/RecipeTag.vue'
import Tag from '../../types/Tag'

const calories = ref(0)
const cookingTime = ref(0)
const servings = ref(0)
const tags = ref<Tag[]>([])
const activeTagId = ref('')

const filterRecipes = (): void => {
  console.log('post filter')
}

const setActiveTagId = (id: string): void => {
  activeTagId.value = id
}

onMounted(async () => {
  await onSnapshot(collection(database, 'Tags'), snapshot => {
    const posts: Tag[] = snapshot.docs.map(doc => doc.data() as Tag)
    tags.value = posts
  })
})
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  appearance: none;
  @apply rounded-full w-full h-4 bg-white shadow border border-black;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  @apply bg-primary rounded-full w-4 h-4 shadow;
}
.slider::-moz-range-thumb {
  @apply bg-primary;
}
</style>
