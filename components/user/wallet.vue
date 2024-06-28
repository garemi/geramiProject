<template>
  <span>
    <div
      class="bg-gradiant d-flex align-center justify-space-between rounded-lg px-2 my-3"
    >
      <div class="d-flex align-center">
        <v-icon small style="transform: rotate(-45deg)">mdi-credit-card</v-icon>
        <p class="md-text text-500 mr-1">موجودی کیف پول</p>
      </div>
      <div class="d-flex align-center">
        <p>
          <span>
            {{
              new Intl.NumberFormat().format(
                parseInt($store.state.userData?.wallet || 0),
              ) || "0"
            }}
          </span>
          ت
        </p>
        <v-col class="d-flex align-center" cols="2">
          <div class="custom-border" dark>
            <v-icon
              class="d-flex justify-center align-center text-200"
              color="var(--icon-btn)"
              style="transform: rotate(-45deg)"
              @click="openDialog"
            >
              mdi-plus
            </v-icon>
          </div>
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
    background-image: linear-gradient(
      to right,
      var(--light-gray) 70%,
      var(--medium-gray)
    );
  }
</style>
<style>
  .v-btn:not(.v-btn--round).v-size--small {
    min-width: 0;
  }
</style>
