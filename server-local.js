require('dotenv').config()

const http = require('http')
const express = require('express')
var cors = require('cors')
const socketio = require('socket.io')
const api = require('./src/api')

const app = express()

app.use(cors())

const server = http.Server(app)
const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

api.init(app, io)

server.listen(8090, () => console.log('Listening on 8090'))
