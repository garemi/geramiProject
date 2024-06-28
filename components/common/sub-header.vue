<template>
  <div class="d-flex align-center justify-start my-3">
    <v-btn
      color="var(--medium-gray)"
      small
      elevation="0"
      style="width: 30px"
      class="rounded-lg"
      @click="$router.go(-1)"
    >
      <v-icon color="var(--gray)">mdi-chevron-right</v-icon>
    </v-btn>
    <h4 class="mr-2" :class="dark ? 'white--text' : 'text-500'">
      {{ title }}
    </h4>
    <v-spacer />
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      dark: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style></style>
