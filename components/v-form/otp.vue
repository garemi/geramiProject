<template>
  <v-row justify="center">
    <div class="grey--text text-right">
      {{ label }}
      <span class="error--text" v-if="$attrs.required">*</span>
    </div>
    <v-otp-input
      default
      flat
      length="5"
      type="number"
      v-model="model"
      style="direction: ltr"
      class="otp"
    ></v-otp-input>
  </v-row>
</template>

<script>
  export default {
    data: () => {
      return {
        loading: false,
      };
    },
    props: {
      value: {
        type: String,
        required: true,
      },
      cellphone: {
        type: String,
        required: true,
      },
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
          if (v.length == 5) this.$emit("checkOtp");
        },
      },
    },
  };
</script>

<style scoped></style>
