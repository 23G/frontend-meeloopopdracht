<template>
  <!--
    There is a bug in the combination of SSR and v-data-table which causes
    an error stating that the virtual DOM does not match server-rendered content.
    It can be resolved, but not in the time that is left for the assignment.
  -->
  <client-only>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search by user"
          single-line
          hide-details
        />
      </v-card-title>

      <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
        must-sort
        sort-by="laptime"
      />
    </v-card>
  </client-only>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { DataTableHeader } from 'vuetify'
import { ITiming, TTimingList, TUserList } from '~/types'

export default defineComponent({
  name: 'TimingLeaderboard',
  data: () => ({
    search: '',
    headers: [
      { text: 'Laptime (sec)', value: 'laptime', sortable: true },
      { text: 'User', value: 'user', filterable: true },
      { text: 'Datetime', value: 'datetime', sortable: true },
    ] as Array<DataTableHeader>
  }),
  computed: {
    timings(): TTimingList {
      return this.$store.state.timings.timings
    },
    users(): TUserList {
      return this.$store.state.users.users
    },
    items() {
      const userTimings: { [key: number]: ITiming } = {}

      // Map the fastest lap per user
      for (const user of this.users) {
        // Find all laps made by the current user
        const laps = this.timings.filter((timing: ITiming) => timing.userId === user.id).map((timing: ITiming) => timing)
        if (!laps.length) continue

        // Get the fastest lap the current user made
        const fastestLap = laps.reduce((res, obj) => (obj.laptime < res.laptime) ? obj : res)

        // Create a string of the user's full name
        let fullname = user.first_name

        if (user.last_name_prefix)
          fullname = `${fullname} ${user.last_name_prefix}`

        fullname = `${fullname} ${user.last_name}`

        userTimings[user.id] = {
          ...fastestLap,
          user: fullname,
        }
      }

      return Object.values(userTimings)
    },
  },
  async beforeMount() {
    await this.$store.dispatch('users/fetchUsers')
  },
})
</script>
