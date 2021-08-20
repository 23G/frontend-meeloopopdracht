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

            <v-spacer />

            <v-chip
                title="Toggle laptime form"
                color="primary"
                text-color="white"
                @click.stop="drawer = !drawer"
            >
                New laptime
                <v-icon right>
                    mdi-timeline-plus
                </v-icon>
            </v-chip>
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

        <v-navigation-drawer
            v-model="drawer"
            right
            temporary
            fixed
        >
            <TimingForm />
        </v-navigation-drawer>

        <v-footer app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'LayoutDefault',
    components: {
        'Logo23GLogo': () => import('~/components/logo/23GLogo.vue'),
        'TimingForm': () => import('~/components/timing/Form.vue')
    },
    data: () => ({
        fixed: true,
        drawer: false,
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
