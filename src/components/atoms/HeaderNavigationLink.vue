<template>
  <router-link :to="link.url" class="inline-block">
    <span class="font-semibold hover:text-primary transition"> {{ link.name }}</span>
  </router-link>
</template>

<script setup lang="ts">
import Link from './../../types/Link'

defineProps<{
  link: Link
}>()
</script>
