<template>
  <transition name="create-recipe-form">
    <div v-show="formVisible" class="fixed top-0 left-0 right-0 bottom-0 z-50 w-full overflow-y-auto bg-white">
      <article class="flex flex-col justify-between items-center relative">
        <header class="w-full bg-blueLight border-b-4 border-black">
          <div class="max-w-5xl flex items-center justify-between py-6 px-4 md:px-8 mx-auto">
            <div class="flex flex-row-reverse md:flex-row items-center justify-between w-full md:w-auto gap-5">
              <button type="button" class="cursor-pointer" @click="handleFormClose">
                <Icon icon="eva:close-fill" class="text-4xl" />
              </button>
              <h2 class="text-2xl font-bold">Create new recipe</h2>
            </div>
            <AppButton additionalClass="!hidden md:!flex" form="create_form" type="submit">Post recipe!</AppButton>
          </div>
        </header>
        <div class="w-full px-4 md:px-8 max-w-5xl">
          <form
            class="w-full flex flex-col mt-12 md:mt-6 md:grid md:grid-cols-2 md:grid-rows-2 gap-4"
            action=""
            ref="form"
            id="create_form"
            @submit.prevent="handleSubmitForm"
          >
            <div class="flex flex-col row-start-1 row-end-2">
              <label for="title" class="font-semibold text-lg mb-1">
                Title
                <span class="text-red-500 font-bold relative bottom-1 right-1">*</span>
              </label>
              <AppInput v-model="recipe.title" id="title" name="title" type="text" placeholder="Title" required />
              <label for="description" class="font-semibold text-lg mb-1">
                Description
                <span class="text-red-500 font-bold relative bottom-1 right-1">*</span>
              </label>
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
                  <label for="cooking_time" class="font-semibold text-lg mb-1"> Cooking time </label>
                  <AppInput
                    v-model="recipe.cookingTime"
                    id="cooking_time"
                    name="cooking_time"
                    class="w-[120px]"
                    type="time"
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
                  />
                </div>
              </div>
            </div>
            <div class="w-full flex flex-col row-start-2 col-start-1">
              <div class="flex items-center justify-between">
                <span class="text-xl font-semibold">
                  Ingredients
                  <span class="text-red-500 font-bold relative bottom-1 right-1">*</span>
                </span>
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
                    type="text"
                    placeholder="Amount"
                    class="w-16 md:w-auto"
                  />
                  <AppButton additionalClass="w-7 h-7 !px-1 mb-3" @click="deleteIngredient(index)">
                    <Icon icon="akar-icons:trash-can" />
                  </AppButton>
                </div>
              </div>
            </div>
            <div class="flex flex-col h-full justify-between row-start-1 row-end-3">
              <div class="h-full">
                <label for="preparation" class="font-semibold text-xl">
                  Preparation
                  <span class="text-red-500 font-bold relative bottom-1 right-1">*</span>
                </label>
                <AppTextarea
                  v-model="recipe.preparation"
                  id="preparation"
                  name="preparation"
                  type="text"
                  placeholder="Describe preparation"
                  required
                  :rows="10"
                  class="w-full h-full mt-1"
                />
              </div>
              <div class="md:mt-12">
                <h4 class="font-semibold text-xl mb-2">
                  Choose best matching tag: <span class="text-red-500 font-bold relative bottom-1 right-1">*</span>
                </h4>
                <div class="flex flex-wrap gap-2">
                  <RecipeTag
                    v-for="(tag, i) in tags"
                    :key="i"
                    :id="tag.id"
                    :name="tag.name"
                    :activeTagId="recipe.tagId"
                    @click="setActiveTagId(tag.id)"
                  >
                    {{ tag.name }}
                  </RecipeTag>
                </div>
              </div>
            </div>
            <div class="flex flex-col mt-5">
              <label for="description" class="font-semibold text-lg mb-1">
                Image
                <span v-show="!editingRecipe" class="text-red-500 font-bold relative bottom-1 right-1">*</span>
              </label>
              <input
                id="image"
                name="image"
                type="file"
                class="mb-3"
                :required="!editingRecipe"
                @change="updateImage"
              />
            </div>
            <p
              v-show="errorMessage"
              class="text-center font-bold border-primary border-4 p-3 rounded-lg bg-red-100 flex items-center justify-center"
            >
              {{ errorMessage }}👮‍♂️
            </p>
            <AppButton additionalClass="my-4 md:!hidden" form="create_form" type="submit">Post recipe!</AppButton>
          </form>
        </div>
      </article>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { database, storage } from './../../firebase'
import { onSnapshot, collection, doc, setDoc } from '@firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from '@firebase/storage'
import { ref, watch, onMounted } from 'vue'
import AppButton from './../atoms/AppButton.vue'
import AppInput from './../atoms/AppInput.vue'
import { useStore } from './../../store/index'
import { Recipe } from './../../types/Recipe'
import AppTextarea from '../atoms/AppTextarea.vue'
import { Icon } from '@iconify/vue'
import { uid } from 'uid'
import Tag from './../../types/Tag'
import RecipeTag from './../atoms/RecipeTag.vue'
import { storeToRefs } from 'pinia'

defineProps<{
  formVisible: boolean
}>()

const emit = defineEmits(['toggleForm'])

const store = useStore()
const { editingRecipe, processedRecipe, user, recipes } = storeToRefs(store)
const { setProcessedRecipe } = useStore()
const errorMessage = ref('')
const file = ref<File>()
const tags = ref<Tag[]>([])
const form = ref<HTMLFormElement>()
const initialRecipeData: Recipe = {
  id: '',
  title: '',
  description: '',
  ingredients: [],
  authorName: '',
  authorPhotoUrl: '',
  authorId: '',
  createdAt: new Date(),
  comments: [],
  cookingTime: '',
  servings: 0,
  calories: 0,
  image: '',
  likes: [],
  preparation: '',
  tagId: '',
  visible: true
}

const recipe = ref<Recipe>({ ...initialRecipeData })

// update recipe whenever user wants to edit it
watch(
  () => processedRecipe.value,
  r => {
    if (r !== undefined) recipe.value = r
  }
)

const addNewIngredient = (): void => {
  recipe.value.ingredients.push({
    name: '',
    amount: 0
  })
}

const setActiveTagId = (id: string): void => {
  recipe.value.tagId = id
}

const updateImage = (e: Event): void => {
  errorMessage.value = ''
  const target = e.target as HTMLInputElement
  const files = target.files
  if (!files) return
  if (files[0].size > 1048576) {
    errorMessage.value = 'Image size should be less than 1MB'
    target.value = ''
    return
  }
  file.value = files[0]
}

const deleteIngredient = (index: number): void => {
  recipe.value.ingredients.splice(index, 1)
}

const validateRecipe = (recipe: Recipe): boolean => {
  const validations: boolean[] = [
    !recipe.title,
    !recipe.description,
    !recipe.preparation,
    !recipe.ingredients.length,
    !recipe.tagId,
    !file.value
  ]
  return !validations.includes(false)
}

const createRecipe = async (): Promise<void> => {
  try {
    if (!recipe.value.id) recipe.value.id = uid()
    if (file.value) {
      const photoId = uid()
      const imageRef = storageRef(storage, `images/${photoId}`)
      await uploadBytes(imageRef, file.value as File)
      await getDownloadURL(storageRef(storage, `images/${photoId}`)).then(async url => {
        recipe.value.image = url
      })
    }
    recipe.value.authorName = user.value.displayName as string
    recipe.value.authorId = user.value.uid as string
    recipe.value.authorPhotoUrl = user.value.photoURL as string
    if (!editingRecipe.value) recipes.value.unshift(recipe.value)
    await setDoc(doc(database, 'Recipes', recipe.value.id), recipe.value)
    setProcessedRecipe('', { ...initialRecipeData })
    editingRecipe.value = false
    form.value?.reset()
  } catch (error) {
    console.log(error)
  }
}

const handleSubmitForm = async (): Promise<void> => {
  if (validateRecipe(recipe.value) || errorMessage.value !== '') {
    errorMessage.value = 'Please fill in all necessary fields'
    return
  }
  try {
    await createRecipe()
    errorMessage.value = ''
    recipe.value = initialRecipeData
    recipe.value.ingredients = []
    emit('toggleForm')
  } catch (error) {
    errorMessage.value = 'Something went wrong'
  }
}

const handleFormClose = (): void => {
  setProcessedRecipe('', { ...initialRecipeData })
  editingRecipe.value = false
  emit('toggleForm')
}

onMounted(async () => {
  await onSnapshot(collection(database, 'Tags'), snapshot => {
    const posts: Tag[] = snapshot.docs.map(doc => doc.data() as Tag)
    tags.value = posts
  })
})
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
