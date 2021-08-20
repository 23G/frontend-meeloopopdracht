<template>
    <v-app dark>
        <h1 v-if="error.statusCode === 404" class="h6">
            {{ pageNotFound }}
        </h1>

        <h1 v-else class="h6">
            {{ otherError }}
        </h1>

        <NuxtLink to="/">
            Home page
        </NuxtLink>

        <v-footer app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data: () => ({
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
  }),
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

