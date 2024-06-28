<template>
  <v-img :src="src" v-bind="$attrs" v-on="$listeners">
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          v-if="src"
          indeterminate
          :color="dark ? 'white' : 'var(--primary)'"
        />
        <v-btn v-else text disabled> بدون تصویر </v-btn>
      </v-row>
    </template>
    <slot />
  </v-img>
</template>

<script>
  export default {
    props: {
      src: String,
      dark: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
