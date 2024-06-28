<template>
  <div class="mx-4 mt-10">
    <common-sub-header title="نشان شده‌ها" />
    <v-row v-if="loading" class="mt-7">
      <v-col cols="6" v-for="i in 5" :key="i">
        <v-skeleton-loader type="card"> </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class="mt-7" no-gutters v-else>
      <v-col cols="6" v-for="(marked, i) in saves?.data" :key="i" class="pa-2">
        <user-cards-ads :item="marked" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import services from "@/services";
  export default {
    data() {
      return {
        loading: false,
      };
    },
    layout: "users-panel",
    async asyncData({ $axios }) {
      const saves = await $axios.$get("/posts/my-saves", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return { saves };
    },
    methods: {
      getSaves() {
        this.loading = true;
        services.bookmark
          .get(null, {
            with: [
              "model.createby",
              "model.reviews",
              "model.image",
              "model.county",
            ],
          })
          .then((response) => {
            this.loading = false;
            this.saves = response.data.data;
          })
          .catch((error) => {
            this.loading = false;
            this.$toast.error(getErrorText(error));
          });
      },
    },
    mounted() {
      // this.getSaves();
    },
  };
</script>
