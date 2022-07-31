<template>
  <FullPageTemplate>
    <main class="w-full flex flex-col justify-center items-center mb-20">
      <HeroSection />
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
import HeroSection from '../components/organisms/HeroSection.vue'
import AppFilters from '../components/molecules/AppFilters.vue'
</script>
