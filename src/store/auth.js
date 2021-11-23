import axios from '../axios.js'

export const auth = {
    state: () => ({
        loggedin: false,
        token: null,
        expiresat: null,
    }),

    actions: {
        login({ state, commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post("login", {username: payload.username, passwd: payload.password})
                    .then(res => {
                        commit('loginsuccess', {token: res.data.token, expiresat: res.data.expire})
                        resolve(res)
                    })
                    .catch(err => {
                        commit('logout')
                        reject(err)
                    })
            })
        }
    },

    mutations: {
        loginsuccess(state, payload) {
            state.loggedin = true;
            state.token = payload.token;
            state.expiresat = payload.expiresat;
        },
        logout(state) {
            state.loggedin = false;
            state.token = null;
            state.expiresat = null;
        }
    },

    getters: {
        loggedin(state) {
            return state.loggedin;
        },
        getTokenHeader(state) {
            return { 'Token': state.token };
        }
    }
}