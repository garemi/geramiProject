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
          <v-row no-gutters class="black--text text-center text-sm-right">
            <v-col md="3" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col lg="6" md="8" sm="6">
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
                <v-col lg="6" md="8" sm="6">
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
                <v-col lg="6" md="8" sm="6">
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
                <v-col lg="6" md="8" sm="6">
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
          </v-row>
        </v-col>
        <v-col cols="12" class="d-flex justify-center flex-column flex-sm-row">
          <v-col md="6" class="d-flex justify-center justify-sm-end">
            <v-skeleton-loader
              type="image"
              width="200"
              height="50"
              class="ml-md-16"
            ></v-skeleton-loader>
          </v-col>
          <v-col md="6" class="d-flex justify-center justify-sm-start">
            <v-skeleton-loader
              type="image"
              width="200"
              height="50"
              class="mr-md-16"
            ></v-skeleton-loader>
          </v-col>
        </v-col>
        <v-col md="8" class="ma-auto text-center red-text">
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
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
          <v-row no-gutters class="black--text text-center text-sm-right">
            <v-col md="3" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col lg="6" md="8" sm="6">
                  <small>کد پیگیری پرداخت </small>
                  <p class="font-weight-bold label-s">
                    {{ item.payment.ref_id }}
                  </p>
                </v-col>
              </v-row>
            </v-col>

            <v-col md="3" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col lg="6" md="8" sm="6">
                  <small>مبلغ پرداخت شده </small>
                  <p class="font-weight-bold label-s">
                    {{ new Intl.NumberFormat().format(item.payment.price) }}
                    <small>تومان</small>
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="3" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col lg="6" md="8" sm="6">
                  <small>تاریخ پرداخت </small>
                  <p class="font-weight-bold label-s">
                    {{ item.payment.updated_at | moment("jYYYY/jMM/jDD") }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="3" sm="6" cols="12" class="lineHeight label-m">
              <v-row justify="center" no-gutters>
                <v-col lg="6" md="8" sm="6">
                  <small>امتیاز کسب شده </small>
                  <p class="font-weight-bold label-s">0 امتیاز</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="d-flex justify-center flex-column flex-sm-row">
          <v-col md="12" class="d-flex justify-center justify-sm-center">
            <v-btn
              class="btn-gradient_forward custom-rounded white--text px-10"
              elevation="0"
              x-large
            >
              دانلود محصول
            </v-btn>
          </v-col>
          <!-- <v-col md="6" class="d-flex justify-center justify-sm-start">
            <v-btn
              class="btn-gradient custom-rounded lightgrey-text"
              elevation="0"
              x-large
            >
              دریافت کد فعال سازی
            </v-btn>
          </v-col> -->
        </v-col>
        <v-col md="8" class="ma-auto text-center red-text">
          <p class="lineHeight label-s">
            {{ item.message }}
          </p>
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
      setTimeout(() => {
        this.loading = false;
      }, 2000);
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
