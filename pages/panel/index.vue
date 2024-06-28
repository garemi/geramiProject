<template>
  <span>
    <user-payment-dialog v-model="showDialog" @closeDialog="closeDialog" />
    <div class="mx-3 mb-7">
      <user-shop />
      <user-wallet @openDialog="openDialog" />

      <v-row class="my-5" no-gutters>
        <v-col align="center" class="pl-2" cols="6">
          <v-btn
            :to="'/panel/notifications'"
            block
            class="rounded-lg py-5"
            color="var(--bg-button)"
            elevation="0"
          >
            <div class="expand-width d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <v-icon class="ml-2" color="var(--text-300)" small>
                  mdi-bell
                </v-icon>
                <p class="md-text">اعلانات</p>
              </div>
              <div class="d-flex align-center">
                <span class="circular-chip mr-3">{{
                  notificationArray.data?.length
                }}</span>
                <v-icon small>mdi-chevron-left</v-icon>
              </div>
            </div>
          </v-btn>
        </v-col>
        <v-col align="center" class="pr-2" cols="6">
          <v-btn
            block
            class="rounded-lg py-5"
            color="var(--bg-button)"
            elevation="0"
            to="/panel/saved-ads"
          >
            <div class="d-flex align-center justify-space-between expand-width">
              <v-icon class="ml-2" color="var(--text-300)" small>
                mdi-bookmark
              </v-icon>
              <p class="md-text">نشان شده‌ها</p>
              <v-icon small>mdi-chevron-left</v-icon>
            </div>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(item, index) in data" :key="index" cols="12">
          <div
            :color="item?.colorRed ? 'red' : 'var(--text-300)'"
            class="d-flex align-center justify-space-between cursor-pointer"
            @click="$router.push(item?.link)"
          >
            <div class="d-flex align-center">
              <v-img :src="item?.icon" class="ml-3"></v-img>
              <p class="md-text">{{ item?.title }}</p>
            </div>
            <v-btn v-if="item?.hasButton" :ripple="false" class="px-0" plain>
              <p
                v-if="$store.state.userData.is_authenticated"
                class="text-100 md-text"
                style="color: green"
                >تایید شده</p
              >
              <p v-else class="text-100 md-text">تایید نشده</p>
              <v-icon color="var(--text-200)">mdi-chevron-left</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col
          class="mt-0 mb-15 d-flex align-start text-right cursor-pointer"
          cols="12"
        >
          <div class="d-flex" @click="logout">
            <v-img
              :src="require('@/assets/img/panel-logout.svg')"
              class="ml-3"
              contain
              height="16"
            ></v-img>
            <p class="red-text md-text">خروج از حساب کاربری</p>
          </div>
        </v-col>
      </v-row>
    </div>
  </span>
</template>
<script>
  export default {
    middleware: "authenticated",
    layout: "user-panel-with-name",
    data() {
      return {
        showDialog: false,
        data: [
          {
            title: "اطلاعات حساب کاربری",
            icon: require("@/assets/img/panel-info.svg"),
            link: "/panel/user-information",
          },
          {
            title: "آدرس",
            icon: require("@/assets/img/panel-address.svg"),
            link: "/panel/address",
          },
          {
            title: "تایید هویت",
            icon: require("@/assets/img/panel-auth.svg"),
            hasButton: true,
            link: "/panel/authentication",
          },
          {
            title: "آخرین بازدید ها",
            icon: require("@/assets/img/panel-recent.svg"),
            link: "/panel/last-visits",
          },

          {
            title: "تراکنش ها",
            icon: require("@/assets/img/panel-payments.svg"),
            link: "/panel/transactions",
          },
          {
            title: "پشتیبانی",
            icon: require("@/assets/img/panel-support.svg"),
            link: "/panel/tickets",
          },
          {
            title: "درباره ما",
            icon: require("@/assets/img/panel-about.svg"),
            link: "/panel/about-us",
          },
        ],
      };
    },
    async asyncData({ $axios }) {
      const notificationArray = await $axios.$get("/notifications/my", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return { notificationArray };
    },
    methods: {
      openDialog() {
        this.showDialog = true;
      },
      closeDialog() {
        this.showDialog = true;
      },
      logout() {
        this.$store.commit("exit");
        localStorage.removeItem("token");
        localStorage.removeItem("jewerly");
        this.$router.replace("/login");
      },
    },

    async mounted() {
      const res = await this.$axios.$get("/users/dashboard", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      this.$store.commit("setUserData", res.data.user);
    },
  };
</script>
<style scoped>
  .circular-chip {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--light-red);
    color: red;
  }

  .box-1 {
    height: 50px;
    width: 50px;
    background: #f1f0ec;
    border-radius: 10px;
    margin: auto;
  }

  .badge-1-golden {
    background-color: #d9ba4b !important;
  }

  .badge-1 {
    background-color: rgb(66, 64, 56);
    border-color: rgb(66, 64, 56);
    position: absolute;
    top: 2px;
    left: 55px;
    border-radius: 5px;
    height: 20px;
    width: 20px;
    text-align: center;
  }
</style>
