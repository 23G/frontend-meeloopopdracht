<template>
    <div style="width: 100%;">
        <TimingListing />
    </div>
</template>

<script>
export default {
    name: 'Overview',
    components: {
        'TimingListing': () => import('@/components/timing/Listing.vue')
    },
};
</script>
