<template>
  <form action="" @submit.prevent="postComment">
    <AppTextarea
      v-model="comment.text"
      id="comment-box"
      placeholder="Enter comment!"
      class="w-full sm:!text-xl !border-2"
      :rows="4"
    />
    <AppButton type="submit">Post comment!</AppButton>
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

const route = useRoute()

const store = useStore()

const comment = ref<Comment>({
  text: '',
  blogId: route.params.blogid as string,
  authorName: store.user.displayName as string,
  authorPhotoUrl: store.user.photoURL as string,
  createdAt: new Date()
})

const postComment = async (): Promise<void> => {
  await setDoc(doc(collection(database, 'Comments')), comment.value).then(() => {
    comment.value.text = ''
  })
}
</script>
