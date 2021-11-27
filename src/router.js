import {createRouter, createWebHistory} from 'vue-router'
import store from './store'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {name: 'home',     path: '/',                   component: () => import('./pages/Home.vue')},
        {name: 'login',    path: '/login',              component: () => import('./pages/User/Login.vue'),    meta: {public: true}},
        {name: 'register', path: '/register',           component: () => import('./pages/User/Register.vue'), meta: {public: true}},
        {name: 'invall',   path: '/inventory',          component: () => import('./pages/Inventory/All.vue')},
        {name: 'invone',   path: '/inventory/:id',      component: () => import('./pages/Inventory/One.vue')},
        {name: 'invedit',  path: '/inventory/:id/edit', component: () => import('./pages/Inventory/Edit.vue')},
        {name: 'invadd',   path: '/inventory/new',      component: () => import('./pages/Inventory/Edit.vue')},
        {name: 'invcat',   path: '/inventory/categories',  component: () => import('./pages/Inventory/Categories.vue')},
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => !record.meta.public)) {
        if (!store.getters.loggedin) {
            next({ name: 'login', query: { ret: to.fullPath }})
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
