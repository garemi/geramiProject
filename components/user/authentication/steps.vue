<template>
  <v-row no-gutters class="justify-space-around">
    <v-col
      cols="1"
      v-for="(item, index) in steps"
      :key="index"
      class="d-flex flex-column justify-center align-center mt-5 mx-1 font-weight-bold"
      :style="item?.step <= level ? 'color:black' : 'color:var(--gray)'"
    >
      <v-icon small> {{ item?.icon }}</v-icon>
      <p class="sm-text text-center"> {{ item?.title }}</p>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      steps: {
        type: Array,
        required: true,
      },
      level: {
        type: Number,
        required: true,
      },
    },
  };
</script>
