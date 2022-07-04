<template>
  <div
    v-show="popupVisible"
    class="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] sm:w-auto"
  >
    <button type="button" class="absolute top-3 right-3 cursor-pointer" @click="$emit('togglePopup')">
      <Icon icon="eva:close-fill" class="text-3xl" />
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  popupVisible: boolean
}>()
defineEmits(['togglePopup'])
</script>
