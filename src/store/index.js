import {createStore} from 'vuex'
import {auth} from './auth.js'

import VuexPersistence from 'vuex-persist'
const localstorage = new VuexPersistence({
  storage: window.localStorage
})

const store = createStore({
    modules: {
        auth
    },
    plugins: [localstorage.plugin]
})

export default store