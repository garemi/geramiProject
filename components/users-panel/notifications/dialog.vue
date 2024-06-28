<template>
  <v-dialog v-model="model" max-width="400" persistent>
    <v-card :loading="loading" :disabled="loading" class="dialog-borders">
      <v-card-title class="d-flex pa-3 pb-0">
        <v-row>
          <v-col cols="9" class="text-left"><h3> اطلاعیه ها </h3></v-col>
        </v-row>

        <!-- <v-spacer></v-spacer> -->
        <v-btn large icon class="d-flex flex-end ml-2" @click="close">
          <v-icon color="black">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-2">
        <v-list v-if="$store.state.userNotifications.length > 0" three-line>
          <v-card
            elevation="0"
            v-for="(item, i) in $store.state.userNotifications"
            :key="'notif' + item.id"
            class="mb-2"
          >
            <v-card-text class="d-flex justify-space-between black--text">
              <div>
                <b>{{ item.data?.title || "" }}</b>
                <div v-if="item.data?.desc" class="d-flex mt-1">
                  <span v-html="item.data?.desc" class="notification-desc" />
                </div>
              </div>

              <v-btn icon @click="readNotification(item)">
                <v-icon color="primary">mdi-eye</v-icon>
              </v-btn>
            </v-card-text>
            <v-divider
              v-if="i < $store.state.userNotifications.length - 1"
            ></v-divider>
          </v-card>
        </v-list>
        <v-row v-else no-gutters>
          <v-col cols="12" class="mt-8 mb-8">
            <p class="grey--text text-center">شما هیچ اطلاعیه جدیدی ندارید</p>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- 
      <div v-for="(item, i) in 5" :key="'item' + i" class="mr-5 mt-5">
        <h3 class="">پروفایل شما با موفقیت آپدیت شد</h3>
        <small>پروفایل شما در تاریخ 20 مرداد 1402 با موفقیت بروز شد</small>
        <v-divider class="mt-5"> </v-divider>
      </div> -->
    </v-card>
  </v-dialog>
</template>

<script>
  const interval = 10 * 60 * 1000;

  import MyAxios from "@/constants/VianaAxios";
  export default {
    name: "NotificationsDialog",
    data() {
      return {
        loading: false,
        intervalId: null,
      };
    },
    props: { value: { type: Boolean, default: false } },
    created() {
      this.getNotifications();
      // this.recreateScheduler();
    },
    watch: {
      "$route.path"() {
        this.getNotifications();
        // this.recreateScheduler();
      },
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
    },
    methods: {
      close() {
        this.model = false;
        // this.onClickOutside();
      },

      // recreateScheduler() {
      //   if (this.intervalId) clearInterval(this.intervalId);

      //   this.intervalId = setInterval(() => {
      //     this.getNotifications();
      //   }, interval);
      // },
      // onClickOutside: function () {
      //   if (this.dialog === true) {
      //     let item = document.getElementsByClassName("v-dialog--active")[0];
      //     if (item) item.scrollTo({ top: 500, behavior: "smooth" });
      //   }
      // },
      getNotifications() {
        if (this.$store.state.userData) {
          if (!this.loading) this.loading = true;

          MyAxios.get("/users/notifications", {
            params: {},
          })
            .then((response) => {
              this.loading = false;
              this.$store.commit(
                "setUserNotification",
                response.data.notifications,
              );
            })
            .catch((error) => {
              this.loading = false;
            });
        }
      },
      readNotification: function (item) {
        if (!this.loading) this.loading = true;
        MyAxios.post("users/notifications/read", {
          notification: item.id,
        })
          .then((response) => {
            this.getNotifications();
            this.loading = false;
          })
          .catch((error) => {
            this.dialog = false;
            this.loading = false;
          });
      },
    },
  };
</script>

<style scoped></style>

<style>
  .notification-desc p {
    margin: 0 !important;
  }
</style>
