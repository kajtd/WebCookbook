<template>
  <router-link v-if="href" :class="['btn-primary', additionalClass]" :to="href">
    <slot />
  </router-link>
  <button v-else :class="['btn-primary', additionalClass]" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  additionalClass?: string
  size?: string
  type?: 'button' | 'submit' | 'reset'
  href?: string
}>()
</script>

<style scoped>
.btn-primary {
  @apply border-2 border-gray-900 bg-primary text-gray-100 font-semibold py-2 px-6 rounded-lg text-sm flex items-center justify-center;
}
</style>
