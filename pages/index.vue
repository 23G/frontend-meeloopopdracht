<template>
    <div class="flex min-h-screen items-center justify-center p-6">
        <div class="flex flex-col items-center gap-y-6">
            <Logo />
            <h1
                class="text-center text-4xl font-extrabold uppercase leading-tight text-white md:text-6xl md:leading-tight"
            >
                Frontend<br />Meeloop&shy;opdracht
            </h1>

            <span
                class="inline-flex self-center bg-primary py-2 px-6 font-semibold uppercase italic text-white"
            >
                #kangewoon
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'IndexPage',
});
</script>
