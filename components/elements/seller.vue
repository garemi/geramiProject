<script>
  export default {
    name: "price1",
    props: {
      name: String,
      buy_price: {
        type: String,
        required: true,
      },
      sell_price: {
        type: String,
        required: true,
      },
      image: String,
      address: String,
      id: String,
    },
  };
</script>

<template>
  <v-col class="pa-2" cols="12">
    <v-card class="card-border" elevation="0">
      <v-card-text class="pa-0">
        <v-row no-gutters>
          <v-col class="text-center border-bottom black--text" cols="12">
            <div class="p-3 flex w-full justify-between">
              <div class="flex items-center gap-3">
                <div class="pl-2 d-flex align-center justify-center w-14">
                  <v-img
                    :src="image ? image : require('@/assets/img/default.jpg')"
                    class="custom-rounded expand-width aspect-square"
                  >
                  </v-img>
                </div>
                <div
                  :style="
                    screen == 320 ? 'line-height: 15px' : 'line-height: 20px'
                  "
                  class="pl-2 d-flex align-center"
                >
                  <div class="d-flex flex-column align-start overflow-hidden">
                    <p
                      :class="screen == 320 ? 'sm-text' : 'md-text'"
                      class="text-200 seller-title"
                    >
                      {{ name }}
                    </p>
                    <span class="d-flex align-center">
                      <v-icon x-small>mdi-map-marker-outline</v-icon>
                      <span
                        :class="screen == 320 ? 'xs-text' : 'sm-text'"
                        class="ont-weight-bold text-200"
                      >
                        {{ address }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2 !grow-0 w-fit">
                <nuxt-link :to="`/chat?conversation_id=${id}`">
                  <v-img :src="require('@/assets/img/greyMessage.svg')"></v-img>
                </nuxt-link>
                <nuxt-link :to="`/profile/${id}`">
                  <v-img :src="require('@/assets/img/info.svg')"></v-img>
                </nuxt-link>
              </div>
            </div>
            <span class="seller-custom-icon overflow-visible">
              <v-icon color="white" small style="transform: rotate(-45deg)"
                >mdi-storefront
              </v-icon>
            </span>
          </v-col>
          <v-col
            class="text-right border-left pa-5 d-flex justify-space-between items-center"
            cols="6"
          >
            <div>خرید</div>
            <div class="flex items-center justify-end gap-2">
              <span class="success-text font-weight-bold"
                >{{
                  buy_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </span>
              <div>
                <v-img :src="require('@/assets/img/toman-gram.png')"></v-img>
              </div>
            </div>
          </v-col>
          <v-col
            class="text-right pa-5 d-flex justify-space-between items-center"
            cols="6"
          >
            <div>فروش</div>
            <div class="!flex items-center justify-end gap-2">
              <span class="error--text font-weight-bold"
                >{{
                  sell_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </span>
              <div>
                <v-img :src="require('@/assets/img/toman-gram.png')"></v-img>
              </div>
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
