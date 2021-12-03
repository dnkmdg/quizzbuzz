import { createApp } from 'vue'
import App from './App.vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import router from './routes.js'

import './assets/tailwind.css'

const socket = io('http://localhost:8090')

console.log(import.meta.env.PROD)

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
