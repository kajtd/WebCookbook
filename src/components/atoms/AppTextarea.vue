<template>
  <textarea
    ref="textarea"
    :id="id"
    :value="modelValue"
    :rows="rows || 2"
    :required="required"
    :disabled="disabled"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :class="[
      'text-sm text-gray-900  border-2 rounded-lg border-gray-800 mb-3 py-2 px-3  font-semibold placeholder:text-sm placeholder:text-gray-900 placeholder:font-semibold focus:outline-none focus:border-primary',
      { 'pointer-events-none opacity-50': disabled }
    ]"
    @input="$emit('update:modelValue', ($event.target  as HTMLTextAreaElement).value)"
  />
</template>

<script setup lang="ts">
defineProps<{
  id: string
  modelValue: string
  rows?: number
  placeholder?: string
  disabled?: boolean
  required?: boolean
  autocomplete?: string
}>()
</script>
