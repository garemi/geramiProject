<template>
  <v-container fluid>
    <!-- <avertisement-details-dialog v-model="reportDialog" /> -->
    <property-report-dialog v-model="reportDialog2" />
    <v-row class="pa-0">
      <v-col class="pa-0 position-relative" cols="12">
        <viana-swiper
          :autoplayEnabled="true"
          :data="setAllImg"
          :loop="false"
          :sizes="[1, 1, 1, 1]"
          class="swiperPage"
          dark
          hasPaginate
        >
          <template #default="{ props }">
            <v-img
              :src="props?.item"
              class="img-size position-relative z-5"
              :aspect-ratio="8 / 10"
            >
            </v-img>
          </template>
          <template #absolute-top>
            <div class="z-10">
              <div class="d-flex justify-space-between ma-2">
                <div
                  class="pa-2 rounded-lg"
                  style="background-color: rgba(0, 0, 0, 0.8)"
                >
                  <v-icon color="white" @click="$router.go(-1)"
                    >mdi-chevron-right
                  </v-icon>
                </div>
                <div class="d-flex">
                  <div
                    class="pa-2 rounded-lg mx-1"
                    style="background-color: rgba(0, 0, 0, 0.8)"
                  >
                    <v-progress-circular
                      v-if="loadingSave"
                      class="mx-2"
                      color="white"
                      indeterminate
                      size="20"
                    />
                    <v-icon
                      v-else
                      color="white"
                      fab
                      size="20"
                      @click="bookmark()"
                    >
                      {{
                        is_bookmarked ? "mdi-bookmark" : "mdi-bookmark-outline"
                      }}
                    </v-icon>
                  </div>
                  <div
                    class="pa-2 rounded-lg relative z-30"
                    style="background-color: rgba(0, 0, 0, 0.8)"
                    @click="reportDialog = true"
                    :style="
                      reportDialog
                        ? 'background-color: white'
                        : 'background-color: rgba(0, 0, 0, 0.8)'
                    "
                  >
                    <v-icon
                      v-if="reportDialog"
                      color="black"
                      @click="reportDialog = false"
                    >
                      mdi-close</v-icon
                    >
                    <v-icon v-else color="white"> mdi-dots-vertical</v-icon>
                    <div
                      v-if="reportDialog"
                      style="background-color: white"
                      class="!rounded-lg absolute left-0 top-12"
                    >
                      <div
                        class="flex items-center gap-2 py-3 pr-4"
                        style="border-bottom: 1px solid rgba(242, 242, 242, 1)"
                        @click="
                          $store.commit('setShareMetaData', { visible: true })
                        "
                      >
                        <v-icon color="rgba(191, 189, 182, 1)"
                          >mdi-share-variant</v-icon
                        >
                        <div class="text-sm whitespace-nowrap"
                          >اشتراک گذاری</div
                        >
                      </div>
                      <div
                        v-if="user === $store.state.userData?.id"
                        style="border-bottom: 1px solid rgba(242, 242, 242, 1)"
                        class="flex items-center gap-2 py-3 pr-4"
                        @click="
                          $router.push(`/property/edit/${$route.params.id}`)
                        "
                      >
                        <v-icon color="rgba(191, 189, 182, 1)"
                          >mdi-pencil</v-icon
                        >
                        <div class="text-sm whitespace-nowrap">ویرایش پست</div>
                      </div>
                      <div
                        v-if="user === $store.state.userData?.id"
                        style="border-bottom: 1px solid rgba(242, 242, 242, 1)"
                        class="flex items-center gap-2 py-3 pr-4"
                        @click="deletePost"
                      >
                        <v-icon color="red">mdi-trash-can-outline</v-icon>
                        <div class="text-sm whitespace-nowrap">حذف پست</div>
                      </div>
                      <div
                        v-if="user === $store.state.userData?.id"
                        :class="
                          data?.data?.is_getting_offers ? '' : 'opacity-[40%]'
                        "
                        style="border-bottom: 1px solid rgba(242, 242, 242, 1)"
                        class="flex items-center gap-2 py-3 pr-4"
                      >
                        <v-icon
                          v-if="data?.data?.is_getting_offers"
                          color="rgba(191, 189, 182, 1)"
                          >mdi-eye-outline</v-icon
                        >
                        <v-icon v-else color="rgba(191, 189, 182, 1)"
                          >mdi-eye-off-outline</v-icon
                        >
                        <div class="text-sm whitespace-nowrap"
                          >پیشنهاد قیمت</div
                        >
                        <div
                          v-if="data?.data?.is_getting_offers"
                          class="rounded-full px-2 text-xs mr-2 ml-4"
                          style="background-color: #e7f4ef; color: #3a8165"
                          >فعال</div
                        >
                        <div
                          v-else
                          class="rounded-full px-2 text-xs mr-2 ml-4"
                          style="background-color: #f3f3f3; color: #bababa"
                          >مخفی</div
                        >
                      </div>
                      <div
                        v-if="user === $store.state.userData?.id"
                        :class="data?.data?.is_using_api ? '' : 'opacity-[40%]'"
                        style="border-bottom: 1px solid rgba(242, 242, 242, 1)"
                        class="flex items-center gap-2 py-3 pr-4"
                      >
                        <v-icon
                          v-if="data?.data?.is_using_api"
                          color="rgba(191, 189, 182, 1)"
                          >mdi-eye-outline</v-icon
                        >
                        <v-icon v-else color="rgba(191, 189, 182, 1)"
                          >mdi-eye-off-outline</v-icon
                        >
                        <div class="text-sm whitespace-nowrap">مظنه آنلاین</div>
                        <div
                          v-if="data?.data?.is_using_api"
                          class="rounded-full px-2 text-xs mr-2 ml-4"
                          style="background-color: #e7f4ef; color: #3a8165"
                          >فعال</div
                        >
                        <div
                          v-else
                          class="rounded-full px-2 text-xs mr-2 ml-4"
                          style="background-color: #f3f3f3; color: #bababa"
                          >مخفی</div
                        >
                      </div>
                      <div
                        v-if="user === $store.state.userData?.id"
                        :class="data?.data?.deadline ? '' : 'opacity-[40%]'"
                        class="flex items-center gap-2 py-3 pr-4"
                      >
                        <v-icon
                          v-if="data?.data?.deadline"
                          color="rgba(191, 189, 182, 1)"
                          >mdi-eye-outline</v-icon
                        >
                        <v-icon v-else color="rgba(191, 189, 182, 1)"
                          >mdi-eye-off-outline</v-icon
                        >
                        <div class="text-sm whitespace-nowrap">مهلت معامله</div>
                        <div
                          v-if="data?.data?.deadline"
                          class="rounded-full px-2 text-xs mr-2 ml-4"
                          style="background-color: #e7f4ef; color: #3a8165"
                          >فعال</div
                        >
                        <div
                          v-else
                          class="rounded-full px-2 text-xs mr-2 ml-4"
                          style="background-color: #f3f3f3; color: #bababa"
                          >مخفی</div
                        >
                      </div>

                      <div
                        class="flex items-center gap-2 py-3 pr-4"
                        @click="reportDialog2 = true"
                        v-if="user !== $store.state.userData?.id"
                      >
                        <v-icon color="rgba(255, 208, 42, 1)"
                          >mdi-alert-outline</v-icon
                        >
                        <div class="text-sm whitespace-nowrap">گزارش محصول</div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="reportDialog"
                    @click="reportDialog = false"
                    class="fixed h-screen w-screen z-20 top-0 left-0"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #absolute-bottom>
            <div class="z-10">
              <div
                class="d-flex justify-space-between mx-3 mb-2 position-absolute-style"
              >
                <div
                  v-if="formattedTargetDate"
                  class="red-bg-gradiant white--text rounded-lg px-2 text-xs"
                >
                  <h6 class="text-center">مهلت معامله</h6>
                  <div class="d-flex justify-center">
                    <div>
                      <h5 class="text-center">
                        {{ remainingTime.seconds }}
                        <h6 class="text-center">ثانیه</h6>
                      </h5>
                    </div>
                    <span class="mx-1">:</span>
                    <div>
                      <h5 class="text-center">
                        {{ remainingTime.minutes }}
                        <h6 class="text-center">دقیقه</h6>
                      </h5>
                    </div>
                    <span class="mx-1">:</span>
                    <div>
                      <h5 class="text-center">
                        {{ remainingTime.hours }}
                        <h6 class="text-center">ساعت</h6>
                      </h5>
                    </div>
                  </div>
                </div>
                <v-spacer v-else></v-spacer>
                <div
                  class="rounded-xl d-flex justify-space-between align-center brown-bg white--text px-1 py-1"
                >
                  <div class="d-flex align-center ml-2">
                    <v-icon color="white" small>mdi-account</v-icon>
                    <p class="md-text mr-2 ml-4">{{ total }}</p>
                  </div>
                  <div class="d-flex align-center rate-color">
                    <p class="md-text mx-2">{{ rate }}</p>
                    <div
                      class="circle-style rounded-circle d-flex justify-center"
                    >
                      <v-icon color="white ma-auto" small>mdi-star</v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </viana-swiper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import services from "@/services";

  export default {
    props: {
      setAllImg: {
        type: Array,
        required: true,
      },
      targetTime: {
        default: null,
      },
      loading: {
        type: Boolean,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      user: {
        type: String,
      },
      data: {
        type: Object,
      },
    },
    data() {
      return {
        loading: false,
        remainingTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        rating: 3,
        absolute: true,
        overlayTop: false,
        is_bookmarked: false,
        overlayBottom: false,
        selectedImageIndex: null,
        reportDialog: false,
        reportDialog2: false,
        loadingSave: false,
      };
    },
    mounted() {
      setInterval(() => {
        this.calculateTime();
      }, 1000);
    },

    methods: {
      async deletePost() {
        const res = await this.$axios.$delete(
          `/posts/${this.$route.params.id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );
        this.$toast.success("پست با موفقیت حذف شد ");

        this.$router.push("/");
      },
      calculateTime() {
        const currentDate = new Date().getTime();

        const timeDifference = +this.formattedTargetDate - +currentDate;

        this.remainingTime.days = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24),
        );
        this.remainingTime.hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        this.remainingTime.minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
        );
        this.remainingTime.seconds = Math.floor(
          (timeDifference % (1000 * 60)) / 1000,
        );
      },
      openReportDial() {
        this.reportDialog = !this.reportDialog;
      },
      async bookmark() {
        this.loadingSave = true;
        const res = await this.$axios.$post(
          `/posts/${this.$route.params.id}/save`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );
        console.log(res);
        if (res.msg === "Post added to saved collection.") {
          this.is_bookmarked = true;
        } else {
          this.is_bookmarked = false;
        }
        this.loadingSave = false;
      },
      openDialog() {
        this.$emit("openDialog");
      },
    },
    watch: {
      targetTime: {
        handler() {
          this.calculateTime();
        },
        immediate: true,
      },
    },

    computed: {
      formattedTargetDate() {
        let due = new Date(this.targetTime);
        if (due > new Date()) return due;
      },
    },
  };
</script>

<style scoped>
  .circle-style {
    background-color: var(--dark-goldy-brown);
    width: 25px;
    height: 25px;
  }

  .img-size {
    width: 100%;
    top: 0;
    object-fit: cover;
  }

  .opacity-bg {
    position: absolute;
    width: 100%;
    height: 20vh;
    bottom: 0;
    background-color: var(--background);
    opacity: 0.7;
    z-index: 999;
  }

  .red-bg-gradiant {
    background-image: linear-gradient(to right, #af3333 70%, #fe4646);
  }

  /* .position-absolute-style {
    position: absolute;
    bottom: 5px;
    width: 95%;
  } */

  .brown-bg {
    background-color: var(--goldy-brown);
  }

  .black-bg {
    background-color: black;
  }
</style>

<style lang="scss">
  .rate-color {
    .v-application .accent--text {
      color: var(--dark-goldy-brown) !important;
      caret-color: var(--dark-goldy-brown) !important;
      padding: 0;
    }
  }
</style>
