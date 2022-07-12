import { defineStore } from 'pinia'
import { User } from 'firebase/auth'

export type RootState = {
  user: User
  loading: boolean
}

const userKey = Object.keys(window.localStorage).filter(it => it.startsWith('firebase:authUser'))[0]

export const useStore = defineStore('store', {
  state: () => {
    return {
      user: userKey ? JSON.parse(localStorage.getItem(userKey) as string) : {},
      loading: false
    } as RootState
  },
  getters: {},
  actions: {}
})
