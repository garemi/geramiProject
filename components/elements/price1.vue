<script>
  export default {
    name: "price1",
    props: {
      title: {
        type: String,
        required: true,
      },
      buy_price: {
        type: String,
        required: true,
      },
      sell_price: {
        type: String,
        required: true,
      },
    },
  };
</script>

<template>
  <v-col class="pa-2" cols="12">
    <v-card class="card-border" elevation="0">
      <v-card-text class="pa-0">
        <v-row no-gutters>
          <v-col class="text-center border-bottom black--text" cols="12">
            <p class="py-2">{{ title }}</p>
          </v-col>
          <v-col
            class="text-right border-left pa-5 d-flex justify-space-between"
            cols="6"
          >
            <div>
              <span class="d-block">خرید</span>
              <span class="success-text font-weight-bold"
                >{{ buy_price }}
              </span>
            </div>
            <div>
              <v-img :src="require('@/assets/img/toman-gram.png')"></v-img>
            </div>
          </v-col>
          <v-col class="text-right pa-5 d-flex justify-space-between" cols="6">
            <div>
              <span class="d-block">فروش</span>
              <span class="error--text font-weight-bold"
                >{{ sell_price }}
              </span>
            </div>
            <div>
              <v-img :src="require('@/assets/img/toman-gram.png')"></v-img>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<style scoped>
  .card-border {
    border: 1px solid #f0f0f0;
    border-radius: 16px;
  }

  .border-bottom {
    border-bottom: 1px solid #f0f0f0;
  }

  .border-left {
    border-left: 1px solid #f0f0f0;
  }
</style>
