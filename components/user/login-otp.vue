<template>
  <div>
    <p class="text-500 mb-3">لطفا کد ارسال شده به همراهتان را وارد کنید</p>
    <v-form>
      <v-otp-input
        default
        length="6"
        type="number"
        v-model="otp"
        style="direction: ltr"
      >
      </v-otp-input>
      <v-row class="justify-space-between" no-gutters>
        <v-col class="d-flex align-center justify-start" cols="6">
          <v-icon color="var(--dark-gray)">mdi-timer-sand-complete</v-icon>
          <p color="var(--dark-gray)">00:{{ timer }}</p>
        </v-col>
        <v-col cols="6" align="left">
          <v-btn
            text
            class="d-flex align-center px-0"
            @click="auth ? resendAuth() : resendCode()"
            :disabled="is_disabled"
          >
            <v-icon color="var(--dark-gray)">mdi-refresh</v-icon>
            <p color="var(--dark-gray)">ارسال مجدد کد</p>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="align-center mt-7" v-if="withBtn">
        <v-col cols="3">
          <v-btn
            outlined
            width="45px"
            height="50px"
            @click="backToEntry"
            color="var(--dark-gray)"
          >
            <v-icon color="var(--dark-gray)">mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="9">
          <v-btn
            color="#312f27"
            dark
            block
            class="d-flex justify-space-between align-center rounded-lg mr-2"
            height="50px"
            :loading="loading"
            @click="register"
          >
            <p>مرحله بعد</p>
            <div class="chevron-border" dark>
              <v-icon
                style="transform: rotate(-45deg)"
                class="d-flex justify-center align-center"
              >
                mdi-chevron-left
              </v-icon>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
  import services from "@/services";
  import Axios, { getErrorText } from "@/constants/VianaAxios";
  export default {
    data() {
      return {
        otp: "",
        is_disabled: true,
        access_token: "",
        loading: false,
      };
    },
    methods: {
      backToEntry() {
        this.$emit("backToEntry");
      },
      resendCode() {
        this.$emit("resendCode");
      },
      resendAuth() {
        this.$emit("resendCode");
      },
      async register() {
        this.loading = true;
        let data = new FormData();
        data.append("cellphone", this.cellphone);
        data.append("code", this.otp);

        try {
          const response = await this.$axios.$post("/users/register", data);
          Axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data[0].jwt}`;

          console.log("login", response);

          localStorage.setItem("token", response.data[0].jwt);

          this.$store.commit("setToken", response.data[0].jwt);
          this.$store.commit("setUserData", {
            ...response.data[0].user,
            ...response.data[1],
            // roleName: response.data.data[1].roles[0]?.name,
          });
          this.$toast.success("با موفقیت وارد شدید. خوش آمدید :)");
          this.$router.replace("/");

          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
          this.$toast.error(getErrorText(error));
        }
      },
    },

    computed: {
      timer: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
    },
    watch: {
      timer() {
        if (this.timer == 0) {
          this.is_disabled = false;
        }
      },
      otp() {
        if (!this.withBtn) {
          this.$emit("sendOTP", this.otp);
        }
      },
    },
    props: {
      value: {
        type: Number,
        required: true,
      },
      cellphone: {
        type: String,
        default: "",
      },
      withBtn: {
        type: Boolean,
        default: false,
      },
      auth: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
