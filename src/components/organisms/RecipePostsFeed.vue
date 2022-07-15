<template>
  <section class="w-full grid grid-cols-1 md:grid-cols-[320px_320px] gap-2 justify-center">
    <RecipePost
      v-for="recipe in recipes"
      :key="recipe.id"
      :id="recipe.id"
      :title="recipe.title"
      :authorName="recipe.authorName"
      :authorPhotoUrl="recipe.authorPhotoUrl"
      :image="recipe.image"
      :likes="recipe.likes"
    />
  </section>
</template>

<script setup lang="ts">
import { database, onSnapshot, collection } from './../../firebase'
import { ref, onMounted } from 'vue'
import RecipePost from './../molecules/RecipePost.vue'

const recipes = ref<any[]>([])

onMounted(async () => {
  onSnapshot(collection(database, 'Recipes'), snapshot => {
    const posts = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    recipes.value = posts
  })
})
</script>
