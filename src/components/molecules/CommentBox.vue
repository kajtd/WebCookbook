<template>
  <AppTextarea
    v-model="comment.text"
    id="comment-box"
    placeholder="Enter comment!"
    class="w-full !text-xl !border-2"
    :rows="4"
  />
  <AppButton>Post comment!</AppButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppTextarea from './../atoms/AppTextarea.vue'
import AppButton from './../atoms/AppButton.vue'
import Comment from './../../types/Comment'
import { useStore } from '../../store'

const store = useStore()

const comment = ref<Comment>({
  text: '',
  authorName: store.user.displayName as string,
  authorPhotoUrl: store.user.photoURL as string,
  createdAt: new Date()
})
</script>
