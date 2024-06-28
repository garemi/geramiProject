<template>
  <div class="expand-height">
    <v-img
      class="img-style"
      src="https://static.mejuri.com/mejuri-com/image/fetch/c_scale,f_auto,q_60,w_1500/https://static.mejuri.com/legacy-front/production/system/spree/products/30052/original/0-VERMEILBIGGIEDOMEEARRINGS_DomeBiggieEarrings_V_Angled_241.jpg?1692711368"
    >
      <div class="d-flex align-center justify-space-between">
        <div class="pos-absolute d-flex align-center">
          <v-rating
            no-gutters
            class="no-padding"
            length="1"
            v-model="rating"
            color="orange "
            size="large"
            readonly
          >
          </v-rating>
          <p class="md-text">
            <span class="px-1 font-weight-bold">3</span>از<span class="px-1"
              >5
            </span>
          </p>
        </div>
        <div class="pos-absolute icon-left mt-1">
          <v-icon size="20">mdi-bookmark-outline</v-icon>
        </div>
      </div>
    </v-img>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        rating: 1,
      };
    },
  };
</script>
<style>
  .no-padding .v-icon {
    padding: 2px;
  }
</style>
<style scoped lang="scss">
  $rating-padding: 0 !important;
  .pos-absolute {
    position: absolute;
    top: 0.5rem;
    z-index: 5;
  }
  .img-style {
    position: relative;
    border-radius: 1rem;
    box-shadow: 0 0 20px var(--medium-gray);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .icon-left {
    left: 5px;
  }
</style>
