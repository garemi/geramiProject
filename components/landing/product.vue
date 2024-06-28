<template>
  <div>
    <v-card class="ma-3 custom-rounded" v-for="(item, i) in data" :key="i">
      <v-card-text class="pa-2 overflow-hidden">
        <v-row no-gutters>
          <v-col cols="5">
            <landing-details-image :item="item" />
          </v-col>
          <v-col cols="5">
            <landing-details-product-info :item="item" />
          </v-col>
          <v-col cols="2" align="left">
            <avertisement-details-allowed-transaction-time
              class="expand-height"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script scoped>
  import services from "@/services";
  export default {
    data() {
      return {
        loading: false,
        data: [],
      };
    },
    methods: {
      getProperties() {
        this.loading = true;
        services.property
          .get()
          .then((response) => {
            this.loading = false;
            this.data = response.data.data;
          })
          .catch((error) => {
            this.loading = false;
          });
      },
    },
    mounted() {
      this.getProperties();
    },
  };
</script>
