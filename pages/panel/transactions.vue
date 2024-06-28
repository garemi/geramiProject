<template>
  <div class="mx-6 my-12">
    <common-sub-header title="تراکنش ها" />
    <div class="mt-7">
      <span v-if="loading">
        <v-row v-for="i in 4" :key="i">
          <v-col cols="4">
            <v-skeleton-loader type="avatar"></v-skeleton-loader>
          </v-col>
          <v-col cols="8">
            <v-skeleton-loader
              type="image"
              width="100%"
              height="50px"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </span>
      <span v-else>
        <v-row
          no-gutters
          class="align-center my-6"
          v-for="(item, index) in data?.data"
          :key="index"
        >
          <v-col cols="2">
            <v-img
              :src="
                item?.formatted_type == 'شارژ حساب'
                  ? require('@/assets/img/import.svg')
                  : require('@/assets/img/export.svg')
              "
              width="25px"
            ></v-img>
          </v-col>
          <v-col cols="4">
            <div class="d-flex flex-column align-start">
              <p class="md-text font-weight-bold text-500">پرداخت معامله</p>
              <p class="sm-text gray-text">پرداخت آنلاین</p>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="d-flex flex-column align-end">
              <p class="md-text font-weight-bold text-500">
                {{ new Intl.NumberFormat().format(item?.price) || "-" }}
                <span>ت</span>
              </p>
              <p class="sm-text gray-text align-end text-left">
                {{ item?.created_at | moment("HH:mm,dddd D jMMMM ماه jYYYY") }}
              </p>
            </div>
          </v-col>
        </v-row>
      </span>
    </div>
  </div>
</template>
<script>
  import services from "@/services";
  export default {
    data() {
      return {
        loading: false,
        data: [],
      };
    },
    layout: "users-panel",
    async asyncData({ $axios }) {
      const data = await $axios.$get("/payments/my", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return { data };
    },
    methods: {
      getTransactions() {
        this.loading = true;
        services.payment
          .get()
          .then((response) => {
            this.loading = false;
            this.data = response.data.data;
          })
          .catch((error) => {
            this.loading = false;
            this.$toast.error(getErrorText(error));
          });
      },
    },
    mounted() {
      // this.getTransactions();
    },
  };
</script>
<style>
  .v-btn:not(.v-btn--round).v-size--small {
    min-width: 0;
  }
</style>
