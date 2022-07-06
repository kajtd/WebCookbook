<template>
  <footer class="w-full mt-auto border-t-4 border-black pt-4 bg-blueLight">
    <div class="max-w-5xl mx-auto px-8 py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between">
        <ul class="flex flex-col mb-10 gap-5 sm:mb-0">
          <li v-for="link in links" :key="link.name">
            <HeaderNavigationLink :link="link" />
          </li>
        </ul>
        <div v-if="!store.user.uid" class="flex flex-col sm:flex-row items-center">
          <span class="text-xl sm:text-3xl font-semibold mb-4 sm:mr-8 sm:mb-0">Not logged in yet? </span>
          <AppButton additionalClass="!hidden md:!flex" @click="$emit('toggleLoginPopup')">Login</AppButton>
          <AppButton additionalClass="md:!hidden flex" href="/login">Login</AppButton>
        </div>
        <span v-else class="text-xl sm:text-3xl font-semibold mr-5 text-center sm:text-left">
          Thanks for using our app 🧡
        </span>
      </div>
      <span class="block text-sm text-black font-semibold text-center mt-8 pt-8 border-t border-gray-500">
        © 2022 Web-cookbook 🍒. All Rights Reserved.
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Link from './../../types/Link'
import HeaderNavigationLink from './../atoms/HeaderNavigationLink.vue'
import AppButton from '../atoms/AppButton.vue'
import { useStore } from '../../store'

defineEmits(['toggleLoginPopup'])

const store = useStore()

const links = ref<Link[]>([
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Explore',
    url: '/explore'
  },
  {
    name: 'About',
    url: '/about'
  }
])
</script>
