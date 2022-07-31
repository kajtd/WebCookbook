<template>
  <section id="comments" class="w-full mx-auto max-w-[720px] mb-24">
    <CommentBox />
    <div class="mt-10 flex flex-col gap-4">
      <UserComment
        v-for="(comment, index) in comments"
        :key="index"
        :text="comment.text"
        :authorName="comment.authorName"
        :authorPhotoUrl="comment.authorPhotoUrl"
        :createdAt="(comment.createdAt as unknown as string)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import CommentBox from './../molecules/CommentBox.vue'
import UserComment from './../molecules/UserComment.vue'
import { ref, watchEffect } from 'vue'
import { database } from './../../firebase'
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import Comment from './../../types/Comment'

const props = defineProps<{
  blogId: string
}>()

const comments = ref<Comment[]>([])

watchEffect(() => {
  const customQuery = query(
    collection(database, 'Comments'),
    where('blogId', '==', props.blogId),
    orderBy('createdAt', 'desc')
  )
  onSnapshot(customQuery, snapshot => {
    const posts = snapshot.docs.map(doc => {
      return {
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toDateString()
      } as Comment
    })
    comments.value = posts
  })
})
</script>
