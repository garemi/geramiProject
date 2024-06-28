<template>
  <div>
    <home-register
      v-if="!showAuthentication"
      @show-authentication="showCompleteRegistrationComponent"
      @cellphone="cellphoneValue = $event"
    />
    <home-register-complete-registration
      v-if="showCompleteRegistration"
      :cellphoneValue="cellphoneValue"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        showAuthentication: false,
        showCompleteRegistration: false,
        userId: null,
      };
    },
    methods: {
      showAuthenticationComponent() {
        this.showAuthentication = true;
      },
      showCompleteRegistrationComponent() {
        this.showAuthentication = true;
        this.showCompleteRegistration = true;
      },
    },
  };
</script>

<style></style>
