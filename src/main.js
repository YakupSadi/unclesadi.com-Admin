import { createApp } from 'vue'
import App from './App.vue'

// Router
import Router from './router'

// Vuex
import Store from './store'

/******************************/

// Reset
import './assets/reset.css'

// Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faCheck, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faXmark, faCheck, faTrash)

//
const app = createApp(App)

// Router & Store
app.use(Router)
app.use(Store)

// Font-Awesome
app.component('font-awesome-icon', FontAwesomeIcon)

//
app.mount('#app')