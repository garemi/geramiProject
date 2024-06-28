<template>
  <span v-if="$store.state.userData.role === 'user'">
    <div
      class="bg-gradiant d-flex align-center justify-space-between rounded-lg px-2 my-3"
      @click="$router.push('panel/user-shop-convertion')"
    >
      <div class="d-flex align-center">
        <v-img :src="require('@/assets/img/shop-icon.svg')"></v-img>
        <p class="md-text text-500 mr-1 white--text">مغازه بزن</p>
      </div>
      <div class="d-flex align-center">
        <v-col class="d-flex align-center" cols="2">
          <v-icon
            class="d-flex justify-center align-center text-200"
            color="white"
            @click="openDialog"
          >
            mdi-chevron-left
          </v-icon>
        </v-col>
      </div>
    </div>
  </span>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {
      openDialog() {
        this.$emit("openDialog");
      },
    },
  };
</script>
<style scoped>
  .bg-gradiant {
    background-image: linear-gradient(to right, #fed555 70%, #dbbb4c);
  }
</style>
<style>
  .v-btn:not(.v-btn--round).v-size--small {
    min-width: 0;
  }
</style>
