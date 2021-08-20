<template>
  <!--
    There is a bug in the combination of SSR and v-data-table which causes
    an error stating that the virtual DOM does not match server-rendered content.
    It can be resolved, but not in the time that is left for the assignment.
  -->
  <client-only>
    <v-card>
      <v-card-title>
        <v-toolbar-title>
          Overview
        </v-toolbar-title>

        <v-spacer />

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
import { ITiming, IUser, TTimingList, TUserList } from '~/types'

export default defineComponent({
  name: 'TimingListing',
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
      return this.timings.map((timing: ITiming) => {
        const user = this.users.find((user: IUser) => user.id === timing.userId)

        if (!user) return { ...timing, user: undefined }

        let fullname = user.first_name

        if (user.last_name_prefix)
          fullname = `${fullname} ${user.last_name_prefix}`

        fullname = `${fullname} ${user.last_name}`

        return {
          ...timing,
          user: fullname
        }
      })
    },
  },
  async beforeMount() {
    await this.$store.dispatch('users/fetchUsers')
  },
})
</script>
