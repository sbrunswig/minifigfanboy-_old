import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from './../api/firebase'

Vue.use(Vuex)

Vue.config.debug = true;
const debug = process.env.NODE_ENV !== 'production'


const state = {
    user: {
        loggedIn: false,
        uid: '',
        name: ''
    },
    minifig: {},
    minifigs: {},
    showSubset: true,
    showLoading: false,
    showPanel: false,
    minifigSold: [],
}


const mutations = {
    onAuthStateChanged (state, { user }) {
        state.user = user
    },
    
    setMinifigs (state, { minifigs }) {
        state.minifigs = minifigs || {}
    },

    toggleLoading (state, value) {
        state.showLoading = value;
    },
        
    toggleSubset (state) {
        state.showSubset = !state.showSubset;
    },
    
    togglePanel (state, value) {
        state.showPanel = value;
    },       

    currentMinifig (state,  minifig) {
        state.minifig = minifig || {};
    } 
}


const actions = {
    onAuthStateChanged ({ commit }, user) {
        commit('onAuthStateChanged', { user })
    },
    hidePanel ({ commit }){
        commit('togglePanel', false)
    },
    togglePanel ({ commit }, response) {
        commit('togglePanel', true);
        commit('currentMinifig', response);
    },
    signIn () {
        Firebase.signIn()
    },
    signOut () {
        Firebase.signOut()
    },
    
    fetchMinifigs ({ commit }, { count }) {
        commit('toggleLoading', true);
        Firebase.fetchMinifigs(count)
        .then(minifigs => {
            commit('setMinifigs', { minifigs })
        }).then(minifigs => {
            commit('toggleLoading', false);
        })
    },

    fetchBATMinifigs ({ commit }) {
        commit('toggleLoading', true);
        Firebase.fetchBATMinifigs()
        .then(minifigs => {
            commit('setMinifigs', { minifigs })
        }).then(minifigs => {
            commit('toggleLoading', false);
        })
    },

    fetchCOLTLBMMinifigs ({ commit }) {
        commit('toggleLoading', true);
        Firebase.fetchCOLTLBMMinifigs()
        .then(minifigs => {
            commit('setMinifigs', { minifigs })
        }).then(minifigs => {
            commit('toggleLoading', false);
        })
    },

    fetchDIMMinifigs ({ commit }) {
        commit('toggleLoading', true);
        Firebase.fetchDIMMinifigs()
        .then(minifigs => {
            commit('setMinifigs', { minifigs })
        }).then(minifigs => {
            commit('toggleLoading', false);
        })
    },

    fetchJUNIORMinifigs ({ commit }) {
        commit('toggleLoading', true);
        Firebase.fetchJUNIORMinifigs()
        .then(minifigs => {
            commit('setMinifigs', { minifigs })
        }).then(minifigs => {
            commit('toggleLoading', false);
        })
    },

    fetchSHMinifigs ({ commit }) {
        commit('toggleLoading', true);
        Firebase.fetchSHMinifigs()
        .then(minifigs => {
            commit('setMinifigs', { minifigs })
        }).then(minifigs => {
            commit('toggleLoading', false);
        })
    },

    fetchSPDMinifigs ({ commit }) {
        commit('toggleLoading', true);
        Firebase.fetchSPDMinifigs()
        .then(minifigs => {
            commit('setMinifigs', { minifigs })
        }).then(minifigs => {
            commit('toggleLoading', false);
        })
    },

    fetchTLMMinifigs ({ commit }) {
        commit('toggleLoading', true);
        Firebase.fetchTLMMinifigs()
        .then(minifigs => {
            commit('setMinifigs', { minifigs })
        }).then(minifigs => {
            commit('toggleLoading', false);
        })
    }               
}


export default new Vuex.Store({
    state,
    actions,
    mutations,
    strict: debug
})
