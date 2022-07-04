<template>
  <header class="flex items-center justify-between max-w-5xl w-full mx-auto px-4 my-8">
    <AppLogo />
    <HamburgerMenuButton v-model.sync="mobileNav" />
    <nav class="hidden md:flex items-center justify-start">
      <ul class="flex items-center gap-6">
        <li v-for="link in links" :key="link.name">
          <HeaderNavigationLink :link="link" />
        </li>
        <AppButton
          v-if="Object.keys(store.user).length === 0 && store.user.constructor === Object"
          @click="toggleLoginPopup"
        >
          Login
        </AppButton>
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
        <AppButton additionalClass="mt-auto self-start text-xl" href="/login">Login</AppButton>
      </nav>
    </transition>
  </header>
  <AppPopup :popup-visible="loginPopupVisible" @toggle-popup="toggleLoginPopup">
    <LoginForm />
  </AppPopup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppButton from '../atoms/AppButton.vue'
import AppPopup from '../global/AppPopup.vue'
import LoginForm from '../molecules/LoginForm.vue'
import HeaderNavigationLink from '../atoms/HeaderNavigationLink.vue'
import HamburgerMenuButton from '../atoms/HamburgerMenuButton.vue'
import AppLogo from '../atoms/AppLogo.vue'
import { useStore } from './../../store/index'
import Link from './../../types/Link'

const store = useStore()

const mobileNav = ref(false)
const loginPopupVisible = ref(false)

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

const toggleLoginPopup = (): void => {
  loginPopupVisible.value = !loginPopupVisible.value
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
