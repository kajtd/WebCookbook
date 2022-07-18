<template>
  <section class="w-full grid grid-cols-1 md:grid-cols-[320px_320px] gap-2 justify-end">
    <RecipePost
      v-for="recipe in store.recipes"
      :key="recipe.id"
      :id="recipe.id"
      :title="recipe.title"
      :authorName="recipe.authorName"
      :authorPhotoUrl="recipe.authorPhotoUrl"
      :authorId="recipe.authorId"
      :image="recipe.image"
      :likes="recipe.likes"
    />
  </section>
</template>

<script setup lang="ts">
import { database, onSnapshot, collection } from './../../firebase'
import { onMounted } from 'vue'
import { useStore } from './../../store'
import RecipePost from './../molecules/RecipePost.vue'
import { Recipe } from './../../types/Recipe'
const store = useStore()

onMounted(async () => {
  onSnapshot(collection(database, 'Recipes'), snapshot => {
    const posts = snapshot.docs.map(doc => doc.data())
    store.recipes = posts as Recipe[]
  })
})
</script>
