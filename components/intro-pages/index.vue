<template>
  <v-container class="pt-0">
    <v-row class="pt-0">
      <v-col cols="12">
        <viana-img :src="item.img" height="60vh" contain></viana-img>
        <h3
          class="intro-dark-gray custom-text-500 font-weight-bold text-center my-2"
        >
          {{ item.title }}
        </h3>
        <p class="text-center">{{ item.desc }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {};
    },
  };
</script>
