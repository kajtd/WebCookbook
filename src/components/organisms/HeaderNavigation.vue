<template>
  <header
    class="sticky top-0 flex items-center justify-between w-full mx-auto px-4 md:px-8 py-6 bg-orangeLight border-b-4 border-black z-[3]"
  >
    <div class="max-w-5xl w-full mx-auto flex items-center justify-between">
      <AppLogo />
      <HamburgerMenuButton :checked="mobileNav" @toggle-mobile-nav="toggleMobileNav" />
      <nav class="hidden md:flex items-center justify-start">
        <ul class="flex items-center gap-6">
          <li v-for="link in links" :key="link.name">
            <AppNavigationLink :link="link" />
          </li>
          <li>
            <AppButton v-if="!store.user.uid" @click="$emit('toggleLoginPopup')"> Login </AppButton>
            <div v-else class="relative w-full flex items-center justify-center">
              <button @click="logoutDropdownVisible = true">
                <img
                  v-if="store.user.photoURL"
                  :src="store.user.photoURL"
                  class="rounded-full h-10 w-10 border-2 border-black"
                />
              </button>
              <AppDropdownMenu :open.sync="logoutDropdownVisible" @close="closeDropdown">
                <div class="gap-2 w-full px-8 py-4">
                  <p class="font-semibold text-base pb-2 border-b-2 border-black mb-5 text-center">
                    {{ store.user.displayName }}
                  </p>
                  <AppButton @click="logout">Logout</AppButton>
                </div>
              </AppDropdownMenu>
            </div>
          </li>
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
                <AppNavigationLink :link="link" />
              </button>
            </li>
          </ul>
          <AppButton
            v-if="Object.keys(store.user).length === 0 && store.user.constructor === Object"
            additionalClass="mt-auto self-start text-xl"
            @click="
              () => {
                toggleMobileNav()
                $emit('toggleLoginPopup')
              }
            "
          >
            Login
          </AppButton>
          <div v-else class="relative w-full mt-auto">
            <button @click="logoutDropdownVisible = true">
              <img
                v-if="store.user.photoURL"
                :src="store.user.photoURL"
                class="rounded-full h-10 w-10 border-2 border-black"
              />
            </button>
            <AppDropdownMenu
              additionalClass="left-4 bottom-4 right-auto top-auto"
              :open.sync="logoutDropdownVisible"
              @close="closeDropdown"
            >
              <div class="gap-2 w-full px-8 py-4">
                <p class="font-semibold text-base pb-2 border-b-2 border-black mb-5 text-center">
                  {{ store.user.displayName }}
                </p>
                <AppButton @click="logout">Logout</AppButton>
              </div>
            </AppDropdownMenu>
          </div>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '../atoms/AppButton.vue'
import AppNavigationLink from '../atoms/AppNavigationLink.vue'
import HamburgerMenuButton from '../atoms/HamburgerMenuButton.vue'
import AppLogo from '../atoms/AppLogo.vue'
import AppDropdownMenu from '../atoms/AppDropdownMenu.vue'
import { useStore } from './../../store/index'
import Link from './../../types/Link'
import { signOut } from 'firebase/auth'
import { auth } from './../../firebase'

defineEmits(['toggleLoginPopup'])

const store = useStore()

const mobileNav = ref(false)
const logoutDropdownVisible = ref(false)

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

const closeDropdown = (): void => {
  logoutDropdownVisible.value = false
}

const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
    closeDropdown()
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

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
