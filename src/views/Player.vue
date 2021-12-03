<template>

    <Transition enter-active-class="transition duration-300 ease-out transform"
                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                mode="out-in">
        <form class="w-full" v-if="!hasData" @submit.prevent="submitForm">
            <div class="text-center">
                <label class="text-lg italic font-black text-pink-300">Välj ditt krigarnamn:</label>
                <input type="text" class="inline-flex w-full p-2 font-extrabold text-white bg-transparent border-b-2 focus:outline-none" v-model="user.name" required />
                <span v-if="nameMissingError" />
            </div>

            <div class="mt-8 text-center">
                <button type="submit" class="px-3 py-2 italic font-black text-pink-300 bg-indigo-700 rounded">I have prepared the anus!</button>
            </div>
        </form>
        <div class="flex flex-col w-full h-full" v-else>
            <h2 class="text-4xl italic font-black text-center text-white">{{ user.name }}</h2>

            <div class="w-full h-[50vh]">
                <button class="flex mx-auto items-center justify-center max-w-[32rem] max-h-[32rem] h-[80vw] w-[80vw] text-7xl font-black text-indigo-900 bg-pink-300 rounded-full mt-12" @click="buzz">
                    BUZZ!
                </button>
            </div>

            <div class="flex flex-1 h-[40%] mt-8">
                <div class="flex flex-col flex-1 ">
                    <h3 class="mb-2 text-lg font-black text-white">Buzzes:</h3>
                    <h3 v-for="(buzz, index) in buzzes" class="font-black text-pink-300 capitalize " :key="`buzz-${index}`">{{ index+1 }}. {{ buzz }}</h3>
                </div>
                <div class="flex flex-col w-2/5">
                    <h3 class="mb-2 text-lg font-black text-white">Tävlande:</h3>
                    <h3 v-for="(user, index) in users" class="font-black text-pink-300 text-opacity-50 capitalize " :key="`user-${index}`">{{ user.name }}</h3>
                </div>
            </div>
        </div>
    </Transition>

</template>

<script>
const userTemplate = { name: null, id: null }

export default {
    name: 'PlayerView',

    created () {
        const userData = localStorage.getItem('buzztard')

        if (userData) {
            console.log('User found!')
            this.user = JSON.parse(userData)
            this.join()
        }

        this.$socket.client.addEventListener('active', this.setActive)
        this.$socket.client.addEventListener('buzzes', this.setBuzzes)
        this.$socket.client.addEventListener('quit', this.clearAndGo)
    },

    data: () => ({
        user: Object.assign({}, userTemplate),
        buzzes: [],
        users: []
    }),

    computed: {
        hasData () {
            return this.user.id
        }
    },

    methods: {
        setBuzzes (buzzes) {
            this.buzzes = buzzes
        },
        setActive (users) {
            this.users = users
        },
        clearAndGo () {
            localStorage.removeItem('buzztard')
            this.user = Object.assign({}, userTemplate)
            this.buzzes = []
            this.users = []

            this.$router.push({ name: 'home' })
        },
        buzz () {
            this.$socket.client.emit('buzz', this.user)
        },
        join () {
            this.$socket.client.emit('join', this.user)
        },
        submitForm () {
            this.user.id = Math.floor(Math.random() * new Date())
            localStorage.setItem('buzztard', JSON.stringify(this.user))
            this.join()
        }
    }
}
</script>
