<template>
  <button
    :class="[
      'border-2 border-gray-900 bg-primary text-gray-100 font-semibold py-2 px-6 rounded-lg text-sm flex items-center justify-center',
      additionalClass
    ]"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  additionalClass?: string
  size?: string
  type?: 'button' | 'submit' | 'reset'
}>()
</script>
