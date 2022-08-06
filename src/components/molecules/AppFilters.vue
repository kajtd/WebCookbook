<template>
  <button
    class="md:hidden fixed top-1/2 left-0 -translate-y-1/2 bg-orangeLight p-4 rounded-r-md shadow-xl text-black border-2 border-black text-xl z-[2]"
    aria-label="filters"
    @click="toggleFiltersSidebar"
  >
    <Icon icon="bi:filter-square" />
  </button>
  <Transition name="filters-sidebar">
    <div
      v-show="filtersVisible"
      class="fixed top-0 z-20 w-full border-none bg-white md:sticky md:top-24 h-full md:w-[450px] flex md:!flex md:z-auto flex-col gap-3 pr-6 justify-center md:justify-start items-start p-4 md:rounded-lg md:bg-pinkLight md:border-solid border-2 border-black"
    >
      <button
        class="md:hidden absolute top-0 right-0 mx-6 my-8 text-xl bg-orangeLight p-2 rounded-md border-2 border-black"
        @click="toggleFiltersSidebar"
      >
        <Icon icon="ep:close-bold" />
      </button>
      <h3 class="text-3xl font-semibold">Recipes 🍳</h3>
      <label for="calories" class="font-semibold text-lg">Max calories - {{ calories }}</label>
      <input v-model.number="calories" type="range" name="Calories" min="0" max="3000" id="calories" class="slider" />
      <label for="cooking_time" class="font-semibold text-lg">
        Max cooking time - {{ formatCookingTime(cookingTime) }}
      </label>
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
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppButton from '../atoms/AppButton.vue'
import { onSnapshot, collection } from '@firebase/firestore'
import { database } from '../../firebase'
import RecipeTag from '../atoms/RecipeTag.vue'
import Tag from '../../types/Tag'
import { Recipe } from '../../types/Recipe'
import { formatCookingTime, convertTimeToMinutes } from '../../utils/util'
import { useStore } from '../../store'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'

const store = useStore()
const { recipes } = storeToRefs(store)

const calories = ref(0)
const cookingTime = ref(0)
const tags = ref<Tag[]>([])
const activeTagId = ref('')
const filtersVisible = ref(false)

const validateRecipe = (recipe: Recipe): boolean => {
  const validations: boolean[] = [
    recipe.calories <= calories.value || calories.value === 0,
    convertTimeToMinutes(recipe.cookingTime) <= cookingTime.value || cookingTime.value === 0,
    recipe.tagId === activeTagId.value || activeTagId.value === ''
  ]
  return !validations.includes(false)
}

const filterRecipes = async (): Promise<void> => {
  recipes.value.forEach(recipe => {
    if (validateRecipe(recipe)) {
      recipe.visible = true
      return
    }
    recipe.visible = false
  })
  // toggle sidebar on mobile
  if (window.innerWidth < 768) toggleFiltersSidebar()
}

const resetRecipes = (): void => {
  calories.value = 0
  cookingTime.value = 0
  activeTagId.value = ''
  recipes.value.forEach(recipe => {
    recipe.visible = true
  })
  // toggle sidebar on mobile
  if (window.innerWidth < 768) toggleFiltersSidebar()
}

const setActiveTagId = (id: string): void => {
  if (activeTagId.value === id) {
    activeTagId.value = ''
    return
  }
  activeTagId.value = id
}

const toggleFiltersSidebar = (): void => {
  filtersVisible.value = !filtersVisible.value
  document.body.classList.toggle('fixed-bg')
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

.filters-sidebar-enter-active,
.filters-sidebar-leave-active {
  transition: all 0.2s ease-in-out;
}
.filters-sidebar-enter-from {
  transform: translateX(100%);
}
.filters-sidebar-enter-to {
  transform: translateX(0);
}
.filters-sidebar-leave-to {
  transform: translateX(100%);
}
</style>
