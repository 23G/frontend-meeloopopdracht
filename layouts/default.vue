<template>
    <v-app dark>
        <v-app-bar
            fixed
            app
            clipped-left
        >
            <NuxtLink to="/">
                <Logo23GLogo />
            </NuxtLink>
        </v-app-bar>

        <v-navigation-drawer permanent app clipped>
            <v-list dense nav>
                <v-list-item v-for="(item, i) in items" :key="`nav-item-${i}`" :to="item.to" nuxt>
                    <v-list-item-icon>
                        <v-icon>
                            {{ item.icon }}
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container fluid class="fill-height align-start">
                <Nuxt />
            </v-container>
        </v-main>

        <v-footer app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'LayoutDefault',
    components: {
        'Logo23GLogo': () => import('~/components/logo/23GLogo.vue')
    },
    data: () => ({
        fixed: true,
        items: [
            {
                icon: 'mdi-view-list-outline',
                title: 'Overview',
                to: '/'
            },
            {
                icon: 'mdi-timetable',
                title: 'Leaderboard',
                to: '/leaderboard'
            },
        ],
    }),
}
</script>
