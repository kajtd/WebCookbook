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

const userKey = Object.keys(window.localStorage).filter(it => it.startsWith('firebase:authUser'))[0]

export const useStore = defineStore('store', {
  state: () => {
    return {
      user: userKey ? JSON.parse(localStorage.getItem(userKey) as string) : {},
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
