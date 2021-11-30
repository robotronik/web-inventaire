import {create} from 'axios'
import store from './store'
import router from './router'

const api = create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000
})

api.interceptors.request.use(
    function (config) {
        config.headers = { ...config.headers, ...store.getters.getTokenHeader}
        return config
    }, function (err) {
        return Promise.reject(err)
    })


api.interceptors.response.use(
    function(res) {
        return res
    }, function(err) {
        if (err.response?.status === 401 && !err.config?.__isRetryRequest) {
            store.commit('logout')
            router.push({ name: 'login'})
        }
        return Promise.reject(err)
    })

export default api
