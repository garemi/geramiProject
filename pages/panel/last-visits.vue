<template>
  <div class="mx-4 mt-10">
    <common-sub-header title="آخرین بازدید ها" />
    <v-row v-if="loading" class="mt-7">
      <v-col cols="6" v-for="i in 5" :key="i">
        <v-skeleton-loader type="card"> </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class="mt-7" no-gutters>
      <v-col cols="6" v-for="(item, i) in visits?.data" :key="i" class="pa-2">
        <user-cards-ads :item="item" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import services from "@/services";
  export default {
    data() {
      return {
        visits: [],
        loading: false,
      };
    },
    layout: "users-panel",
    async asyncData({ $axios }) {
      const visits = await $axios.$get("/posts/viewed", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return { visits };
    },
    methods: {
      getVisits() {
        this.loading = true;
        services.user
          .getVisits(null)
          .then((response) => {
            this.loading = false;
            this.visits = response.data;
          })
          .catch((error) => {
            this.loading = false;
            this.$toast.error(getErrorText(error));
          });
        console.log("visits", this.visits);
      },
    },
    mounted() {
      // this.getVisits();
    },
  };
</script>
<style scoped></style>
