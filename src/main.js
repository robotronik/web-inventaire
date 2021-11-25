
// ROUTER
import {createRouter, createWebHistory} from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {name: 'home',     path: '/',                   component: () => import('./pages/Home.vue'),           meta: {auth:true}},
        {name: 'login',    path: '/login',              component: () => import('./pages/User/Login.vue')},
        {name: 'register', path: '/register',           component: () => import('./pages/User/Register.vue')},
        {name: 'invall',   path: '/inventory',          component: () => import('./pages/Inventory/All.vue'),  meta: {auth:true}},
        {name: 'invone',   path: '/inventory/:id',      component: () => import('./pages/Inventory/One.vue'),  meta: {auth:true}},
        {name: 'invedit',  path: '/inventory/:id/edit', component: () => import('./pages/Inventory/Edit.vue'), meta: {auth:true}},
        {name: 'invadd',   path: '/inventory/new',      component: () => import('./pages/Inventory/Edit.vue'), meta: {auth:true}},
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (!store.getters.loggedin) {
            next({ name: 'login', query: { ret: to.fullPath }})
        } else {
            next()
        }
    } else {
        next()
    }
  })
  


// AXIOS
import VueAxios from 'vue-axios'
import api from './axios.js'

// VUEX
import store from './store'

import {createApp} from 'vue'
import App from './components/App.vue'

import 'mini.css'

const app = createApp(App)

app .use(router)
    .use(VueAxios, api)
    .use(store)
    .mount('#app')
