import { defineStore } from 'pinia'
import { User } from 'firebase/auth'

export type RootState = {
  user: User
  loading: boolean
}

export const useStore = defineStore('store', {
  state: () => {
    return { user: {}, loading: false } as RootState
  },
  getters: {},
  actions: {}
})
