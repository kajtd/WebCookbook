<template>
  <div class="flex flex-col justify-between items-center min-h-screen w-full">
    <HeaderNavigation @toggle-login-popup="toggleLoginPopup" />
    <slot />
    <AppFooter @toggle-login-popup="toggleLoginPopup" />
    <AppPopup :popup-visible="loginPopupVisible" @toggle-popup="toggleLoginPopup">
      <LoginForm />
    </AppPopup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderNavigation from './../organisms/HeaderNavigation.vue'
import AppFooter from './../organisms/AppFooter.vue'
import AppPopup from '../global/AppPopup.vue'
import LoginForm from '../molecules/LoginForm.vue'

const loginPopupVisible = ref(false)

const toggleLoginPopup = (): void => {
  loginPopupVisible.value = !loginPopupVisible.value
}
</script>
