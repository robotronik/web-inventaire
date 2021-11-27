import {createApp} from 'vue'
import App from './components/App.vue'

import router from './router'

import VueAxios from 'vue-axios'
import api from './axios'

import store from './store'

import 'mini.css'

const app = createApp(App)
app .use(router)
    .use(VueAxios, api)
    .use(store)
    .mount('#app')
