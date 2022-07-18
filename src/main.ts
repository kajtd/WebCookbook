import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import { createPinia } from 'pinia'
// @ts-ignore
import vClickOutside from 'click-outside-vue3'

const app = createApp(App).use(createPinia()).use(router).use(vClickOutside)

router.isReady().then(() => {
  app.mount('#app')
})
