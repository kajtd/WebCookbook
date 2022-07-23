<template>
  <FullPageTemplate>
    <main class="w-full flex flex-col mt-5 mb-20 px-4">
      <h2 class="mt-12 mb-20 text-3xl sm:text-5xl font-bold text-center">Explore recipes 🧐</h2>
      <SearchBar fullscreen />
      <div class="flex justify-center pt-8 px-4 w-full max-w-5xl gap-12">
        <AppFilters />
        <RecipePostsFeed />
      </div>
    </main>
  </FullPageTemplate>
</template>

<script setup lang="ts">
import RecipePostsFeed from '../components/organisms/RecipePostsFeed.vue'
import FullPageTemplate from '../components/templates/FullPageTemplate.vue'
import AppFilters from '../components/molecules/AppFilters.vue'
import SearchBar from '../components/molecules/SearchBar.vue'
</script>
