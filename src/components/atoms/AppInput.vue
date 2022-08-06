<template>
  <input
    :id="id"
    :ref="ref"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    :class="[
      ' text-sm text-gray-900  border-2 rounded-lg border-gray-800 mb-3 py-2 px-3 font-semibold placeholder:text-sm placeholder:text-gray-900 placeholder:font-semibold focus:outline-none focus:border-primary',
      { 'pointer-events-none opacity-50': disabled }
    ]"
    @input="$emit('update:modelValue', ($event.target  as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
defineProps<{
  id: string
  ref?: string
  type?: string
  modelValue: string | number
  placeholder?: string
  disabled?: boolean
  required?: boolean
}>()

defineEmits(['update:modelValue'])
</script>
