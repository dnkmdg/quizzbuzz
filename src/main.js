import { createApp } from 'vue'
import App from './App.vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import router from './routes.js'

import './assets/tailwind.css'

console.log(import.meta.env)

window.baseUrl = import.meta.env.VITE_BASE_URL

const socket = io(window.baseUrl)

const app = createApp(App, {
    sockets: {
        connect () {
            console.log('socket connected')
        },
        customEmit (val) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    }
})

app.use(VueSocketIOExt, socket)
app.use(router)
app.mount('#app')
