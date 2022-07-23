<template>
  <div
    class="sticky top-24 h-full w-[450px] hidden sm:flex flex-col gap-3 pr-6 items-start p-4 rounded-lg bg-pinkLight border-2 border-black"
  >
    <h3 class="text-3xl font-semibold">Recipes 🍳</h3>
    <label for="calories" class="font-semibold text-lg">Max calories - {{ calories }}</label>
    <input v-model.number="calories" type="range" name="Calories" min="0" max="3000" id="calories" class="slider" />
    <label for="calories" class="font-semibold text-lg"> Max cooking time - {{ formatCookingTime(cookingTime) }}</label>
    <input
      v-model.number="cookingTime"
      type="range"
      name="cooking_time"
      min="0"
      max="480"
      id="cooking_time"
      class="slider"
    />
    <div class="flex flex-col max-w-[120px] pt-3">
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
    </div>
    <div class="w-full flex flex-col md:flex-row items-start gap-2 mt-3">
      <AppButton @click="filterRecipes">Filter</AppButton>
      <AppButton secondary @click="resetRecipes">Reset filters</AppButton>
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
import { formatCookingTime, convertTimeToMinutes } from '../../utils/util'
import { useStore } from '../../store'

const store = useStore()

const calories = ref(0)
const cookingTime = ref(0)
const tags = ref<Tag[]>([])
const activeTagId = ref('')

const filterRecipes = async (): Promise<void> => {
  store.recipes.map(recipe => {
    const tagValidation = recipe.tagId === activeTagId.value || activeTagId.value === ''
    const caloriesValidation = Number(recipe.calories) <= calories.value || calories.value === 0
    const cookingTimeValidation =
      convertTimeToMinutes(recipe.cookingTime) <= cookingTime.value || cookingTime.value === 0
    if (tagValidation && caloriesValidation && cookingTimeValidation) {
      recipe.visible = true
      return
    }
    recipe.visible = false
  })
}

const resetRecipes = (): void => {
  calories.value = 0
  cookingTime.value = 0
  activeTagId.value = ''
  store.recipes.map(recipe => {
    recipe.visible = true
  })
}

const setActiveTagId = (id: string): void => {
  if (activeTagId.value === id) {
    activeTagId.value = ''
    return
  }
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
