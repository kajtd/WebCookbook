<template>
  <section class="w-full mx-auto max-w-[720px] mb-24">
    <CommentBox />
    <div class="mt-10 flex flex-col gap-4">
      <UserComment
        v-for="(comment, index) in comments"
        :key="index"
        :text="comment.text"
        :authorName="comment.authorName"
        :authorPhotoUrl="comment.authorPhotoUrl"
        :createdAt="comment.createdAt"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import CommentBox from './../molecules/CommentBox.vue'
import UserComment from './../molecules/UserComment.vue'
import { ref } from 'vue'

const comments = ref([
  {
    text: 'This is amazing recipe! Thank you for posting this gem here!',
    authorPhotoUrl: 'https://ui-avatars.com/api/?name=Ko&background=E1434B&color=fff',
    authorName: 'John Doe',
    createdAt: '2022-04-03'
  },
  {
    text: 'Do you have some other pizza recipe?',
    authorPhotoUrl: 'https://ui-avatars.com/api/?name=Ol&background=E1434B&color=fff',
    authorName: 'Tom Johnes',
    createdAt: '2020-01-01'
  },
  {
    text: 'This is great! I love it!',
    authorPhotoUrl: 'https://ui-avatars.com/api/?name=MT&background=E1434B&color=fff',
    authorName: 'Matthew Green',
    createdAt: '2021-05-22'
  }
])
</script>
