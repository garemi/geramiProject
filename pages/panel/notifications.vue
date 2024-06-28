<template>
  <div class="mx-6 mt-10">
    <common-sub-header title="اعلانات" />
    <v-row class="my-5" no-gutters>
      <!-- <v-col class="d-flex align-center" cols="12">
        <small class="gray-text">امروز</small>
        <v-divider class="mx-1"></v-divider>
      </v-col> -->
      <v-col v-if="loading" class="mt-5" cols="12">
        <users-panel-notifications-item
          v-for="index in 2"
          :key="index"
          :loading="loading"
        />
      </v-col>
      <v-col v-else class="mt-5" cols="12">
        <users-panel-notifications-item
          v-for="(items, index) in notificationArray.data"
          :key="index"
          :item="items"
        />
      </v-col>

      <!-- <v-col class="d-flex align-center my-5" cols="12">
        <small class="gray-text">گذشته</small>
        <v-divider class="mx-1"></v-divider>
      </v-col>
      <v-col cols="12">
        <users-panel-notifications-item />
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
  import services from "@/services";

  export default {
    layout: "empty",
    data() {
      return {
        loading: false,
      };
    },
    mounted() {
      // this.getNotification();
    },
    // /notifications/my
    async asyncData({ $axios }) {
      const notificationArray = await $axios.$get("/notifications/my", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return { notificationArray };
    },
    methods: {
      getNotification() {
        this.loading = true;
        services.user
          .notifications()
          .then((response) => {
            this.notificationArray = response.data;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      },
    },
  };
</script>

<style></style>
