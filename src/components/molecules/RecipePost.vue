<template>
  <article
    class="relative bg-pinkLight h-48 border-2 border-black rounded-xl flex flex-col items-center justify-between"
  >
    <button
      v-show="authorId === store.user.uid"
      class="w-7 h-7 bg-transparent border-none absolute right-1 top-1 text-xl"
      @click="editDropdownVisible = true"
    >
      <Icon icon="bi:three-dots" color="black" />
    </button>
    <AppDropdown :open.sync="editDropdownVisible" :items="dropdownItems" @close="closeDropdown" />
    <router-link :to="`/recipes/${id}`" class="w-full h-3/4">
      <div class="flex items-center justify-between pl-2 py-3 w-full h-full">
        <img :src="image" :alt="title" class="h-full rounded-xl object-cover min-w-[120px] w-full" />
        <div class="h-full w-full flex flex-col justify-center pl-5">
          <p class="text-xl font-bold mt-5 mb-auto">{{ title.length > 32 ? `${title.slice(0, 32)}...` : title }}</p>
          <p class="text-xs font-semibold text-gray-800 flex items-center">
            <img :src="authorPhotoUrl" alt="" class="w-6 h-6 rounded-full" />
            <span class="ml-1 self-end">{{ authorName }}</span>
          </p>
        </div>
      </div>
    </router-link>
    <footer class="w-full h-1/4 flex items-center justify-between px-2 py-1 border-t-2 border-black">
      <p class="font-bold text-sm ml-1">{{ likes.length }} likes</p>
      <div class="ml-auto flex gap-1">
        <AppButton additionalClass="w-7 h-7 !px-1 !bg-blue-300" :href="`/recipes/${id}#comments`">
          <Icon icon="akar-icons:comment" color="black" />
        </AppButton>
        <AppButton additionalClass="w-7 h-7 !px-1" @click="handleLikeButtonClick">
          <Icon :icon="liked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'" />
        </AppButton>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AppButton from '../atoms/AppButton.vue'
import AppDropdown from '../atoms/AppDropdown.vue'
import { useStore } from './../../store'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { database } from './../../firebase'

const store = useStore()

const props = defineProps<{
  id: string
  title: string
  authorName: string
  authorPhotoUrl: string
  authorId: string
  image: string
  likes: string[]
}>()

const liked = ref(props.likes.includes(store.user.uid))
const editDropdownVisible = ref(false)

const likeRecipe = async (): Promise<void> => {
  if (props.likes.includes(store.user.uid)) return

  const likes = [...props.likes, store.user.uid]
  const recipeDocRef = doc(database, 'Recipes', props.id)

  await updateDoc(recipeDocRef, { likes }).then(() => {
    liked.value = true
  })
}

const dislikeRecipe = async (): Promise<void> => {
  if (!props.likes.includes(store.user.uid)) return

  const likes = props.likes.filter((uid: string) => uid !== store.user.uid)
  const recipeDocRef = doc(database, 'Recipes', props.id)

  await updateDoc(recipeDocRef, { likes }).then(() => {
    liked.value = false
  })
}

const handleLikeButtonClick = (): void => {
  if (liked.value) {
    dislikeRecipe()
    return
  }
  likeRecipe()
}

const dropdownItems = [
  {
    label: 'Edit',
    icon: 'akar-icons:chat-edit',
    action: () => {
      store.toggleCreateRecipeForm()
      store.setProcessedRecipe(props.id)
      store.editingRecipe = true
    }
  },
  {
    label: 'Delete',
    icon: 'akar-icons:trash-can',
    additionalClass: 'bg-red-400 rounded-b-lg',
    action: async () => {
      store.recipes = store.recipes.filter(item => item.id !== props.id)
      await deleteDoc(doc(database, 'Recipes', props.id))
    }
  }
]

const closeDropdown = () => {
  editDropdownVisible.value = false
}
</script>
