<template>
  <article class="w-full bg-white flex flex-col justify-center items-center py-5 px-6 rounded-lg border-4 border-black">
    <header class="w-full">
      <h2 class="text-center text-2xl font-bold">Create new recipe 👋</h2>
    </header>
    <div class="w-full">
      <form class="w-full flex flex-col justify-center mt-5" action="" @submit.prevent="handleSubmitForm">
        <AppInput v-model="recipe.title" id="title" name="title" type="text" placeholder="Title" required />
        <AppTextarea
          v-model="recipe.description"
          id="description"
          name="description"
          type="text"
          placeholder="Short description"
          required
        />
        <AppInput
          v-model="recipe.cookingTime"
          id="cooking_time"
          name="cooking_time"
          type="number"
          placeholder="Cooking time"
          required
        />
        <div class="w-full flex flex-col">
          <div class="w-full flex items-center gap-2" v-for="(ingredient, index) in recipe.ingredients" :key="index">
            <AppInput v-model="ingredient.name" id="ingredient_name" type="text" placeholder="Ingredient name" />
            <AppInput v-model="ingredient.amount" id="ingredient_amount" type="string" placeholder="Amount" />
            <AppButton additionalClass="w-7 h-7 !px-1 mb-3" @click="deleteIngredient">
              <Icon icon="akar-icons:trash-can" />
            </AppButton>
          </div>
          <AppButton additionalClass="mb-3 self-end" type="button" @click="addNewIngredient">Add ingredient</AppButton>
        </div>
        <AppTextarea
          v-model="recipe.preparation"
          id="preparation"
          name="preparation"
          type="text"
          placeholder="Describe preparation"
          :rows="10"
          required
        />
        <input id="image" name="image" type="file" class="my-3" required @change="updateImage" />
        <AppButton additionalClass="my-3 flex-1" type="submit">Post recipe!</AppButton>
      </form>
    </div>
    <footer class="w-full">
      <p v-show="errorMessage" class="text-center font-bold mt-3 border-primary border-4 p-3 rounded-lg bg-red-100">
        {{ errorMessage }}👮‍♂️
      </p>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { doc, setDoc, database, storage, ref as storageRef, uploadBytes, getDownloadURL } from './../../firebase'
import { ref } from 'vue'
import AppButton from './../atoms/AppButton.vue'
import AppInput from './../atoms/AppInput.vue'
import { useStore } from './../../store/index'
import { Recipe } from './../../types/Recipe'
import AppTextarea from '../atoms/AppTextarea.vue'
import { Icon } from '@iconify/vue'
import { uid } from 'uid'

const store = useStore()

const errorMessage = ref('')

const file = ref<File>()

const recipe = ref<Recipe>({
  title: '',
  description: '',
  ingredients: [],
  authorName: '',
  authorPhotoUrl: '',
  comments: [],
  cookingTime: 0,
  image: '',
  likes: [],
  preparation: ''
})

const addNewIngredient = () => {
  recipe.value.ingredients.push({
    name: '',
    amount: 0
  })
}

const updateImage = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    file.value = files[0]
  }
}

const deleteIngredient = (index: number) => {
  recipe.value.ingredients.splice(index, 1)
}

const createRecipe = async (): Promise<void> => {
  const photoId = uid()
  const imageRef = storageRef(storage, `images/${photoId}`)
  if (file.value) {
    await uploadBytes(imageRef, file.value)
  }
  if (store.user.displayName) {
    recipe.value.authorName = store.user.displayName
  }
  recipe.value.authorPhotoUrl = store.user.photoURL || 'https://picsum.photos/200'
  await getDownloadURL(storageRef(storage, `images/${photoId}`)).then(async url => {
    recipe.value.image = url
    await setDoc(doc(database, 'Recipes', uid()), recipe.value)
  })
}

const handleSubmitForm = () => {
  if (
    !recipe.value.title ||
    !recipe.value.description ||
    recipe.value.ingredients.length === 0 ||
    !recipe.value.cookingTime ||
    !recipe.value.preparation
  ) {
    errorMessage.value = 'Please fill in all fields'
    return
  }
  createRecipe()
}
</script>
