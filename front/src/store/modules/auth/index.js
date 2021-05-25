/**
 * Auth Module
 */
import Vue from 'vue'
import Nprogress from 'nprogress';
import router from '../../../router';
import api from 'Api'

const state = {
    user: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
}

// getters
const getters = {
    getUser: state => {
        return state.user;
    },
}

// actions
const actions = {
    signin(context, payload) {
        const { model } = payload;
        context.commit('loginUser');
        api
            .post("signin", JSON.stringify(model), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data.success) {
                    Nprogress.done();
                    setTimeout(() => {
                        response.data.data.password = model.password
                        context.commit('loginUserSuccess', response.data.data);
                    }, 500)
                } else {
                    context.commit('loginUserFailure');
                }
            })
            .catch((error) => {
                context.commit('loginUserFailure', error);
            })
            .finally(() => { });
    },

    confirmUser(context, payload) {
        const { model } = payload;
        context.commit('loginUser');
        api
            .post("signin", JSON.stringify(model), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data.success) {
                    response.data.data.password = model.password
                    context.commit('confirmUserSuccess', response.data.data);
                } else {
                    context.commit('confirmUserFailure');
                }
            })
            .catch((error) => {
                context.commit('confirmUserFailure', error);
            })
            .finally(() => { });
    },

    changedUser(context, payload){
        const { model } = payload;
        context.commit('confirmUserSuccess', model);
    },

    logoutUser(context) {
        context.commit('logoutUser');
    },
}

// mutations
const mutations = {
    loginUser() {
        Nprogress.start();
    },
    loginUserSuccess(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        if (user.role == 'admin') {
            router.push("/admin");
        } else if (user.role == 'provider') {
            router.push("/provider");
        } else if (user.role == 'client') {
            router.push("/client");
        }
        setTimeout(function () {
            Vue.notify({
                group: 'loggedIn',
                type: 'success',
                text: 'User Logged In Success!'
            });
        }, 1500);
    },
    loginUserFailure() {
        Nprogress.done();
        Vue.notify({
            group: 'loggedIn',
            type: 'error',
            text: 'User Logged In Falied!'
        });
    },
    logoutUser(state) {
        state.user = null
        localStorage.removeItem('user');
        router.push("/");
    },

    confirmUserSuccess(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },

    confirmUserFailure() {
        state.user = null
        localStorage.removeItem('user');
        router.push("/404");
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
