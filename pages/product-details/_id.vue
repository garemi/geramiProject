<template>
  <span>
    <avertisement-details-dialog v-model="dialogShow" />
    <v-card
      class="custom-rounded mx-3 mt-4 mb-8 position-relative"
      elevation="0"
    >
      <v-card-text class="pa-2 custom-shadow">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <avertisement-details-gallery
              :largeImage="largeImage"
              :galleryArray="galleryArray"
              :productArray="productArray"
              :is_bookmarked="is_bookmarked"
              :loading="loading"
              :targetTime="targetDate"
              @openDialog="openDialog"
            />
          </v-col>

          <v-col v-if="loading" cols="12" class="d-flex justify-space-between">
            <div class="d-flex flex-column">
              <v-skeleton-loader
                class="mx-auto"
                height="20px"
                width="100px"
                type="image"
              >
              </v-skeleton-loader>
              <v-skeleton-loader
                class="mx-auto mt-2"
                type="chip"
              ></v-skeleton-loader>
            </div>
            <v-skeleton-loader
              class="mx-auto mt-2"
              type="chip"
            ></v-skeleton-loader>
          </v-col>
          <v-col v-else cols="12" class="d-flex justify-space-between">
            <div>
              <h3 class="font-weight-bold black--text">
                {{ productArray.title }}
              </h3>
              <div
                v-for="(item, i) in productArray?.attributes"
                :key="i"
                class="d-flex flex-wrap"
              >
                <v-chip
                  class="ma-2"
                  x-small
                  text-color="var(--nescafe-color)"
                  color="var(--light-orange)"
                >
                  {{ item.attribute_value?.attribute_value }}
                </v-chip>
              </div>
            </div>

            <v-chip class="ma-2" small text-color="white" color="black">
              <v-icon left color="white" size="20">
                mdi-map-marker-outline
              </v-icon>
              {{ productArray.county?.name }}
            </v-chip>
          </v-col>

          <v-col
            cols="12"
            class="custom-shadow rounded-xl mt-2 py-4 d-flex justify-space-around align-center text-center"
          >
            <div v-if="productArray?.has_online_price">
              <h3 class="font-weight-bold black--text"> قیمت آنلاین </h3>
              <v-skeleton-loader
                v-if="loading"
                class="mx-auto mt-2"
                type="text"
              >
              </v-skeleton-loader>
              <div v-else class="d-flex mt-3 align-center justify-center">
                <h3 class="font-weight-bold black--text">
                  {{
                    new Intl.NumberFormat().format(productArray?.online_price)
                  }}
                </h3>
                <small>تومان</small>
              </div>
            </div>
            <div>
              <h3 class="font-weight-bold black--text"> پیشنهاد قیمت </h3>
              <v-skeleton-loader
                v-if="loading"
                class="mx-auto mt-2"
                type="text"
              >
              </v-skeleton-loader>
              <div v-else class="d-flex mt-3 align-center justify-center">
                <h3 class="font-weight-bold black--text">
                  {{ new Intl.NumberFormat().format(productArray.price) }}
                </h3>
                <small class="mx-2">تومان</small>
              </div>
            </div>
          </v-col>

          <v-col cols="12">
            <v-skeleton-loader
              v-if="loading"
              class="mx-auto mt-4"
              type="paragraph"
            >
            </v-skeleton-loader>
            <p
              v-else
              class="text-right black--text mt-4 text-justify"
              v-html="productArray?.desc || 'بدون توضیحات'"
            >
            </p>
          </v-col>
        </v-row>
        <v-row class="space-top position-relative">
          <v-col v-if="productArray.has_allow_exchange" cols="6">
            <v-skeleton-loader
              v-if="loading"
              class="mx-auto d-flex justify-center"
              type="chip"
            >
            </v-skeleton-loader>
            <v-btn
              v-else
              color="var(--green)"
              class="rounded-pill white--text"
              block
              elevation="0"
            >
              مبادله کالا
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-skeleton-loader
              v-if="loading"
              class="mx-auto d-flex justify-center"
              type="chip"
            ></v-skeleton-loader>
            <v-btn
              v-else
              color="var(--sky-blue)"
              class="rounded-pill white--text"
              block
              elevation="0"
              @click="createChat"
              :loading="chatLoading"
            >
              چت با فروشنده
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </span>
</template>

<script>
  import { showError, showMessage } from "@/constants/messages";
  import services from "@/services";
  import { computed } from "vue";
  export default {
    provide() {
      return {
        targetTime: computed(() => this.targetDate),
      };
    },
    data() {
      return {
        loading: false,
        productArray: [],
        dialogShow: false,
        largeImage: require("@/assets/img/jewerly/1.jpg"),

        galleryArray: [
          {
            url: require("@/assets/img/jewerly/2.jpg"),
          },
          {
            url: require("@/assets/img/jewerly/3.jpg"),
          },
          {
            url: require("@/assets/img/jewerly/4.jpg"),
          },
          {
            url: require("@/assets/img/jewerly/5.jpg"),
          },
          {
            url: require("@/assets/img/jewerly/3.jpg"),
          },
          {
            url: require("@/assets/img/jewerly/4.jpg"),
          },
          {
            url: require("@/assets/img/jewerly/5.jpg"),
          },
        ],
        largeImage: "",
        galleryArray: [],
        targetDate: "",
        is_bookmarked: "",
        chatLoading: false,
      };
    },

    mounted() {
      this.getProduct();
    },

    methods: {
      getProduct() {
        if (!this.loading) this.loading = true;
        services.property
          .get(null, {
            with: ["createby", "image", "attributes", "county"],
          })
          .then((response) => {
            this.loading = false;
            this.productArray = response.data.data[1];
            this.largeImage = this.productArray?.image?.url;
            this.galleryArray = this.productArray.gallery;
            this.targetDate = this.productArray.due;
            this.is_bookmarked = this.productArray.is_bookmarked;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      },
      openDialog() {
        this.dialogShow = true;
      },

      async createChat() {
        try {
          if (this.chatLoading) this.chatLoading = true;
          if (this.$store.state.userData == null) {
            this.$router.push("/login");
            throw 602;
          }
          const response = await services.property.createConversation(
            this.$route.params.id,
          );
          this.chatLoading = false;
          this.$router.push(`/chat?conversation_id=` + response.data.id);
        } catch (error) {
          showError(error);
          this.chatLoading = false;
        }
      },
    },
  };
</script>

<style scoped>
  .space-top {
    top: 20px;
  }
</style>
