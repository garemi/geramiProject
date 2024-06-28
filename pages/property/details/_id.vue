<template>
  <div class="position-relative max-width pb-16">
    <property-trade-dialog v-model="showTrade" :user="post.data.user.id" />
    <div v-if="loading">
      <property-loader />
    </div>
    <div v-else class="background-gray">
      <!-- section 1 swiper -->
      <div class="white-bg rounded-b-lg pb-2">
        <property-full-width-swiper
          :loading="loading"
          :rate="post?.data?.rate"
          :setAllImg="this.post.data.images"
          :targetTime="post?.data?.deadline_until"
          :total="post?.data?.comments_count"
          :user="post.data.user.id"
          :data="post"
        />
        <div
          class="d-flex justify-space-between align-center ma-4 position-relative max-w-full"
        >
          <div class="d-flex">
            <v-img
              :src="post?.data?.user?.image"
              aspect-ratio="1 /1"
              class="rounded-2xl position-relative"
              height="60px"
              width="60px"
            >
            </v-img>

            <div class="position-absolute-style brown-bg rounded-xl px-1">
              <span class="white--text sm-text">
                {{ post?.data?.user?.rate }}
              </span>
              <v-icon color="white" x-small>mdi-star</v-icon>
            </div>
            <div
              class="flex justify-space-between align-center max-w-48 w-48 overflow-hidden"
            >
              <div class="mx-1 w-full">
                <p class="font-weight-500 mr-1 lg-text">{{
                  post?.data?.user?.shop_name ||
                  (post?.data?.user?.first_name && post?.data?.user?.last_name)
                    ? `${post?.data?.user?.first_name} ${post?.data?.user?.last_name}`
                    : "کاربر گرمی"
                }}</p>
                <div
                  class="flex items-center w-full"
                  v-if="
                    post?.data?.user?.shop_address || post?.data?.user?.address
                  "
                >
                  <v-icon color="black" size="20">
                    mdi-map-marker-outline
                  </v-icon>
                  <span
                    v-if="
                      post?.data?.user?.shop_address ||
                      post?.data?.user?.address
                    "
                    class="sm-text !truncate"
                  >
                    {{
                      post?.data?.user?.shop_address ||
                      post?.data?.user?.address
                    }}
                    ،
                  </span>
                  <span v-if="post?.data?.user?.shop_country" class="sm-text">
                    منطقه

                    {{ post?.data?.user?.shop_country }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex max-w-fit"
            @click="$router.push(`/profile/${post?.data?.user?.id}/properties`)"
          >
            <v-icon color="var(--gray)"> mdi-account-circle-outline</v-icon>
            <span class="gray-text"> جزئیات </span>
            <v-icon color="var(--gray)">mdi-chevron-left</v-icon>
          </div>
        </div>
      </div>

      <div class="px-2 mt-4">
        <!-- section 2 attributes -->
        <div class="!flex items-center justify-between">
          <div
            class="mx-2 flex items-center gap-1 text-[10px] border border-[#908D85] !grow-0 w-fit p-2 rounded-full"
          >
            <span>
              {{
                post?.data?.category?.parent_category === "gold" ? "طلا" : "سکه"
              }}
            </span>
            <v-icon color="var(--gray)" size="x-small">mdi-chevron-left</v-icon>
            <span>
              {{ post?.data?.category?.title }}
            </span>
          </div>
          <div class="d-flex">
            <div
              class="light-gray-bg rounded-xl text-center px-4 mx-1 my-auto py-1"
            >
              <span class="md-text font-weight-bold">
                {{ post?.data?.value }}
                {{
                  post?.data?.category?.parent_category === "gold" ? "گرم" : ""
                }}
              </span>
            </div>
            <div>
              <div
                :style="{ 'background-color': post?.data?.color_hex }"
                class="rounded-xl pa-1 px-2"
              >
                <span class="md-text">{{ post?.data?.color_title }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex align-center justify-space-between mx-2 my-5">
          <p class="xl-text font-weight-500">{{ post?.data?.title }}</p>
        </div>

        <!-- section 3 -->
        <div
          class="white-bg rounded-xl ma-2 d-flex align-center !justify-center px-3 position-relative"
          @click="
            post?.data?.is_getting_offers &&
            post?.data?.category?.parent_category === 'gold'
              ? $router.push(
                  `/panel/offered-price?property=${$route.params.id}`,
                )
              : ''
          "
        >
          <div
            v-if="post?.data?.is_getting_offers || post?.data?.suggested_price"
            class="mx-auto mt-1 py-3 text-right"
          >
            <div class="flex gap-1 items-center justify-between">
              <p class="md-text font-weight-500 gray-text">پیشنهاد قیمت</p>
              <div
                v-if="
                  post?.data?.category?.parent_category !== 'coin' &&
                  post?.data?.is_getting_offers
                "
                class="text-center cursor-pointer diamond-shape !w-4 !h-4 d-flex justify-center align-center mx-2 opacity-60"
              >
                <v-icon
                  x-small
                  color="var(--goldy-brown)"
                  class="transform-0 w-3 h-3"
                >
                  mdi-close
                </v-icon>
              </div>
            </div>
            <p
              v-if="post?.data?.category?.parent_category === 'coin'"
              class="font-weight-bold"
            >
              {{
                new Intl.NumberFormat().format(
                  post?.data?.suggested_price || post?.data?.price,
                )
              }}
              <small class="font-weight-500 md-text">تومان</small>
            </p>
            <p v-else class="font-weight-bold">
              {{
                new Intl.NumberFormat().format(
                  parseInt(
                    onlinePrices.filter((el) => el.title === "Geram18")[0]
                      .value,
                  ) * post?.data?.value,
                )
              }}
              <small class="font-weight-500 md-text">تومان</small>
            </p>
          </div>
          <!-- <v-spacer v-if="post?.data?.is_getting_offers" /> -->
          <v-divider
            v-if="post?.data?.is_getting_offers"
            class="divider-style absolute-clickable z-10"
            vertical
          ></v-divider>
          <!-- <v-spacer /> -->
          <div class="mx-auto mt-1 text-left !py-3">
            <p class="md-text font-weight-500 gray-text">نرخ آنلاین</p>
            <p
              v-if="post?.data?.primitive_online_value"
              class="font-weight-bold"
            >
              {{
                new Intl.NumberFormat().format(
                  post?.data?.primitive_online_value * post?.data?.value,
                )
              }}
              <small class="font-weight-500 md-text">تومان</small>
            </p>
            <p v-else class="font-weight-bold">
              {{ new Intl.NumberFormat().format(post?.data?.price) }}
              <small class="font-weight-500 md-text">تومان</small>
            </p>
          </div>
          <!-- <div class="border-doted">

      </div> -->
        </div>

        <!-- section 4 -->
        <div class="mx-2 my-6">
          <p
            class="text-justify text-14"
            v-html="post?.data?.description || 'بدون توضیحات'"
          ></p>
          <div
            v-if="showToggleButton"
            class="label-s font-weight-bold primary-text mt-2"
            @click="toggleDescription()"
          >
            {{ isCollapsed ? "بیشتر..." : "کمتر..." }}
          </div>
        </div>

        <!-- section 4 (reviews) -->
        <property-reviews
          @updateComment="updateComment"
          :reviews="reviews.data"
        />

        <!-- section 5 (Suggested products) -->
        <viana-swiper
          :data="suggestions?.data"
          :loop="false"
          :sizes="[2, 2, 2, 2, 2, 2]"
          :spaceBetween="10"
          class="mx-2 px-5 mt-8"
          dark
          fixSize
          fixSpace
        >
          <template #default="{ props }">
            <property-suggested :item="props.item" />
          </template>
        </viana-swiper>

        <!-- section 6 -->
        <div class="d-flex justify-space-between align-center absolute-buttons">
          <v-btn
            class="rounded-pill rounded-br-0 mr-6"
            color="var(--text-700)"
            elevation="0"
            dark
            x-large
            :loading="chatLoading"
            @click="createChat"
          >
            <v-icon color="white" small>mdi-message-text</v-icon>
            <span class="md-text white--text">چت با فروشنده</span>
          </v-btn>
          <v-btn
            v-if="post?.data?.is_exchanging"
            class="rounded-pill rounded-l-0"
            color="var(--light-goldy-brown)"
            elevation="0"
            x-large
            @click="showTrade = true"
          >
            <div class="rounded-circle size-div d-flex justify-center mx-1">
              <v-icon color="white" small>mdi-cached</v-icon>
            </div>
            <span class="md-text white--text">مبادله کالا</span>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { showError } from "@/constants/messages";
  import services from "@/services";
  import { computed } from "vue";
  import { getStatusById } from "@/constants/statuses";

  export default {
    layout: "empty",
    provide() {
      return {
        targetTime: computed(() => this.targetDate),
      };
    },
    data() {
      return {
        showToggleButton: true,
        isCollapsed: true,
        loading: false,
        products: [],
        dialogShow: false,
        loadingReview: false,
        largeImage: "",
        gallery: [],
        targetDate: "",
        is_bookmarked: "",
        chatLoading: false,
        rate: "",
        displayedText: "",
        total: "",
        showTrade: false,
      };
    },

    async asyncData({ $axios, route }) {
      const post = await $axios.$get(`/posts/${route.params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const reviews = await $axios.$get(`/posts/${route.params.id}/comments`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const onlinePrices = await $axios.$get("/online-prices");
      const suggestions = await $axios.$get(
        `/posts/suggestions?category=${post?.data?.category?.parent_category}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );

      return { post, reviews, onlinePrices, suggestions };
    },

    mounted() {
      // this.getProduct();
      // this.getSuggested();
      // this.getReviews();
      this.collapseText();
    },

    methods: {
      async updateComment() {
        this.reviews = await this.$axios.$get(
          `/posts/${this.$route.params.id}/comments`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );
      },
      getReviews(page) {
        if (!this.loadingReview) this.loadingReview = true;
        services.review
          .get(null, {
            page,
            with: ["createBy", "children.createBy"],
            conditions: {
              parent_id: null,
              status: getStatusById(3),
              model_id: this.$route.params.id,
              model_type: "App\\Models\\Property",
            },
          })
          .then((response) => {
            this.loadingReview = false;
            this.lastPage = response.data.last_page || 1;
            this.total = response.data.total;
          })
          .catch((error) => {
            console.log(error);
            this.loadingReview = false;
          });
      },

      getSuggested() {
        if (!this.loadingSuggested) this.loadingSuggested = true;
        services.property
          .get(null, {
            with: ["createby", "image", "attributes", "county"],
          })
          .then((response) => {
            this.loadingSuggested = false;
            this.suggestions = response.data.data;
          })
          .catch((error) => {
            console.log(error);
            this.loadingSuggested = false;
          });
      },
      getProduct() {
        if (!this.loading) this.loading = true;
        services.property
          .get(this.$route.params.id, {
            with: ["createby", "image", "attributes", "county"],
          })
          .then((response) => {
            this.loading = false;
            this.products = response.data.data[0];
            // this.largeImage = this.products?.image?.url;
            // this.gallery = this.products.gallery?.filter((val) => !!val);
            this.targetDate = this.products.due;
            this.is_bookmarked = this.products.is_bookmarked;
            this.rate = this.products.rate;
            this.displayedText = this.products?.desc;

            this.collapseText();
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
        this.$router.push(`/chat?conversation_id=${this.post.data.user.id}`);

        // try {
        //   if (this.$store.state.userData == null) {
        //     this.$router.push("/login");
        //     throw 602;
        //   }
        //   this.chatLoading = true;
        //   const response = await services.property.createConversation(
        //     this.$route.params.id,
        //   );
        //   this.chatLoading = false;
        //   this.$router.push(`/chat?conversation_id=` + response.data.id);
        // } catch (error) {
        //   showError(error);
        //   this.chatLoading = false;
        // }
      },
      toggleDescription() {
        this.isCollapsed = !this.isCollapsed;
        if (this.isCollapsed) {
          this.collapseText();
        } else {
          this.expandText();
        }
      },

      collapseText() {
        if (
          this.post?.data?.description?.length > 200 ||
          typeof this.post?.data?.description === "undefined"
        ) {
          this.displayedText = this.post?.data?.description?.slice(0, 100);
          this.displayedText = this.displayedText + "...";
        } else {
          this.displayedText = this.post?.data?.description;
          this.showToggleButton = false;
        }
      },

      expandText() {
        this.displayedText = this.products?.desc;
      },
    },

    computed: {
      setAllImg() {
        // return this.post.data.images;
        // if (this.post.images.length > 0 && this.largeImage) {
        //   this.post.images.push(this.largeImage);
        // } else if (this.post.images.length === 0 && this.largeImage) {
        //   return [this.largeImage];
        // } else {
        //   return [];
        // }
      },
      colorAttributes() {
        if (!this.products.attributes) return [];
        const colorAttributes = this.products.attributes.filter(
          (attribute) => attribute.attribute.name === "رنگ",
        );
        return colorAttributes.map((attribute) => {
          return {
            name: attribute.attribute_value?.attribute_value,
            value: attribute.attribute_value?.code,
          };
        });
      },
      weightAttributes() {
        if (!this.products.attributes) return [];
        const weightAttributes = this.products.attributes.filter(
          (attribute) => attribute.attribute.name === "وزن",
        );
        return weightAttributes.map((attribute) => {
          return {
            static_value: attribute?.static_value,
            suffix: attribute?.attribute?.suffix,
          };
        });
      },
    },
  };
</script>

<style scoped>
  .diamond-shape {
    height: 18px;
    text-align: center;
    transform: rotate(45deg);
    width: 18px;
    border: 2px solid var(--goldy-brown);
    border-radius: 5px;
  }

  .gold-text {
    color: var(--goldy-brown);
  }
  .div-style {
    width: 25px;
    height: 25px;
    background-color: var(--medium-gray);
  }
  .brown-bg {
    background-color: var(--goldy-brown);
  }

  .position-absolute-style {
    position: absolute;
    right: -10px;
    top: -10px;
  }

  .pink-text {
    color: #cc9984;
  }

  .border-doted {
    border: 1px;
  }

  .background-gray {
    background-color: #f7f6f2;
  }

  .size-div {
    width: 25px;
    height: 25px;
    background-color: #b1a78c;
  }

  .absolute-clickable {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<style lang="scss">
  .divider-style {
    .v-divider--vertical {
      border: dotted;
    }
  }

  .absolute-buttons {
    position: fixed;
    bottom: 1rem;

    max-width: calc(var(--global-max-width) - 2rem);
    width: 100%;
    z-index: 10;

    right: 50%;
    transform: translate(50%);
  }
</style>
