<template>
  <div class="mx-4 mt-10">
    <user-proposal-dialog
      v-model="dialogShow"
      :post="post"
      @closeDialog="closeDialog"
    />
    <common-sub-header title="قیمت‌های پیشنهادی" />
    <v-row v-if="loading" no-gutters>
      <v-col v-for="(item, index) in 4" :key="index" class="my-1" cols="12">
        <v-skeleton-loader
          class="custom-rounded"
          height="70px"
          type="image"
          width="100%"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else-if="proposals.data.length" no-gutters>
      <template v-for="(proposal, index) in proposals.data">
        <v-col
          :key="index"
          class="my-1"
          cols="12"
          v-if="proposal?.user?.id == $store.state.userData?.id"
        >
          <user-prices-card :proposal="proposal" />
        </v-col>
      </template>
      <template v-for="(proposal, index) in proposals.data">
        <v-col
          :key="index"
          class="my-1"
          cols="12"
          v-if="proposal?.user?.id != $store.state.userData?.id"
        >
          <user-prices-card :proposal="proposal" :isTopest="index === 0" />
        </v-col>
      </template>
    </v-row>
    <no-item v-else expandViewport />
    <v-btn
      absolute
      bottom
      class="custom-rounded"
      dark
      right
      @click="openDialog"
    >
      <v-icon>mdi-plus</v-icon>
      پیشنهاد بالاتر
    </v-btn>
  </div>
</template>
<script>
  import services from "@/services";

  export default {
    layout: "users-panel",
    data() {
      return {
        loading: false,
        // proposals: [],
        dialogShow: false,
      };
    },
    async asyncData({ $axios, route }) {
      const post = await $axios.$get(`/posts/${route.query.property}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const proposals = await $axios.$get(
        `/posts/${route.query.property}/proposals`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );

      return { post, proposals };
    },
    methods: {
      getProposals() {
        this.loading = true;
        services.proposal
          .get(null, {
            conditions: {
              property_id: this.$route.query.property,
            },
          })
          .then((response) => {
            this.loading = false;
            this.proposals = response.data.data;
          })
          .catch((error) => {
            this.$toast.error(getErrorText(error));
          });
      },
      openDialog() {
        this.dialogShow = true;
      },
      async closeDialog() {
        this.proposals = await this.$axios.$get(
          `/posts/${this.$route.query.property}/proposals`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
          (this.dialogShow = false),
        );
      },
    },
    mounted() {
      // this.getProposals();
    },
  };
</script>
