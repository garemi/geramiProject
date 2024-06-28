<template>
  <div>
    <home-forgot
      v-if="!showRecovery"
      @show-recovery="showRecoveryComponent"
      @cellphone="cellphoneValue = $event"
    />
    <home-forgot-recovery v-else :cellphoneValue="cellphoneValue" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showRecovery: false,
      };
    },
    methods: {
      showRecoveryComponent() {
        this.showRecovery = true;
      },
    },
  };
</script>

<style></style>
