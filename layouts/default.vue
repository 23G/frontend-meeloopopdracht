<template>
    <div>
        <nuxt-link to="/" class="text-xl font-bold">23GP</nuxt-link>
        <div class="flex">
            <nuxt-link to="/">Overview</nuxt-link>
            <nuxt-link to="/leaderboard">Leaderboard</nuxt-link>
        </div>
        <Nuxt />
    </div>
</template>

<script>
export default {
    name: 'LayoutDefault',
};
</script>
