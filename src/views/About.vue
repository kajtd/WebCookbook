<template>
  <FullPageTemplate>
    <main class="my-[5vh] px-4 w-full text-center">
      <section class="mx-auto p-4 sm:p-12 w-full max-w-5xl flex flex-col items-center gap-8 z-[-1]">
        <div class="my-12">
          <h2
            class="text-3xl sm:text-5xl font-bold relative before:rounded-lg before:h-2 before:w-full before:left-0 before:absolute before:-bottom-6 before:bg-blueLight"
          >
            Discover new recipes 🧐
          </h2>
          <h3 class="text-base sm:text-lg font-medium text-gray-800 mt-10">
            Want to learn to cook but don't know where to begin? Make use of our cookbook for a variety of food recipes!
            Find the food that best suits you and share your culinary adventure with us!
          </h3>
        </div>
        <div class="bg-pinkLight border-4 border-black p-12 rounded-lg flex flex-col items-center gap-4 w-full">
          <h2 class="text-2xl sm:text-4xl font-bold mb-6">How does it work? 🤨</h2>
          <div class="max-w-[660px] flex flex-col lg:flex-row items-center gap-8">
            <div class="flex flex-col justify-center items-center">
              <img
                src="https://blush.design/api/download?shareUri=QsRbEmDzq&w=800&h=800&fm=png"
                alt=""
                class="object-contain rounded-full bg-blueLight w-24 h-24 p-4 flex items-center justify-center border-4 border-black mb-2"
              />
              <h3 class="font-bold text-xl mt-1">Create recipes</h3>
              <p class="text-sm mt-1">Make up your own recipes, then share them with others!</p>
            </div>
            <div class="flex flex-col justify-center items-center">
              <img
                src="https://blush.design/api/download?shareUri=2YuZQBoPZ&w=800&h=800&fm=png"
                alt=""
                class="object-contain rounded-full bg-orangeLight w-24 h-24 p-4 flex items-center justify-center border-4 border-black mb-2"
              />
              <h3 class="font-bold text-xl mt-1">Inspire people</h3>
              <p class="text-sm mt-1">Write unique recipes that will inspire everybody.</p>
            </div>
            <div class="flex flex-col justify-center items-center">
              <img
                src="https://blush.design/api/download?shareUri=bizB0-lCX&w=800&h=800&fm=png"
                alt=""
                class="object-contain rounded-full bg-red-400 w-24 h-24 p-4 flex items-center justify-center border-4 border-black mb-2"
              />
              <h3 class="font-bold text-xl mt-1">Cook amazing meals</h3>
              <p class="text-sm mt-1">Don't be concerned about running out of dinner ideas anymore.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </FullPageTemplate>
</template>

<script setup lang="ts">
import FullPageTemplate from '../components/templates/FullPageTemplate.vue'
</script>
