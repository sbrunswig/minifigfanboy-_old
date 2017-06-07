import VueRouter from 'vue-router'
import Vue from 'vue'
import Index from './../components/Index.vue'

Vue.use(VueRouter)

/* paths used in app */
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        }
    ]
})

export default router