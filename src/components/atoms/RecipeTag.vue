<template>
  <button
    :class="[
      'font-semibold text-sm bg-white p-2 rounded-lg border-2 border-black my-1',
      { 'bg-gray-200 opacity-90': activeTagId === id }
    ]"
    :type="type || 'button'"
  >
    {{ name }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  name: string
  activeTagId: string
  type?: 'button' | 'submit' | 'reset'
}>()
</script>
