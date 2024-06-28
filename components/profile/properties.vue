<template>
  <div class="mx-4 pb-16">
    <v-row v-if="loading" class="mt-5">
      <v-col v-for="i in 5" :key="i" cols="6">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row
      v-else-if="!saves.length"
      class="mt-5 flex items-center justify-content min-h-[calc(100vh-500px)]"
      no-gutters
    >
      <v-col cols="12" class="text-center"> هیچ موردی وجود ندارد </v-col>
    </v-row>
    <v-row v-else no-gutters>
      <v-col v-for="(marked, i) in saves" :key="i" class="pa-2" cols="6">
        <user-cards-ads :item="marked" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import services from "@/services";

  export default {
    props: {
      userId: {
        type: String,
        required: true,
      },
      isMine: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        loading: false,
        saves: [],
      };
    },
    methods: {
      async getMyItems() {
        this.loading = true;
        if (this.isMine) {
          const res = await this.$axios.$get("/posts/my", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          this.saves = res.data;
        } else {
          const res = await this.$axios.$get(
            `/posts/user/${this.$route.params.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            },
          );
          this.saves = res.data;
        }
        this.loading = false;
      },
    },
    mounted() {
      this.getMyItems();
    },
  };
</script>
