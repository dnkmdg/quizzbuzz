import { createWebHashHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Host from './views/Host.vue'
import Player from './views/Player.vue'
// import About from './views/About.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/player',
        name: 'player',
        component: Player
    },
    {
        path: '/host',
        name: 'host',
        component: Host
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
