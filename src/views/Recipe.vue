<template>
  <FullPageTemplate>
    <main class="mt-[15vh] px-4">
      <article class="mx-auto w-full max-w-[720px] flex flex-col justify-center items-center">
        <header class="w-full !max-w-none mb-12 flex flex-col">
          <div class="w-full mx-auto mb-12">
            <h2 class="font-semibold text-slate-900 text-3xl sm:text-5xl">
              {{ recipe.title }}
            </h2>
            <h3 class="font-semibold text-black text-lg my-6">
              {{ recipe.description }}
            </h3>
          </div>
          <img :src="recipe.image" :alt="recipe.title" class="rounded-lg object-contain w-full" />
          <ul
            class="mt-5 flex flex-wrap gap-3 items-center justify-between w-full font-semibold text-xl border-4 border-black px-4 py-6 rounded-lg bg-orangeLight"
          >
            <li>{{ recipe?.cookingTime }} cook</li>
            <li>{{ recipe?.servings }} servings</li>
            <li>{{ recipe?.calories }} calories</li>
            <li>{{ `${recipe?.likes?.length} ${formatLikesTitle(recipe?.likes?.length)}` }}</li>
          </ul>
        </header>
        <section class="w-full">
          <h3 class="my-2 sm:my-5 text-black text-2xl sm:text-3xl font-semibold">Ingredients and preparation</h3>
          <ul class="border-4 border-black p-4 rounded-lg my-6 bg-blueLight">
            <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
              <p class="text-xl">
                {{ ingredient.name }} - <span class="font-semibold">{{ ingredient.amount }}</span>
              </p>
            </li>
          </ul>
          <p class="text-lg mt-4">{{ recipe.preparation }}</p>
        </section>
        <footer class="mt-24 w-full border-t-4 border-gray-700 mb-36">
          <div class="flex items-center justify-between py-5">
            <a
              :href="tweetLink"
              class="!no-underline border-2 border-gray-900 bg-primary text-gray-100 font-semibold py-2 px-6 rounded-lg text-sm flex items-center justify-center"
            >
              <span class="mr-[5px]">Tweet this recipe</span>
              <Icon icon="akar-icons:twitter-fill" />
            </a>
          </div>
          <h4 class="my-8 text-xl font-semibold">Remember to let the author of this recipe know if you liked it!</h4>
          <CommentsSection :blog-id="blogId" />
        </footer>
      </article>
    </main>
  </FullPageTemplate>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FullPageTemplate from '../components/templates/FullPageTemplate.vue'
import { doc, getDoc } from 'firebase/firestore'
import { database } from './../firebase'
import { Recipe } from './../types/Recipe'
import { Icon } from '@iconify/vue'
import CommentsSection from '../components/organisms/CommentsSection.vue'
import { formatLikesTitle } from './../utils/util'

const route = useRoute()
const blogId = ref('')
const recipe = ref<Recipe>({} as Recipe)

const tweetLink =
  'https://twitter.com/intent/tweet?text=' +
  encodeURIComponent('Check out this recipe: ' + 'pageName/' + route.fullPath)

onMounted(async () => {
  blogId.value = route.params.blogid as string

  const docRef = doc(database, 'Recipes', blogId.value)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    recipe.value = docSnap.data() as Recipe
  }
})
</script>
