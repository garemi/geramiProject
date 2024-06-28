<template>
  <div>
    <div
      class="custom-rounded cursor-pointer position-relative bg-style"
      style="width: 90px; height: 90px"
      dark
    >
      <v-row no-gutters>
        <v-col cols="12" class="px-2 pt-2">
          <v-img
            :src="require('@/assets/img/rezi.webp')"
            style="width: 60px; height: 60px"
          >
          </v-img>
        </v-col>
        <v-col cols="12" class="justify-end text-left px-1">
          <p class="md-text">{{ item?.title }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      item: {
        type: String,
        default: "حلقه",
      },
    },
  };
</script>
<style scoped>
  .bg-style {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-image: linear-gradient(to right, #9d7034, #ba9a66);
    color: white;
  }
</style>
