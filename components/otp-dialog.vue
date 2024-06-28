<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="400">
      <v-card v-click-outside="onClickOutside">
        <v-card-title class="justify-center">
          <div style="display: inline-block; text-align: center">
            <v-icon style="font-size: 5em">mdi-cellphone-text</v-icon>
            <h6>کد تاییدیه</h6>
          </div>
        </v-card-title>
        <v-card-text>
          <h5 class="text-center">
            کد تاییدیه ارسال شده به تلفن همراه خود را در کادر پایین وارد نمایید
          </h5>
          <v-otp-input
            default
            length="6"
            type="number"
            v-model="otp"
            style="direction: ltr"
          ></v-otp-input>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            id="accept_rules"
            @click="onCancle()"
            color="rgba(0,0,0,.12)"
            elevation="0"
          >
            <v-icon right dark> mdi-arrow-right </v-icon>
            بازگشت
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            id="accept_rules"
            color="success"
            @click="checkOtp"
          >
            <v-icon right dark> mdi-check </v-icon>
            تایید کد پیامکی
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import VianaAxios, { getErrorText } from "../constants/VianaAxios";

  export default {
    name: "OtpDialog",
    data: () => {
      return {
        dialog: false,
        otp: null,
        loading: false,
      };
    },
    components: {},
    methods: {
      onClickOutside: function () {
        if (this.dialog === true) {
          let item = document.getElementsByClassName("v-dialog--active")[0];
          if (item) item.scrollTo({ top: 500, behavior: "smooth" });
        }
      },
      checkOtp: function () {
        //check from request $request
        if (!this.loading) this.loading = true;
        VianaAxios.post("/user/auth", {
          cellphone: this.cellphone,
          otp: this.otp,
        })
          .then((response) => {
            //User should be logged in
            this.dialog = false;
            this.loading = false;
            console.log(response.data.data);
            VianaAxios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.data["0"].access_token;

            localStorage.setItem(
              "_token",
              JSON.stringify(response.data.data[0]),
            );

            const userData = response.data?.data["1"] || null;

            this.$store.commit(
              "setUserDataWithToken",
              {
                ...userData,
                roleName: response.data.data["roles"][0].name,
              },
              response.data.data["0"],
            );

            if (
              !userData.first_name ||
              !userData.last_name ||
              !userData.national_code
            ) {
              this.$emit("openLoginDetails", userData);
            } else {
              this.$toast.success("با موفقیت وارد شدید. خوش آمدید :)");
              this.$router.replace("/panel");
            }
          })
          .catch((error) => {
            this.dialog = false;
            this.loading = false;
            this.$toast.error(getErrorText(error));
          });
      },
      onCancle() {
        this.dialog = false;
      },
    },
    watch: {
      otp(value) {
        if (value.length === 6) this.checkOtp();
      },
    },
    props: {
      cellphone: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped></style>
