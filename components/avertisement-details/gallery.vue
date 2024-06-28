<template>
  <v-container>
    <avertisement-details-dialog v-model="reportDialog" />
    <v-row>
      <v-col class="pa-0" cols="12">
        <v-skeleton-loader
          v-if="loading"
          :aspect-ratio="1 / 1"
          class="mx-auto"
          height="90%"
          type="image"
          width="90%"
        >
        </v-skeleton-loader>
        <v-img
          v-else
          :aspect-ratio="1 / 1"
          :src="largeImage"
          class="mx-auto custom-rounded position-relative"
          contain
          height="100%"
          width="100%"
        >
          <div class="d-flex flex-column expand-height gradien-position">
            <div class="d-flex justify-space-between">
              <div class="d-flex">
                <v-rating
                  v-model="rating"
                  color="orange"
                  length="1"
                  readonly
                  size="large"
                >
                </v-rating>
                <div class="d-flex align-center">
                  <span class="header-500 black--text">
                    {{ productArray?.rate }}
                  </span>
                  <span class="black--text md-text">از</span>
                  <span class="black--text md-text">5</span>
                </div>
              </div>
              <div class="d-flex align-center">
                <!-- <v-icon color="black" v-if="1">mdi-bookmark</v-icon>
                <v-icon color="black" v-else>mdi-bookmark-outline</v-icon> -->
                <v-progress-circular
                  v-if="loadingSave"
                  class="mx-2"
                  color="var(--primary)"
                  indeterminate
                  size="26"
                />
                <v-icon v-else color="black" fab size="26" @click="bookmark()">
                  {{ is_bookmarked ? "mdi-bookmark" : "mdi-bookmark-outline" }}
                </v-icon>
                <v-icon color="black" @click="openReportDial">
                  mdi-dots-vertical
                </v-icon>
              </div>
            </div>

            <div
              class="d-flex flex-column align-end mx-2 justify-space-between flex-1 my-3"
            >
              <avertisement-details-allowed-transaction-time />
              <div class="d-flex flex-column align-center">
                <v-avatar size="50">
                  <v-img
                    :src="productArray?.createby?.avatar?.url"
                    alt="پروفایل "
                    class="mx-auto"
                  >
                  </v-img>
                </v-avatar>
                <h6 class="sm-text nescafe-color mx-auto">
                  {{ productArray?.createby?.full_name }}
                </h6>
              </div>
            </div>
          </div>
        </v-img>
      </v-col>
      <v-col class="px-0 mx-0" cols="12">
        <v-row v-if="loading" class="px-0 mx-0">
          <v-col
            v-for="(item, i) in 3"
            :key="i"
            class="d-flex justify-center align-center pa-0"
            cols="4"
          >
            <v-skeleton-loader
              v-if="loading"
              :aspect-ratio="1 / 1"
              class="mx-auto"
              height="50%"
              type="image"
              width="90%"
            >
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-col v-else class="px-0 mx-0 d-flex overflow-x-auto" cols="12">
          <div
            v-for="(item, i) in combinedGallery"
            :key="i"
            class="d-flex justify-center align-center"
          >
            <v-img
              :src="item?.url"
              :style="{
                'border-color': item?.url === largeImage ? 'orange' : 'gray',
              }"
              class="ma-2 pa-2 cursor-pointer custom-rounded"
              cover
              height="70px"
              width="70px"
              @click="showLargeImage(item?.url)"
            >
            </v-img>
          </div>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import services from "@/services";

  export default {
    props: {
      galleryArray: {
        type: [Array, Object],
        required: true,
      },

      loading: {
        type: Boolean,
        default: false,
      },

      largeImage: {
        type: String,
        require: true,
      },

      productArray: {
        type: [Array, Object],
        required: true,
      },
      targetTime: {
        type: String,
        require: true,
      },
      is_bookmarked: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        rating: 3,
        absolute: true,
        overlayTop: false,
        overlayBottom: false,
        selectedImageIndex: null,
        reportDialog: false,
        loadingSave: false,
      };
    },
    created() {},

    computed: {
      combinedGallery() {
        if (this.productArray.image) {
          let additionalImages = [];
          additionalImages.push(this.productArray.image);

          if (this.galleryArray) {
            const variationImages = this.galleryArray.map(
              (variation) => variation,
            );

            additionalImages.push(...variationImages);
          }
          return [...additionalImages];
        }
        return [];
      },
    },
    methods: {
      showLargeImage(imageSrc) {
        this.largeImage = imageSrc;
      },
      openReportDial() {
        this.reportDialog = true;
      },
      bookmark() {
        if (this.is_bookmarked) {
          this.loadingSave = true;
          services.bookmark
            .destroy(null, {
              model_type: "Property",
              model_id: this.$route.params.id,
            })
            .then((response) => {
              this.loadingSave = false;
              this.is_bookmarked = false;
            })
            .catch((error) => {
              getErrorText(error);
              this.loadingSave = false;
            });
        } else {
          this.loadingSave = true;
          services.bookmark
            .create({
              model_type: "Property",
              model_id: this.$route.params.id,
            })
            .then((response) => {
              this.loadingSave = false;
              this.is_bookmarked = true;
              this.$toast.success("باموفقیت انجام شد.");
              console.log("bookMark", this.bookmarkShow);
              console.log("is bookmark", this.is_bookmarked);
            })
            .catch((error) => {
              this.loadingSave = false;
              this.$toast.error(getErrorText(error));
            });
        }
      },
      openDialog() {
        this.$emit("openDialog");
      },
    },
  };
</script>

<style scoped>
  .border-style {
    border: 1px dashed gray;
    border-radius: 20%;
  }

  .gradien-position {
    background-image: linear-gradient(to top, black, transparent 50%);
    position: absolute;
    bottom: 0;
    width: 100%;
  }
</style>