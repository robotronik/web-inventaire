import {create} from 'axios'

const api = create({
    baseURL: 'http://localhost:8080/',//process.env.VUE_APP_API_BASE_URL,
    timeout: 10000
});

export default api