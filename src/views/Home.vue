<template>
    <div class="flex flex-col w-full text-3xl text-center">
        <div v-if="$route?.query?.error === 'alreadyHosted'" class="absolute inset-x-0 top-0 py-3 font-extrabold text-white bg-pink-300">Det finns redan en host! 🖕</div>
        <h2 class="mb-6 text-5xl italic font-black text-center text-white">Quizzbuzz</h2>
        <RouterLink :to="{name:'host'}" class="px-3 py-2 mb-4 italic font-black text-indigo-900 bg-pink-300 rounded drop-shadow">Jag ska hosta</RouterLink>
        <RouterLink :to="{name:'player'}" class="px-3 py-2 italic font-black text-pink-300 bg-indigo-700 rounded drop-shadow">Jag ska spela</RouterLink>
    </div>
</template>

<script>
export default {
    name: 'Home'

}
</script>
