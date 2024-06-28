<template>
  <div>
    <template v-if="loading">
      <v-row>
        <v-col cols="12" class="mx-auto">
          <v-skeleton-loader
            type="image"
            max-height="150"
            max-width="150"
            class="rounded-xl"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12">
          <v-col cols="12" class="lineHeight label-m text-center">
            <div>
              <v-skeleton-loader type="text" width="280"></v-skeleton-loader>
            </div>
          </v-col>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-skeleton-loader type="text" width="350px"></v-skeleton-loader>
        </v-col>
        <v-col cols="12">
          <v-row no-gutters class="black--text text-center text-sm-right">
            <v-col md="3" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col cols="8">
                  <v-skeleton-loader
                    type="text"
                    class="mt-2"
                    width="100px"
                  ></v-skeleton-loader>

                  <v-skeleton-loader
                    type="text"
                    class="mt-2"
                    width="100px"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
            </v-col>
            <v-col lg="2" md="3" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col cols="8">
                  <v-skeleton-loader
                    type="text"
                    class="mt-2"
                    width="100px"
                  ></v-skeleton-loader>

                  <v-skeleton-loader
                    type="text"
                    class="mt-2"
                    width="100px"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
            </v-col>
            <v-col lg="2" md="3" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col cols="8">
                  <v-skeleton-loader
                    type="text"
                    class="mt-2"
                    width="100px"
                  ></v-skeleton-loader>

                  <v-skeleton-loader
                    type="text"
                    class="mt-2"
                    width="100px"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="3" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col cols="8">
                  <v-skeleton-loader
                    type="text"
                    class="mt-2"
                    width="100px"
                  ></v-skeleton-loader>

                  <v-skeleton-loader
                    type="text"
                    class="mt-2"
                    width="100px"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              lg="2"
              md="3"
              cols="12"
              class="lineHeight label-m d-flex justify-center ma-auto"
            >
              <div>
                <v-skeleton-loader
                  type="image"
                  width="300"
                  height="50"
                  class="px-15"
                ></v-skeleton-loader>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row>
        <v-col cols="12" class="mx-auto">
          <v-img
            contain
            width="120"
            height="120"
            class="mx-auto"
            :src="require('@/assets/img/default.jpg')"
          ></v-img>
        </v-col>
        <v-col cols="12">
          <v-col cols="12" class="lineHeight label-m text-center">
            <div>
              <small
                >در صورت کسر مبلغ از حساب شما مبلغ تا 72 ساعت بعد توسط بانک
                بازگشت داده میشود
              </small>
            </div>
          </v-col>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <h2 class="black--text header-s font-weight-bold"
            >نرم افزار حقوق و دستمزد ویانا</h2
          >
        </v-col>
        <v-col cols="12">
          <v-row no-gutters class="black--text text-center text-sm-right">
            <v-col md="2" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col cols="8">
                  <small>مبلغ واحد </small>
                  <p class="font-weight-bold label-s"
                    >{{
                      new Intl.NumberFormat().format(
                        item.purchase.product.price,
                      )
                    }}
                    <small>تومان</small></p
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col lg="1" md="2" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col cols="8">
                  <small> تعداد</small>
                  <p class="font-weight-bold label-s">
                    {{ item.purchase.count }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col lg="2" md="" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col cols="8">
                  <small> تخفیف</small>
                  <p class="font-weight-bold label-s"
                    >{{ item.purchase.discount }} <small>تومان</small></p
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col md="2" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col cols="8">
                  <small>مالیات بر ارزش افزوده</small>
                  <p class="font-weight-bold label-s">
                    {{
                      new Intl.NumberFormat().format(
                        (item.purchase.total_price * 9) / 100,
                      )
                    }}
                    <small>تومان</small></p
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col md="3" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col cols="8">
                  <small>مبلغ قابل پرداخت </small>
                  <p class="font-weight-bold label-s"
                    >{{
                      new Intl.NumberFormat().format(item.purchase.total_price)
                    }}
                    <small>تومان</small></p
                  >
                </v-col>
              </v-row>
            </v-col>

            <v-col
              lg="2"
              md="3"
              cols="12"
              class="lineHeight label-m d-flex justify-center ma-auto"
              elevation="0"
            >
              <div>
                <v-btn
                  class="btn-gradient_forward custom-rounded white--text px-16 bigger-button"
                  elevation="0"
                  x-large
                >
                  پرداخت
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      loading: Boolean,
      item: Object,
    },
    mounted() {
      //   setTimeout(() => {
      //     this.loading = false;
      //   }, 2000);
    },
    data() {
      return {};
    },
  };
</script>

<style></style>
<style scoped>
  .lineHeight {
    line-height: 2.2rem;
  }
</style>
