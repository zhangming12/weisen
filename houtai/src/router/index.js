import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index.vue'
import Demo from '@/view/demo.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Index',
        component: Index
    }, {
        path: '/demo',
        name: 'demo',
        component: Demo
    }]
})