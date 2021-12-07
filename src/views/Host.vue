<template>

    <div class="flex flex-col w-full h-full">
        <h2 class="text-5xl italic font-black text-center text-pink-300">Buzzmaster</h2>
        <button class="p-4 m-3 text-xl italic font-black text-center text-pink-300 bg-white rounded-full" @click="quitGame">Avsluta spel</button>

        <div class="flex flex-col flex-1">
            <div class="flex flex-col flex-1 mt-12" v-if="buzzes.length">
                <h3 class="mb-2 text-3xl font-black text-white">Buzzes:</h3>
                <h3 v-for="(buzz, index) in buzzes" class="text-4xl font-black text-pink-300 capitalize" :key="`buzz-${index}`">{{ index+1 }}. {{ buzz }}</h3>
            </div>
            <div class="flex flex-col mt-12" v-else>
                <h3 class="mb-2 text-3xl font-black text-white">Tävlande:</h3>
                <h3 v-for="(user, index) in users" class="text-2xl font-black text-pink-300 text-opacity-50 capitalize" :key="`user-${index}`">{{ user.name }}</h3>
            </div>
        </div>

        <div class="w-full">
            <button class="flex items-center justify-center px-6 py-3 mx-auto mt-12 font-black text-indigo-900 bg-pink-300 rounded text-7xl" @click="clearBuzz">
                Rensa buzzes
            </button>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    name: 'HostView',

    async created () {
        const hostId = localStorage.getItem('buzzmaster')

        if (hostId) {
            this.hostId = hostId
        }

        await this.fetchData()

        this.$socket.client.addEventListener('active', this.setActive)
        this.$socket.client.addEventListener('buzzes', this.setBuzzes)
    },

    data: () => ({
        hostId: null,
        buzzes: [],
        users: []
    }),

    computed: {
        hasData () {
            return this.user.id
        }
    },

    methods: {
        clearBuzz () {
            this.$socket.client.emit('clear')
        },
        setBuzzes (buzzes) {
            this.buzzes = buzzes
        },
        setActive (users) {
            this.users = users
        },
        quitGame () {
            this.$socket.client.emit('quit')
            this.clearAndGo()
        },
        clearAndGo () {
            localStorage.removeItem('buzzmaster')
            this.hostId = null
            this.buzzes = []
            this.users = []

            this.$router.push({ name: 'home' })
        },
        async fetchData () {
            if (!this.hostId) {
                this.hostId = Math.floor(Math.random() * new Date())
            }

            try {
                const { data } = await axios.get(`${window.baseUrl}/api/host/${this.hostId}`)

                localStorage.setItem('buzzmaster', this.hostId)

                this.buzzes = data.buzzes.map(u => u.name)
                this.users = data.users
            } catch (err) {
                this.$router.push({ name: 'home', query: { error: 'alreadyHosted' } })
            }
        }

    }
}
</script>
