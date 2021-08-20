<template>
  <div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useUsers from '@/composables/useUsers'

export default defineComponent({
  setup() {
    useUsers()
  },
})
</script>
