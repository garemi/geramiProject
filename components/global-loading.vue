<template>
  <div class="mainloading-div d-flex justify-center align-center" v-if="show">
    <div class="text-center">
      <v-avatar tile size="150">
        <v-img :src="require('@/assets/img/logo.png')" contain />
      </v-avatar>
      <h1 class="my-8">در حال بارگذاری</h1>
      <v-progress-linear indeterminate color="yellow darken-2">
      </v-progress-linear>
      <br />
      <v-progress-linear indeterminate color="green"></v-progress-linear>
      <br />
      <v-progress-linear indeterminate color="teal"></v-progress-linear>
      <br />
      <v-progress-linear indeterminate color="cyan"></v-progress-linear>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
      };
    },
    mounted() {
      this.$root.$on("globalLoadingSet", (show) => {
        this.show = show;
      });
    },
  };
</script>

<style scoped>
  .mainloading-div {
    position: fixed;
    /* position: absolute; */
    background: rgba(255, 255, 255, 0.95);
    z-index: 1000;
    width: 100%;
    height: 100vh;

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
</style>
