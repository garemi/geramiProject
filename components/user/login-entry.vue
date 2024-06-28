<template>
  <div>
    <p class="text-500">لطفا ابتدا شماره همراه خود را وارد کنید.</p>
    <v-form ref="form">
      <v-text-field
        v-model="cellphone"
        :rules="[rules.required, rules.cellphone]"
        background-color="#fff"
        class="mt-6 pt-0"
        color="var(--dark-gray)"
        dense
        elevation="0"
        filled
        flat
        hide-details
        label="شماره همراه"
        required
      >
      </v-text-field>
      <v-btn
        block
        class="d-flex justify-space-between align-center mt-7 rounded-lg"
        color="#312f27"
        dark
        height="50px"
        :loading="loading"
        @click="sendCode"
      >
        <p>مرحله بعد</p>
        <div class="chevron-border" dark>
          <v-icon
            class="d-flex justify-center align-center"
            style="transform: rotate(-45deg)"
          >
            mdi-chevron-left
          </v-icon>
        </div>
      </v-btn>
    </v-form>
  </div>
</template>
<script>
  import { rules } from "@/constants/VuetifyRules.js";

  export default {
    data() {
      return {
        rules,
      };
    },
    methods: {
      sendCode() {
        if (!this.$refs.form.validate()) {
          this.$toast.error("لطفا شماره تلفن را به درستی وارد نمایید.");
          return;
        }

        this.$emit("sendCode");
      },
    },
    computed: {
      cellphone: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
    },
    props: {
      value: {
        type: String,
        required: true,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
