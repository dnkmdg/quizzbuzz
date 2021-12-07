require('dotenv').config()

const fs = require('fs')
const http = require('https')
const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const api = require('./src/api')
const app = express()

const pkey = process.env.PKEY ? fs.readFileSync(process.env.PKEY) : null
const pcert = process.env.PCERT ? fs.readFileSync(process.env.PCERT) : null

var options = {
    key: pkey,
    cert: pcert,
    ciphers: [
        'ECDHE-RSA-AES128-SHA256',
        'DHE-RSA-AES128-SHA256',
        'AES128-GCM-SHA256',
        'RC4',
        'HIGH',
        '!MD5',
        '!aNULL'
    ].join(':')
}

app.use(cors())

const server = http.createServer(options, app)
const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

api.init(app, io)

server.listen(8090, () => console.log('Listening on 8090'))
