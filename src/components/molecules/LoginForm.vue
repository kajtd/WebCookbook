<template>
  <article
    class="w-full max-w-xs bg-white flex flex-col justify-center items-center py-5 px-6 rounded-lg border-4 border-black"
  >
    <header class="w-full">
      <div class="flex items-center justify-center mb-8 gap-3">
        <button class="text-gray-800 font-bold text-sm" @click="signingUp = false">Sign In</button>
        <button class="text-gray-800 font-bold text-sm" @click="signingUp = true">Sign Up</button>
      </div>
    </header>

    <h2 class="text-center text-2xl font-bold">Welcome 👋</h2>

    <div v-if="signingUp">
      <p class="text-center text-gray-800 font-medium mt-1">Create a new account and start using this app!</p>
      <form class="w-full flex flex-col justify-center mt-5" action="" @submit.prevent="handleSignUpSubmit">
        <AppInput v-model="email" id="email" type="email" name="email" placeholder="Email" required />
        <AppInput v-model="password" id="password" name="password" type="password" placeholder="Password" required />
        <AppInput
          v-model="repeatedPassword"
          id="repeatedPassword"
          name="repeatedPassword"
          type="password"
          placeholder="Repeat password"
          required
        />
        <div class="flex flex-col justify-center my-3">
          <AppButton type="submit">Sign Up</AppButton>
          <button class="text-gray-800 font-bold text-sm mt-4 self-center">Already have an account?</button>
        </div>
      </form>
    </div>

    <div v-else>
      <p class="text-center text-gray-800 font-medium mt-1">Sign in to create recipes!</p>
      <form class="w-full flex flex-col justify-center mt-5" action="" @submit.prevent="handleSignInSubmit">
        <AppInput v-model="email" id="email" type="email" name="email" placeholder="Email" required />
        <AppInput v-model="password" id="password" name="password" type="password" placeholder="Password" required />
        <AppButton type="button" additionalClass="mt-2" @click="signInWithGoogle">
          <span>{{ !loading ? 'Sign In With Google' : 'Signing In...' }}</span>
        </AppButton>
        <div class="flex justify-between items-center mt-5">
          <AppButton type="submit">Sign In</AppButton>
          <button class="text-gray-800 font-bold text-sm ml-3">Forgot Password?</button>
        </div>
      </form>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '../../firebase'
import { ref } from 'vue'
import AppInput from '../atoms/AppInput.vue'
import AppButton from '../atoms/AppButton.vue'
import { validateEmail } from '../../utils/util'

let signingUp = ref(false)
let loading = ref(false)
let email = ref('')
let password = ref('')
let repeatedPassword = ref('')

const clearForm = (): void => {
  email.value = ''
  password.value = ''
  repeatedPassword.value = ''
}

const signInWithGoogle = () => {
  loading.value = true
  signInWithPopup(auth, provider)
    .then(result => {
      console.log(result.user)
      loading.value = false
    })
    .catch(error => {
      loading.value = false
      console.log(error)
    })
}

const createNewUser = (): void => {
  console.log(email.value)
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      clearForm()
      console.log(userCredential)
    })
    .catch(error => {
      console.log(error)
    })
}

const signInWithPassword = (): void => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      clearForm()
      console.log(userCredential)
    })
    .catch(error => {
      console.log(error)
    })
}

const handleSignInSubmit = () => {
  console.log(email.value)

  if (!validateEmail(email.value)) {
    console.log('email error')
    return
  }

  signInWithPassword()
}

const handleSignUpSubmit = () => {
  if (!validateEmail(email.value)) {
    console.log('email error')
    return
  }
  if (password.value.length < 8 || password.value !== repeatedPassword.value) {
    console.log('password error')
    return
  }
  createNewUser()
}
</script>
