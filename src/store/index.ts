import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return { user: {}, loading: false }
  },
  getters: {},
  actions: {}
})
