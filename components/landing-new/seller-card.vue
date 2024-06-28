<template>
  <v-card
    class="custom-rounded overflow-visible"
    elevation="0"
    style="border: 2px solid white"
  >
    <v-card-text
      :class="screen == 320 ? 'pa-1' : 'pa-2'"
      class="overflow-visible position-relative"
      style="background-color: var(--background)"
    >
      <span class="seller-custom-icon overflow-visible">
        <v-icon color="white" small style="transform: rotate(-45deg)"
          >mdi-storefront
        </v-icon>
      </span>
      <v-row no-gutters>
        <v-col class="pl-2 d-flex align-center justify-center" cols="3">
          <v-img
            :src="
              item?.user?.image
                ? item?.user?.image
                : require('@/assets/img/default.jpg')
            "
            class="custom-rounded expand-width"
          >
          </v-img>
        </v-col>
        <v-col
          :style="screen == 320 ? 'line-height: 15px' : 'line-height: 20px'"
          class="pl-2 d-flex align-center"
          cols="7"
        >
          <div class="d-flex flex-column align-start">
            <p
              :class="screen == 320 ? 'sm-text' : 'md-text'"
              class="text-200 seller-title"
            >
              {{
                item?.user?.shop_name
                  ? item?.user?.shop_name
                  : item?.user?.first_name && item?.user?.last_name
                  ? item?.user?.first_name + " " + item?.user?.last_name
                  : "بدون نام"
              }}
            </p>
            <span class="d-flex align-center">
              <v-icon x-small>mdi-map-marker-outline</v-icon>
              <span
                :class="screen == 320 ? 'xs-text' : 'sm-text'"
                class="ont-weight-bold text-200"
              >
                {{
                  item?.user?.shop_address
                    ? item?.user?.shop_address
                    : item?.user?.address
                    ? item?.user?.address
                    : "بدون آدرس"
                }}
              </span>
            </span>
            <div
              :class="screen == 320 ? 'sm-text' : 'md-text'"
              class="d-flex mt-2"
            >
              <span class="d-flex flex-column align-start justify-center">
                <span class="green-text price-text">
                  {{
                    item?.value
                      ? new Intl.NumberFormat().format(item?.value) || "-"
                      : "-"
                  }}
                </span>
                <span class="red-text price-text">
                  {{
                    item?.sell.value
                      ? new Intl.NumberFormat().format(item?.sell.value) || "-"
                      : "-"
                  }}
                </span>
              </span>
              <v-img
                :src="require('@/assets/img/tg.svg')"
                class="mr-1"
                contain
              />
            </div>
          </div>
        </v-col>
        <v-col class="d-flex align-center justify-end pl-2" cols="2">
          <div class="custom-border" dark>
            <v-icon
              class="d-flex justify-center align-center text-200"
              style="transform: rotate(-45deg)"
            >
              mdi-chevron-left
            </v-icon>
          </div>
        </v-col>
      </v-row>
      <div class="card-custom-style custom-rounded">
        <div class="card-custom-style custom-rounded"></div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object,
      },
    },
    computed: {
      screen() {
        return this.$vuetify.breakpoint.width;
      },
    },
  };
</script>
<style>
  .custom-border {
    border: 2px solid rgba(0, 0, 0, 0.54);
    width: 25px;
    height: 25px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    transform: rotate(45deg);
  }

  .seller-custom-icon {
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: var(--goldy-brown);
    border-radius: 5px;
    right: -5px;
    top: -5px;

    transform: rotate(45deg);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-custom-style {
    position: absolute;
    width: 90%;
    height: 100%;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 15%);
    z-index: -1;
    background-color: var(--medium-gray);
    opacity: 0.6;
  }

  .seller-title {
    color: #8c8c8c;
    font-weight: 500 !important;
  }

  .price-text {
    line-height: 14px;
  }
</style>
