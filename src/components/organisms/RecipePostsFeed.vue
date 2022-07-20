<template>
  <section
    v-if="recipesToShow.length > 0 || !store.searchQuery"
    class="w-full grid grid-cols-1 md:grid-cols-[320px_320px] gap-2 justify-end"
    ref="scrollComponent"
  >
    <RecipePost
      v-for="recipe in recipesToShow"
      :key="recipe.id"
      :id="recipe.id"
      :title="recipe.title"
      :authorName="recipe.authorName"
      :authorPhotoUrl="recipe.authorPhotoUrl"
      :authorId="recipe.authorId"
      :image="recipe.image"
      :likes="recipe.likes"
    />
    <AppLoader class="mx-auto mt-3 md:col-span-full" v-show="store.loading" />
  </section>
  <section v-else class="w-full flex items-center justify-center">
    <h3 class="text-3xl font-semibold">No recipes found 😕</h3>
  </section>
</template>

<script setup lang="ts">
import { database } from './../../firebase'
import { getDocs, collection, query, orderBy, limit, startAfter, Query, DocumentData } from 'firebase/firestore'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useStore } from './../../store'
import RecipePost from './../molecules/RecipePost.vue'
import { Recipe } from './../../types/Recipe'
import AppLoader from '../atoms/AppLoader.vue'
const store = useStore()

const latestDocKey = ref<Date>()
const scrollComponent = ref<HTMLDivElement>()
const postsLoaded = ref(false)
const currentBatch = ref(0)
const allBatches = ref<Number[]>([])

const recipesToShow = computed(() => (store.searchQuery ? store.searchedRecipes : store.recipes))

onMounted(async () => {
  const customQuery = query(collection(database, 'Recipes'), orderBy('createdAt', 'desc'), limit(12))
  await fetchRecipes(customQuery)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  store.recipes = []
})

const fetchRecipes = async (customQuery: Query<DocumentData>): Promise<void> => {
  store.loading = true
  let posts: Recipe[] = []
  const querySnapshot = await getDocs(customQuery)
  querySnapshot.forEach(doc => {
    posts.push(doc.data() as Recipe)
  })
  store.recipes = [...store.recipes, ...posts]
  store.loading = false
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

const handleScroll = async () => {
  if (!scrollComponent.value) return
  let element = scrollComponent.value as HTMLDivElement
  const newBatch = allBatches.value.indexOf(currentBatch.value) === -1
  if (element.getBoundingClientRect().bottom < window.innerHeight && newBatch) {
    allBatches.value.push(currentBatch.value)
    await loadMoreRecipes()
  }
}
</script>
