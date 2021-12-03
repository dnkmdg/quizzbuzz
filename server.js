require('dotenv').config()

const fs = require('fs')
const https = require('https')
const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const app = express()

const pkey = process.env.PKEY ? fs.readFileSync(process.env.PKEY) : null
const pcert = process.env.PCERT ? fs.readFileSync(process.env.PCERT) : null

var options = {
    key: pkey,
    cert: pcert
}

app.use(cors())

const server = https.Server(app, options)
const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

const data = {
    host: null,
    users: new Set(),
    buzzes: new Set()
}

const getData = () => ({
    users: [...data.users],
    buzzes: [...data.buzzes].map(b => {
        const [name, team] = b.split('-')
        return { name, team }
    })
})

const isExistingUser = (user) => {
    const users = [...data.users].map(u => u.id)
    return users.includes(user.id)
}

// app.use(express.static('public'))
// app.set('view engine', 'pug')

// app.get('/', (req, res) => res.render('index', { title }))
app.get('/api/host/:hostId', (req, res) => {
    if (data.host && data.host !== req.params.hostId) {
        res.sendStatus(401)
        return
    }

    data.host = req.params.hostId
    res.json(getData())
})

io.on('connection', (socket) => {
    socket.on('join', (user) => {
        if (!isExistingUser(user)) {
            data.users.add(user)
            console.log(`${user.name} joined!`)
        } else {
            console.log(`${user.name} rejoined!`)
        }

        io.emit('active', [...data.users])
    })

    socket.on('buzz', (user) => {
        data.buzzes.add(`${user.name}`)
        io.emit('buzzes', [...data.buzzes])
        console.log(`${user.name} buzzed in!`)
    })

    socket.on('clear', () => {
        data.buzzes = new Set()
        io.emit('buzzes', [...data.buzzes])
        console.log('Clear buzzes')
    })

    socket.on('quit', () => {
        data.buzzes = new Set()
        data.users = new Set()
        data.host = null

        io.emit('buzzes', [...data.buzzes])
        io.emit('active', [...data.users])
        io.emit('quit')

        console.log('Quit game')
    })
})

server.listen(8090, () => console.log('Listening on 8090'))