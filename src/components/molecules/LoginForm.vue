<template>
  <article
    class="w-[320px] bg-white flex flex-col justify-center items-center py-5 px-6 rounded-lg border-4 border-black"
  >
    <header class="w-full">
      <div class="flex items-center justify-center mb-8 gap-3">
        <button class="text-gray-800 font-bold text-sm" @click="form = availableForms[0]">Sign In</button>
        <button class="text-gray-800 font-bold text-sm" @click="form = availableForms[1]">Sign Up</button>
      </div>
    </header>

    <h2 class="text-center text-2xl font-bold">Web Cookbook 👋</h2>

    <div class="w-full">
      <p class="text-center text-gray-800 font-medium mt-1">{{ form.description }}</p>
      <form class="w-full flex flex-col justify-center mt-5" action="" @submit.prevent="form.submitFunction">
        <AppInput v-model="form.email" id="email" type="email" name="email" placeholder="Email" required />
        <AppInput
          v-if="form.password !== undefined"
          v-model="form.password"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <AppInput
          v-if="form.repeatedPassword !== undefined"
          v-model="form.repeatedPassword"
          id="repeatedPassword"
          name="repeatedPassword"
          type="password"
          placeholder="Repeat password"
          required
        />
        <AppInput
          v-if="form.login !== undefined"
          v-model="form.login"
          id="login"
          name="login"
          type="text"
          placeholder="Login"
          required
        />
        <AppButton v-if="form.value === 'sign_in'" type="button" additionalClass="mt-2" @click="signInWithGoogle">
          <span>Sign In With Google</span>
        </AppButton>
        <div class="flex justify-between items-center mt-5">
          <AppButton additionalClass="my-3 flex-1" type="submit">{{ form.buttonText }}</AppButton>
          <button
            v-show="form.forgetPasswordButton"
            type="button"
            @click="form = availableForms[2]"
            class="text-gray-800 font-bold text-sm ml-5"
          >
            Forgot Password?
          </button>
        </div>
      </form>
      <p v-show="errorMessage" class="text-center font-bold mt-3 border-primary border-4 p-3 rounded-lg bg-red-100">
        {{ errorMessage }}👮‍♂️
      </p>
      <p
        v-show="successMessage && form.value === 'forget_password'"
        class="text-center font-bold mt-3 border-green-500 border-4 p-3 rounded-lg bg-green-100"
      >
        {{ successMessage }}👏
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from '../../firebase'
import { ref } from 'vue'
import AppInput from '../atoms/AppInput.vue'
import AppButton from '../atoms/AppButton.vue'
import { validateEmail } from '../../utils/util'
import UserForm from './../../types/UserForm'
import { useStore } from './../../store/index'

const store = useStore()

const availableForms = ref<UserForm[]>([
  {
    value: 'sign_in',
    description: 'Sign in to create recipes!',
    email: '',
    password: '',
    forgetPasswordButton: true,
    buttonText: 'Sign In',
    submitFunction: () => handleSignInSubmit()
  },
  {
    value: 'sign_up',
    description: 'Create a new account and start using this app!',
    email: '',
    login: '',
    password: '',
    repeatedPassword: '',
    forgetPasswordButton: false,
    buttonText: 'Sign Up',
    submitFunction: () => handleSignUpSubmit()
  },
  {
    value: 'forget_password',
    description: 'Enter your email to reset your password',
    email: '',
    buttonText: 'Reset',
    submitFunction: () => handlePasswordResetSubmit()
  }
])

const form = ref<UserForm>(availableForms.value[0])
const errorMessage = ref('')
const successMessage = ref('')

const clearForm = (): void => {
  if (form.value.email !== undefined) form.value.email = ''
  if (form.value.password !== undefined) form.value.password = ''
  if (form.value.repeatedPassword !== undefined) form.value.repeatedPassword = ''
  errorMessage.value = ''
  successMessage.value = ''
}

const signInWithGoogle = (): void => {
  store.loading = true
  signInWithPopup(auth, provider)
    .then(userCredential => {
      store.loading = false
      store.user = userCredential.user
    })
    .catch(error => {
      store.loading = false
      console.log(error)
      errorMessage.value = 'Something went wrong, please try again'
    })
}

const createNewUser = async (): Promise<void> => {
  store.loading = true
  await createUserWithEmailAndPassword(auth, form.value.email, form.value.password as string)
    .then(userCredential => {
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: form.value.login,
          photoURL: `https://ui-avatars.com/api/?name=${form.value.login}`
        })
      }
      clearForm()
      store.user = userCredential.user
      store.loading = false
    })
    .catch(error => {
      console.log(error)
      store.loading = false
      errorMessage.value = 'Unable to create a new user, please try again'
    })
}

const signInWithPassword = (): void => {
  store.loading = true
  signInWithEmailAndPassword(auth, form.value.email, form.value.password as string)
    .then(userCredential => {
      clearForm()
      store.loading = false
      store.user = userCredential.user
    })
    .catch(error => {
      console.log(error)
      store.loading = false
      errorMessage.value = 'Unable to sign in, please try again'
    })
}

const handleSignInSubmit = () => {
  if (!validateEmail(form.value.email)) {
    errorMessage.value = 'Please enter a valid email'
    return
  }

  if ((form.value.password as string).length < 8) {
    errorMessage.value = 'Please enter a valid password'
    return
  }

  signInWithPassword()
}

const handleSignUpSubmit = () => {
  if (!validateEmail(form.value.email)) {
    errorMessage.value = 'Please enter a valid email'
    return
  }
  if ((form.value.password as string).length < 8 || form.value.password !== form.value.repeatedPassword) {
    errorMessage.value = 'Please enter valid passwords that match'
    return
  }
  createNewUser()
}

const handlePasswordResetSubmit = () => {
  if (!validateEmail(form.value.email)) {
    errorMessage.value = 'Please enter a valid email'
    return
  }
  sendPasswordResetEmail(auth, form.value.email)
    .then(() => {
      clearForm()
      successMessage.value = 'Password reset email sent'
    })
    .catch(error => {
      console.log(error)
      errorMessage.value = 'Something went wrong, please try again'
    })
}
</script>
