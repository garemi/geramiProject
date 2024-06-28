<template>
  <div
    class="expand d-flex flex-column flex-center"
    :class="{ 'full-viewport': expandViewport }"
  >
    <v-img
      contain
      max-height="80px"
      max-width="80px"
      class="mb-5"
      alt="موردی برای نمایش وجود ندارد"
      :src="require('@/assets/img/out-of-stock.png')"
    ></v-img>
    موردی برای نمایش وجود ندارد.
  </div>
</template>

<script>
  export default {
    props: {
      expandViewport: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped>
  .full-viewport {
    height: 80vh;
  }
</style>
