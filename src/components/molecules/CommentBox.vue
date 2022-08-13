<template>
  <form action="" @submit.prevent="postComment">
    <AppTextarea
      v-model="comment.text"
      id="comment-box"
      required
      placeholder="Enter comment!"
      class="w-full sm:!text-xl !border-2"
      :rows="4"
      :disabled="!user.uid"
    />
    <AppButton type="submit" :disabled="!user.uid">Post comment!</AppButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppTextarea from './../atoms/AppTextarea.vue'
import AppButton from './../atoms/AppButton.vue'
import Comment from './../../types/Comment'
import { useStore } from '../../store'
import { collection, doc, setDoc } from '@firebase/firestore'
import { database } from './../../firebase'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRoute()

const store = useStore()

const { user } = storeToRefs(store)

const initialCommentData: Comment = {
  text: '',
  blogId: route.params.blogid as string,
  authorName: '',
  authorPhotoUrl: '',
  createdAt: new Date()
}

const comment = ref<Comment>({ ...initialCommentData })

const postComment = async (): Promise<void> => {
  try {
    comment.value.authorName = user.value.displayName as string
    comment.value.authorPhotoUrl = user.value.photoURL as string
    comment.value.createdAt = new Date()
    await setDoc(doc(collection(database, 'Comments')), comment.value)
    comment.value = { ...initialCommentData }
  } catch (error) {
    console.log(error)
  }
}
</script>
