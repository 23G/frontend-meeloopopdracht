<template>
    <div style="width: 100%;">
        <TimingLeaderboard />
    </div>
</template>

<script>
export default {
    name: 'Leaderboard',
    components: {
        'TimingLeaderboard': () => import('@/components/timing/Leaderboard.vue')
    },
};
</script>
