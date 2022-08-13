<template>
  <div class="flex flex-col justify-between items-center min-h-screen w-full">
    <HeaderNavigation @toggle-login-popup="toggleLoginPopup" />
    <slot />
    <AppFooter @toggle-login-popup="toggleLoginPopup" />
    <AppButton
      v-if="user.uid"
      ariaLabel="toggle create recipe form"
      additionalClass="!rounded-full bottom-4 right-4 fixed h-16 w-16 !p-0 !shadow-xl"
      @click="toggleCreateRecipeForm"
    >
      <Icon icon="akar-icons:circle-plus" class="text-2xl" />
    </AppButton>
    <AppPopup :popup-visible="loginPopupVisible" @toggle-popup="toggleLoginPopup">
      <LoginForm />
    </AppPopup>
    <CreateRecipeForm v-if="user.uid" :form-visible="processingRecipe" @toggle-form="toggleCreateRecipeForm" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import HeaderNavigation from './../organisms/HeaderNavigation.vue'
import AppFooter from './../organisms/AppFooter.vue'
import AppPopup from '../global/AppPopup.vue'
import LoginForm from '../molecules/LoginForm.vue'
import AppButton from '../atoms/AppButton.vue'
import CreateRecipeForm from '../organisms/CreateRecipeForm.vue'
import { useStore } from './../../store'
import { storeToRefs } from 'pinia'

const loginPopupVisible = ref(false)
const store = useStore()
const { user, processingRecipe } = storeToRefs(store)
const { toggleCreateRecipeForm } = useStore()

const toggleLoginPopup = (): void => {
  loginPopupVisible.value = !loginPopupVisible.value
  document.body.classList.toggle('fixed-bg')
}
</script>
