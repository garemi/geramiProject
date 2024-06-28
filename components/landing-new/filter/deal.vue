<template>
  <span>
    <div class="d-flex align-center justify-space-between">
      <p class="font-weight-bold black-text md-text">مهلت معامله</p>
      <p class="gray-text md-text"
        >مدت مهلت معامله: {{ inputVal }} روز ، {{ time }} ساعت</p
      >
    </div>
    <v-row no-gutters class="mt-2 justify-space-between" style="width: 100%">
      <v-col
        cols="5"
        class="custom-card-input custom-rounded d-flex-flex-column py-1 text-center"
      >
        <p class="gray-text md-text">روز</p>
        <v-form-text-field v-model="inputVal" :rules="[rules.numeric]" />
      </v-col>
      <v-col
        cols="5"
        class="custom-card-input custom-rounded d-flex-flex-column py-1 text-center"
      >
        <p class="gray-text md-text">ساعت</p>
        <v-form-modal-time-picker v-model="time" />
      </v-col>
    </v-row>
  </span>
</template>
<script>
  import { rules } from "@/constants/VuetifyRules.js";
  import services from "@/services";
  export default {
    data() {
      return {
        inputVal: "",
        time: "",
        rules,
      };
    },
  };
</script>
<style scoped>
  .custom-card-input {
    border: 2px solid var(--medium-gray);
  }
</style>
