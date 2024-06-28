<template>
  <v-card
    class="text-center black--text"
    color="var(--nescafe-color)"
    elevation="0"
  >
    <v-card-text>{{ title }}</v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: "quick-access-card",
    props: {
      title: {
        type: String,
      },
      link: {
        type: String,
      },
    },
  };
</script>

<style scoped></style>
