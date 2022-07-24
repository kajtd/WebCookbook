import { defineStore } from 'pinia'
import { User } from 'firebase/auth'
import { Recipe } from './../types/Recipe'

export type RootState = {
  user: User
  loading: boolean
  processingRecipe: boolean
  editingRecipe: boolean
  processedRecipe: Recipe
  recipes: Recipe[]
  searchedRecipes: Recipe[]
  searchQuery: string
}

export const useStore = defineStore('store', {
  state: () => {
    return {
      user: {},
      loading: false,
      processingRecipe: false,
      editingRecipe: false,
      processedRecipe: {},
      recipes: [] as Recipe[],
      searchedRecipes: [] as Recipe[],
      searchQuery: ''
    } as RootState
  },
  getters: {},
  actions: {
    setProcessedRecipe(id = '', recipe?: Recipe) {
      if (id === '' && recipe) {
        this.processedRecipe = recipe
        return
      }
      this.processedRecipe = this.recipes.find(it => it.id === id) as Recipe
    },
    toggleCreateRecipeForm() {
      this.processingRecipe = !this.processingRecipe
      document.body.classList.toggle('fixed-bg')
    }
  }
})
