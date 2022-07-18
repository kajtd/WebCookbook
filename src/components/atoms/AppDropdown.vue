<template>
  <div ref="container" class="absolute right-2 top-2 bg-white rounded-lg shadow-lg" tabindex="0">
    <div
      v-if="open"
      class="text-base divide-y-2 divide-gray-900 z-30 shadow-lg rounded-lg"
      role="menu"
      aria-orientation="vertical"
      v-click-outside="handleClickOutside"
      aria-labelledby="options-menu"
    >
      <button
        v-for="(item, index) of items"
        :key="index"
        :class="['flex items-center justify-center w-full px-4 py-1', item.additionalClass]"
        @click="handleItemClick(item)"
      >
        <span class="font-semibold my-1">{{ item.label }}</span>
        <Icon v-if="item.icon" :icon="item.icon" class="ml-2" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Item {
  label: string
  icon?: string
  additionalClass?: string
  action: () => void
}

defineProps<{
  open: boolean
  items: Item[]
}>()
const emit = defineEmits(['close'])

const handleItemClick = (item: Item): void => {
  emit('close')
  item.action()
}

const handleClickOutside = (): void => {
  emit('close')
}
</script>
