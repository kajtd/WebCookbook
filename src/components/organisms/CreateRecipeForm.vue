<template>
  <transition name="create-recipe-form">
    <div v-show="formVisible" class="fixed top-0 left-0 right-0 bottom-0 z-50 w-full overflow-y-scroll bg-white">
      <article class="flex flex-col justify-between items-center">
        <header class="w-full bg-blueLight border-b-4 border-black">
          <div class="max-w-5xl flex items-center justify-between py-7 px-4 md:px-8 mx-auto">
            <div class="flex items-center justify-between w-full md:w-auto gap-5">
              <button type="button" class="cursor-pointer" @click="$emit('toggleForm')">
                <Icon icon="eva:close-fill" class="text-4xl" />
              </button>
              <h2 class="text-lg md:text-2xl font-bold">Create new recipe</h2>
            </div>
            <AppButton additionalClass="!hidden md:!flex" form="create_form" type="submit">Post recipe!</AppButton>
          </div>
        </header>
        <div class="w-full px-4 md:px-8 max-w-5xl">
          <form
            class="w-full flex flex-col mt-12 md:mt-6 md:grid md:grid-cols-2 md:grid-rows-2 gap-4"
            action=""
            id="create_form"
            @submit.prevent="handleSubmitForm"
          >
            <div class="flex flex-col row-start-1 row-end-2">
              <label for="title" class="font-semibold text-lg mb-1">Title</label>
              <AppInput v-model="recipe.title" id="title" name="title" type="text" placeholder="Title" required />
              <label for="description" class="font-semibold text-lg mb-1">Description</label>
              <AppTextarea
                v-model="recipe.description"
                id="description"
                name="description"
                type="text"
                placeholder="Short description"
                required
              />
              <div class="flex flex-col lg:flex-row lg:items-center justify-between">
                <div class="flex flex-col">
                  <label for="cooking_time" class="font-semibold text-lg mb-1">Cooking time</label>
                  <AppInput
                    v-model="recipe.cookingTime"
                    id="cooking_time"
                    name="cooking_time"
                    class="w-[120px]"
                    type="time"
                    required
                  />
                </div>
                <div class="flex flex-col">
                  <label for="servings" class="font-semibold text-lg mb-1">Servings</label>
                  <AppInput
                    v-model="recipe.servings"
                    id="servings"
                    name="servings"
                    class="w-[120px]"
                    type="number"
                    placeholder="Servings"
                    required
                  />
                </div>
                <div class="flex flex-col">
                  <label for="calories" class="font-semibold text-lg mb-1">Calories</label>
                  <AppInput
                    v-model="recipe.calories"
                    id="calories"
                    name="calories"
                    class="w-[120px]"
                    type="number"
                    placeholder="Calories"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="w-full flex flex-col row-start-2 col-start-1">
              <div class="flex items-center justify-between">
                <span class="text-2xl font-semibold">Ingredients</span>
                <AppButton additionalClass="mt-4 mb-1 self-end !p-1" type="button" @click="addNewIngredient">
                  <Icon icon="eva:plus-circle-outline" class="text-lg" />
                </AppButton>
              </div>
              <div
                class="flex items-center flex-col gap-1 overflow-y-auto h-[230px] w-full border-2 border-black rounded-lg p-4"
              >
                <div
                  class="w-full flex items-center gap-2"
                  v-for="(ingredient, index) in recipe.ingredients"
                  :key="index"
                >
                  <AppInput
                    v-model="ingredient.name"
                    id="ingredient_name"
                    type="text"
                    placeholder="Ingredient name"
                    class="w-36 md:w-auto"
                  />
                  <AppInput
                    v-model="ingredient.amount"
                    id="ingredient_amount"
                    type="number"
                    placeholder="Amount"
                    class="w-16 md:w-auto"
                  />
                  <AppButton additionalClass="w-7 h-7 !px-1 mb-3" @click="deleteIngredient">
                    <Icon icon="akar-icons:trash-can" />
                  </AppButton>
                </div>
              </div>
            </div>
            <div class="flex flex-col h-full row-start-1 row-end-3">
              <label for="preparation" class="font-semibold text-lg mb-1">Preparation</label>
              <AppTextarea
                v-model="recipe.preparation"
                id="preparation"
                name="preparation"
                type="text"
                placeholder="Describe preparation"
                required
                :rows="10"
                class="w-full h-full mb-0"
              />
            </div>
            <input id="image" ref="file" name="image" type="file" class="mb-3 mt-12" required @change="updateImage" />
            <AppButton additionalClass="my-4 md:!hidden" form="create_form" type="submit">Post recipe!</AppButton>
          </form>
        </div>
        <footer class="w-full">
          <p v-show="errorMessage" class="text-center font-bold mt-3 border-primary border-4 p-3 rounded-lg bg-red-100">
            {{ errorMessage }}👮‍♂️
          </p>
        </footer>
      </article>
    </div>
  </transition>
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

defineProps<{
  formVisible: boolean
}>()

const emit = defineEmits(['toggleForm'])

const store = useStore()

const errorMessage = ref('')

const file = ref<File | null>(null)

const initialRecipeData = {
  title: '',
  description: '',
  ingredients: [],
  authorName: '',
  authorPhotoUrl: '',
  comments: [],
  cookingTime: 0,
  servings: 0,
  calories: 0,
  image: '',
  likes: [],
  preparation: ''
}

const recipe = ref<Recipe>({ ...initialRecipeData })

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
  recipe.value.authorPhotoUrl = store.user.photoURL as string
  await getDownloadURL(storageRef(storage, `images/${photoId}`)).then(async url => {
    recipe.value.image = url
    await setDoc(doc(database, 'Recipes', uid()), recipe.value)
  })
}

const handleSubmitForm = async () => {
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
  await createRecipe().then(() => {
    errorMessage.value = ''
    recipe.value = initialRecipeData
    recipe.value.ingredients = []
    file.value = null
    emit('toggleForm')
  })
}
</script>

<style scoped>
.create-recipe-form-enter-active,
.create-recipe-form-leave-active {
  transition: all 0.3s ease-in-out;
}
.create-recipe-form-enter-from {
  transform: translateY(100%);
}
.create-recipe-form-enter-to {
  transform: translateY(0);
}
.create-recipe-form-leave-to {
  transform: translateY(100%);
}
</style>
