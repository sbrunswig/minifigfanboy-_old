import './../settings'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import router from './router'
import Firebase from './api/firebase'
import App from './components/App.vue'

/* initialize firebase database */
Firebase.initFirebase()

/* router sync adds route state to the store */
sync(store, router)

/* create vue instance and mount it to the app */
const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

global._App = app
