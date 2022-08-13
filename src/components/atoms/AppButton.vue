<template>
  <router-link v-if="href" :class="['app-button', additionalClass, secondary ? 'secondary' : 'primary']" :to="href">
    <slot />
  </router-link>
  <button
    v-else
    :class="['app-button', additionalClass, secondary ? 'secondary' : 'primary']"
    :type="type || 'button'"
    :aria-label="ariaLabel"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  additionalClass?: string
  secondary?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
  ariaLabel?: string
}>()
</script>

<style scoped>
.app-button {
  @apply border-2 border-gray-900  font-semibold py-2 px-6 rounded-lg text-sm flex items-center justify-center;
}
.primary {
  @apply bg-primary text-gray-100;
}
.secondary {
  @apply bg-blue-300 text-black;
}
</style>
