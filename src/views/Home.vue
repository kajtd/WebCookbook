<template>
  <FullPageTemplate>
    <div class="w-full flex flex-col justify-center items-center mb-20">
      <HeroSection />
      <div class="flex pt-8 px-4 w-full max-w-5xl gap-12">
        <RecipePostsFeed />
      </div>
    </div>
  </FullPageTemplate>
</template>

<script setup lang="ts">
import RecipePostsFeed from '../components/organisms/RecipePostsFeed.vue'
import FullPageTemplate from '../components/templates/FullPageTemplate.vue'
import HeroSection from '../components/organisms/HeroSection.vue'
</script>
