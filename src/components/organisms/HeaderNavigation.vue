<template>
  <header
    class="flex items-center justify-between w-full mx-auto px-4 md:px-8 py-6 bg-orangeLight border-b-4 border-black z-[3]"
  >
    <div class="max-w-5xl w-full mx-auto flex items-center justify-between">
      <AppLogo />
      <HamburgerMenuButton :checked="mobileNav" @toggle-mobile-nav="toggleMobileNav" />
      <nav class="hidden md:flex items-center justify-start">
        <ul class="flex items-center gap-6">
          <li v-for="link in links" :key="link.name">
            <HeaderNavigationLink :link="link" />
          </li>
          <AppButton
            v-if="Object.keys(store.user).length === 0 && store.user.constructor === Object"
            @click="$emit('toggleLoginPopup')"
          >
            Login
          </AppButton>
          <img
            v-else-if="store.user.photoURL"
            :src="store.user.photoURL"
            class="rounded-full h-10 w-10 border-2 border-black"
          />
        </ul>
      </nav>
      <transition name="mobile-nav">
        <nav v-show="mobileNav" class="md:hidden flex flex-col h-full fixed bottom-0 left-0 p-8 w-full bg-white z-30">
          <ul class="mt-auto">
            <li
              v-for="link in links"
              :key="link.name"
              class="text-3xl py-6 font-semibold transition duration-300 cursor-pointer text-gray-900"
            >
              <button @click="toggleMobileNav">
                <HeaderNavigationLink :link="link" />
              </button>
            </li>
          </ul>
          <AppButton
            v-if="Object.keys(store.user).length === 0 && store.user.constructor === Object"
            additionalClass="mt-auto self-start text-xl"
            @click="$emit('toggleLoginPopup')"
          >
            Login
          </AppButton>
          <img
            v-else-if="store.user.photoURL"
            :src="store.user.photoURL"
            class="rounded-full h-12 w-12 border-2 border-black mt-auto"
          />
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '../atoms/AppButton.vue'
import HeaderNavigationLink from '../atoms/HeaderNavigationLink.vue'
import HamburgerMenuButton from '../atoms/HamburgerMenuButton.vue'
import AppLogo from '../atoms/AppLogo.vue'
import { useStore } from './../../store/index'
import Link from './../../types/Link'

defineEmits(['toggleLoginPopup'])

const store = useStore()

const mobileNav = ref(false)

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

const toggleMobileNav = (): void => {
  mobileNav.value = !mobileNav.value
  document.body.classList.toggle('fixed-bg')
}
</script>

<style scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 0.2s ease-in-out;
}
.mobile-nav-enter-from {
  transform: translateX(100%);
}
.mobile-nav-enter-to {
  transform: translateX(0);
}
.mobile-nav-leave-to {
  transform: translateX(100%);
}
</style>
