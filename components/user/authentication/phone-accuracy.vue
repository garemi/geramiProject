<template>
  <div>
    <v-form ref="form">
      <v-text-field
        v-if="!hasCode"
        v-model="phone"
        :rules="[rules.required, rules.cellphone]"
        background-color="#fff"
        class="mt-6 pt-0 mx-0 px-0"
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
      <user-login-otp
        v-else
        v-model="timer"
        :auth="auth"
        class="mt-6"
        @resendCode="resendCode"
        @sendOTP="sendOTP"
      />
      <v-btn
        :loading="hasCode ? otpLoading : phoneLoading"
        class="custom-rounded mt-8 mb-3 mx-auto bottom-btn-style"
        color="var(--text-700)"
        outlined
        @click="nextLevel"
      >
        مرحله بعد
      </v-btn>
    </v-form>
  </div>
</template>
<script>
  import { rules } from "@/constants/VuetifyRules.js";
  import services from "@/services";
  import { formPostPrepare } from "@/constants/PanelFormHandler";
  import { showError } from "@/constants/messages";

  export default {
    data() {
      return {
        rules,
        phone: "",
        nationalCode: "",
        hasCode: false,
        timer: 60,
        phoneLoading: false,
        otpLoading: false,
        otp: "",
        auth: true,
      };
    },
    methods: {
      nextLevel() {
        if (this.$refs.form.validate()) {
          if (this.hasCode) {
            this.verify();
          } else {
            this.getOtp();
          }
        } else {
          this.$toast.error("لطفااطلاعات را به درستی وارد کنید");
        }
      },
      startTimer() {
        this.timer = 60;
        const intervalId = setInterval(() => {
          if (this.timer > 0) {
            if (this.timer <= 10) {
              this.timer = "0" + --this.timer;
            } else {
              this.timer -= 1;
            }
          } else {
            clearInterval(intervalId);
          }
        }, 1000);
      },
      async getOtp() {
        try {
          if (!this.phoneLoading) this.phoneLoading = true;
          await this.$axios.$post(
            "/pre/authenticate",
            { phone: this.phone },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            },
          );
          this.phoneLoading = false;
          this.hasCode = true;
          this.startTimer();
        } catch (error) {
          this.phoneLoading = false;
          showError(error);
        }
      },
      async verify() {
        try {
          if (!this.otpLoading) this.otpLoading = true;
          await this.$axios.$post(
            "/authenticate",
            { code: this.otp },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            },
          );
          const pay = await this.$axios.$get("/pay/authentication", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          location.href = pay.action;
          this.otpLoading = false;
          // this.$emit("increamentLevel");
        } catch (error) {
          this.otpLoading = false;
          showError(error);
        }
      },
      sendOTP(otp) {
        this.otp = otp;
      },
      resendCode() {
        this.timer = 60;
        this.getOTP();
      },
    },
  };
</script>
<style scoped></style>
