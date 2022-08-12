<template>
  <div
    v-if="recipesVisible"
    class="w-full grid grid-cols-1 lg:grid-cols-[320px_320px] gap-2 justify-end"
    ref="scrollComponent"
  >
    <RecipePost
      v-for="recipe in recipes"
      :key="recipe.id"
      :id="recipe.id"
      :title="recipe.title"
      :authorName="recipe.authorName"
      :authorPhotoUrl="recipe.authorPhotoUrl"
      :authorId="recipe.authorId"
      :image="recipe.image"
      :likes="recipe.likes"
      :visible="recipe.visible"
    />
  </div>
  <div v-else-if="loading" class="w-full flex justify-center items-center">
    <AppLoader class="mx-auto mt-3 md:col-span-full" />
  </div>
  <div v-else class="w-full flex items-start justify-center min-h-[300px] mt-8">
    <h3 class="text-3xl font-semibold">No recipes found 😕</h3>
  </div>
</template>

<script setup lang="ts">
import { database } from './../../firebase'
import { getDocs, collection, query, orderBy, limit, startAfter, Query, DocumentData } from 'firebase/firestore'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useStore } from './../../store'
import RecipePost from './../molecules/RecipePost.vue'
import { Recipe } from './../../types/Recipe'
import AppLoader from '../atoms/AppLoader.vue'
import { storeToRefs } from 'pinia'

const store = useStore()
const { recipes, loading } = storeToRefs(store)
const latestDocKey = ref<Date>()
const scrollComponent = ref<HTMLDivElement>()
const postsLoaded = ref(false)
const currentBatch = ref(0)
const allBatches = ref<number[]>([])

const recipesVisible = computed(() => recipes.value.length > 0 && recipes.value.some(recipe => recipe.visible))

onMounted(async () => {
  const customQuery = query(collection(database, 'Recipes'), orderBy('createdAt', 'desc'), limit(12))
  await fetchRecipes(customQuery)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  recipes.value = []
})

const fetchRecipes = async (customQuery: Query<DocumentData>): Promise<void> => {
  loading.value = true
  let posts: Recipe[] = []
  const querySnapshot = await getDocs(customQuery)
  querySnapshot.forEach(doc => {
    posts.push(doc.data() as Recipe)
  })
  recipes.value = [...recipes.value, ...posts]
  loading.value = false
  latestDocKey.value = posts[posts.length - 1]?.createdAt
  if (querySnapshot.empty) postsLoaded.value = true
}

const loadMoreRecipes = async (): Promise<void> => {
  if (postsLoaded.value) return
  const customQuery = query(
    collection(database, 'Recipes'),
    orderBy('createdAt', 'desc'),
    limit(12),
    startAfter(latestDocKey.value)
  )
  await fetchRecipes(customQuery)
  currentBatch.value++
}

const handleScroll = async (): Promise<void> => {
  if (!scrollComponent.value) return
  let element = scrollComponent.value as HTMLDivElement
  const newBatch = allBatches.value.indexOf(currentBatch.value) === -1
  if (element.getBoundingClientRect().bottom < window.innerHeight && newBatch) {
    allBatches.value.push(currentBatch.value)
    await loadMoreRecipes()
  }
}
</script>
