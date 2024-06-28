<template>
  <div class="d-flex flex-wrap">
    <div v-for="(route, i) in routes" :key="i" class="d-flex my-auto">
      <v-btn
        :color="
          dark ? (i == routes.length - 1 ? 'black' : 'grey darken-2') : 'white'
        "
        text
        :to="route.url"
      >
        <div class="caption-light">{{ route.title }}</div>
      </v-btn>
      <div
        v-if="i < routes.length - 1"
        class="my-auto"
        :class="dark ? 'grey--text darken-2' : 'white--text'"
      >
        {{ " > " }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // routes should have object in each indices and each object should have "title" and "url"
      routes: {
        type: Array,
        required: true,
      },
      dark: {
        type: Boolean,
        default: true,
      },
    },
  };
</script>

<style scoped>
  .v-btn--active::before {
    opacity: 0;
  }
</style>
