<template>
  <div class="pb-10">
    <h3 class="black--text">همه نظرات</h3>
    <v-row no-gutters class="mx-3 my-3">
      <template v-if="loading">
        <v-col v-for="i in 4" :key="i" cols="12">
          <v-skeleton-loader
            type="list-item-avatar-three-line mt-3"
          ></v-skeleton-loader>
        </v-col>
      </template>
      <template v-else>
        <v-col v-for="(item, i) in reviews.data" :key="i" cols="12">
          <property-reviews-item :item="item" :withReply="withReply" />
          <v-col v-if="item?.children?.length" cols="12">
            <div v-for="(child, i) in item.children" :key="i" class="mr-6">
              <property-reviews-item
                :item="child"
                :parentName="item?.create_by?.full_name"
                isChild="true"
                :withReply="withReply"
              />
              <v-col v-if="child?.children" cols="12">
                <div
                  v-for="(children, i) in child.children"
                  :key="i"
                  class="mr-6"
                >
                  <property-reviews-item
                    :item="children"
                    :parentName="child?.create_by?.full_name"
                    :isChild="true"
                    :withReply="withReply"
                  />
                </div>
              </v-col>
            </div>
          </v-col>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
  import VianaAxios from "@/constants/VianaAxios";
  import services from "@/services";
  import rules from "@/constants/VuetifyRules";
  import { formPostPrepare } from "@/constants/PanelFormHandler";

  export default {
    props: {
      userId: {
        type: String | undefined,
        default: undefined,
      },
      withReply: {
        type: Boolean,
        default: true,
      },
    },
    mounted() {
      this.getReviews();
    },
    data() {
      return {
        loadingSubmit: false,
        loading: false,
        page: 1,
        lastPage: 1,
        isChild: true,
        sheet: false,
        rating: 1,
        reviews: [],
        model: {
          view: "",
        },
        schema: {
          view: {
            type: "form-text-area",
            placeholder: "نظر شما",
            required: true,
            rules: [
              rules.required,
              (v) => (v && v.length <= 150) || "حداکثر 150 کاراکتر مجاز است.",
            ],
          },
        },
      };
    },
    methods: {
      async getReviews() {
        this.loading = true;

        const user = this.$route.params.id
          ? this.$route.params.id
          : this.$store?.state?.userData?.id;

        this.reviews = await this.$axios.$get(`users/${user}/comments`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.loading = false;

        // services.user
        //   .getReviews(this.userId)
        //   .then((response) => {
        //     this.reviews = response.data;
        //     this.loading = false;
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     this.loading = false;
        //   });
      },
      submit() {
        if (this.model.view.length < 150) {
          if (this.$refs.form.validate) {
            if (!this.rating) {
              return;
            }
            if (this.loadingSubmit == false) this.loadingSubmit = true;

            services.review
              .create({
                desc: this.model.view,
                rate: this.rating,
                model_type: "App\\Models\\Property",
                model_id: this.$route.params.id,
              })
              .then((response) => {
                this.loadingSubmit = false;
                this.proposalItems = response.data;
                this.$toast.success("با موفقیت انجام شد.");
                this.dialog = false;
              })
              .catch((error) => {
                this.loadingSubmit = false;
                this.$toast.error(getErrorText(error));
              });
          } else {
            this.$toast.error("حداکثر 150 کاراکتر مجاز است.");
          }
        } else {
          this.$toast.error("لطفاً اطلاعات را به درستی وارد کنید!");
          this.loading = false;
        }
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
</style>

<style lang="scss">
  .divider-style {
    .v-divider--vertical {
      border: dotted;
    }
  }
  .rate-style {
    .v-rating .v-icon {
      padding: 0;
    }
  }
</style>
