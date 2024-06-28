<template>
  <div class="login d-flex flex-center">
    <v-card max-width="400px" elevation="0" class="ma-auto login__card pa-4">
      <v-card-title class="justify-center">
        <div class="text-center">
          <v-img
            class="logo"
            alt="مدیریت سیستم"
            :src="require(`@/assets/img/logo.png`)"
            height="100px"
            max-width="400px"
            contain
          />
          <h6 class="primary-text mt-2">ورود به</h6>
          <h4 class="primary-text"
            >پنل مدیریت
            <small v-if="$localeProps.code == 'fa'">(فارسی)</small>
            <small v-else-if="$localeProps.code == 'en'">(انگلیسی)</small>
          </h4>
        </div>
      </v-card-title>
      <v-card-text>
        <h5 class="text-right ps-4">نام کاربری</h5>
        <v-form-text-field
          v-model="username"
          class="login-input text-center"
          :rules="[rules.required]"
          style="direction: ltr"
        />

        <h5 class="text-right ps-4">رمز عبور</h5>
        <v-form-text-field
          v-model="password"
          class="login-input text-center"
          password
          :rules="[rules.required]"
          style="direction: ltr"
        />
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          id="accept_rules"
          class="mb-5"
          :loading="loading"
          color="success"
          type="submit"
          @click="login"
        >
          <v-icon right dark> mdi-check </v-icon>
          ورود به پنل مدیریت
        </v-btn>
      </v-card-actions>
      <div class="text-center d-flex justify-space-between">
        <v-btn
          v-if="$localeProps.code == 'fa'"
          class="mb-5"
          text
          elevation="0"
          small
          :to="switchLocalePath('en')"
        >
          پنل مدیریت انگلیسی
        </v-btn>
        <v-btn
          v-else-if="$localeProps.code == 'en'"
          class="mb-5"
          text
          elevation="0"
          small
          :to="switchLocalePath('fa')"
        >
          پنل مدیریت فارسی
        </v-btn>
        <v-btn class="mb-5" text elevation="0" small :to="localePath('/')">
          بازگشت به صفحه اصلی
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
  import { Constants } from "@/constants/GlobalConstants";
  import Axios, { getErrorText } from "@/constants/VianaAxios";
  import services from "@/services";

  export default {
    name: "LoginDialog",
    layout: "admin-login",
    meta: {
      hideHeader: true,
      hideFooter: true,
    },
    data: () => {
      return {
        dialog: false,
        loading: false,
        rules: Constants.rules,
        username: null,
        password: null,
        canSubmit: false,
        show_password: false,
      };
    },
    props: {},
    methods: {
      onClickOutside: function () {
        if (this.dialog === true) {
          this.snackbar = true;
          let item = document.getElementsByClassName("v-dialog--active")[0];
          if (item) item.scrollTo({ top: 500, behavior: "smooth" });
        }
      },
      login: function () {
        //get OTP from request $request
        if (!this.loading) this.loading = true;

        let data = new FormData();

        data.append("cellphone", this.username);
        data.append("password", this.password);

        services.user
          .login(data)
          .then((response) => {
            Axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.data[0].access_token;

            localStorage.setItem(
              "token",
              JSON.stringify(response.data.data[0]),
            );

            this.$store.commit("setToken", response.data.data[0]);
            this.$store.commit("setUserData", {
              ...response.data.data[0],
              ...response.data.data[1],
              roleName: response.data.data[1].roles[0]?.name,
            });
            this.$toast.success("با موفقیت وارد شدید. خوش آمدید :)");
            this.$router.replace(this.localeLocation("/admin/dashboard"));

            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            this.$toast.error(getErrorText(error));
          });
      },
    },
  };
</script>

<style scoped lang="scss">
  .login {
    background-color: var(--primary);
    direction: rtl !important;

    position: relative;
    height: 100%;

    &__card {
      border-radius: var(--custom-border-radius);
    }
  }
</style>
