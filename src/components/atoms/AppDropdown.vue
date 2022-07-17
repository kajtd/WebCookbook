<template>
  <div ref="container" class="absolute right-2 top-2" tabindex="0">
    <div v-if="open" class="z-30 rounded-lg shadow-lg bg-white py-2">
      <div
        class="rounded-md divide-y-2 py-1 text-lg px-6"
        role="menu"
        aria-orientation="vertical"
        v-click-outside="handleClickOutside"
        aria-labelledby="options-menu"
      >
        <button v-for="(item, index) of items" :key="index" class="flex items-center" @click="handleItemClick(item)">
          <span class="font-semibold my-1">{{ item.label }}</span>
          <Icon v-if="item.icon" :icon="item.icon" class="ml-2" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Item {
  label: string
  icon?: string
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
