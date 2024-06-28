<template>
  <div class="d-flex align-center justify-space-evenly mx-5">
    <v-tabs background-color="transparent" class="custom-tabs" color="black">
      <v-tabs-slider color="black"></v-tabs-slider>
      <v-tab v-for="(item, i) in categories" :key="i" @click="clicked(item.id)">
        {{ item.title }}
      </v-tab>
    </v-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: ["گوشواره ", "دستبند", "گردنبند"],
      };
    },
    props: {
      categories: {
        type: Array,
        required: true,
      },
    },
    methods: {
      clicked(id) {
        this.$emit("tabClicked", id);
      },
    },
  };
</script>
<style>
  .custom-tabs .v-tabs-slider {
    width: 20px !important;
    margin-left: auto;
    margin-right: auto;
  }

  .custom-tabs .v-tabs-bar__content {
    justify-content: center !important;
  }
</style>
