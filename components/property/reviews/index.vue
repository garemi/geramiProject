<template>
  <div>
    <v-row no-gutters class="mx-3 my-6">
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h3 class="black--text">نقد و بررسی</h3>
        <div class="d-flex align-center lg-text" @click="sheet = !sheet">
          <div
            class="text-center cursor-pointer diamond-shape d-flex justify-center align-center mx-2"
          >
            <v-icon x-small color="var(--goldy-brown)" class="transform-0">
              mdi-close
            </v-icon>
          </div>
          <h5 class="gold-text">امتیاز و نظر شما</h5>
        </div>
      </v-col>
      <div class="flex items-start gap-2 my-6">
        <img src="/icon.png" class="w-10" />
        <div class="p-4 pt-2 !rounded-3xl" style="background-color: white">
          <div class="flex justify-between items-center">
            <div> گِرَمی </div>
            <div class="text-xs">
              {{
                new Date().toLocaleDateString("fa-Ir", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              }}
            </div>
          </div>
          <div class="text-sm mt-2">
            نظر شما باعث انتخاب بهتر بین کاربران میشود و ما آن را به اشتراک
            میگزاریم
          </div>
        </div>
      </div>
      <v-col v-for="(item, i) in reviews" :key="i" cols="12">
        <property-reviews-item :item="item" />
        <v-col v-if="item?.replies?.length" cols="12">
          <div v-for="(child, i) in item.replies" :key="i" class="mr-6">
            <property-reviews-item
              :item="child"
              :parentName="
                item?.user?.shop_name ||
                (item?.user?.first_name && item?.user?.last_name)
                  ? item?.user?.first_name + ' ' + item?.user?.last_name
                  : 'کاربر گرمی'
              "
              isChild="true"
              :withReply="false"
              @updateComment="$emit('updateComment')"
            />
            <!-- <v-col v-if="child?.children" cols="12">
              <div
                v-for="(children, i) in children.children"
                :key="i"
                class="mr-6"
              >
                <property-reviews-item
                  :item="children"
                  :parentName="
                    child?.user?.shop_name ||
                    item?.user?.first_name + ' ' + item?.user?.last_name
                  "
                  isChild="true"
                />
              </div>
            </v-col> -->
          </div>
        </v-col>
      </v-col>
      <v-col cols="12">
        <v-bottom-sheet v-model="sheet" scrollable>
          <v-card class="text-center ma-2 rounded-xl pa-4">
            <v-card-text class="px-3">
              <v-row class="" no-gutters>
                <v-col
                  cols="12"
                  class="d-flex justify-space-between align-center"
                >
                  <h4 class="black--text text-right">نظر جدید</h4>
                  <div class="rounded-lg div-style d-flex justify-center">
                    <v-icon @click="sheet = !sheet" color="black" small>
                      mdi-close
                    </v-icon>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-space-between align-center rate-style mt-4"
                >
                  <h5 class="black--text text-right">امتیاز شما به محصول</h5>
                  <div class="d-flex align-center">
                    <span class="gold-text font-weight-bold">
                      <small>5</small> / {{ rating }}</span
                    >
                    <v-rating
                      v-model="rating"
                      background-color="var(--goldy-brown)"
                      color="var(--goldy-brown)"
                      medium
                      class="mr-2"
                    >
                    </v-rating>
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-form ref="form">
                    <v-form-base
                      :model="model"
                      :schema="schema"
                      :col="{ cols: 12 }"
                    >
                    </v-form-base>
                  </v-form>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    :loading="loadingSubmit"
                    @click="submit"
                    elevation="0"
                    block
                    rounded
                    color="var(--text-700)"
                    class="white--text mb-0 py-5 my-2"
                  >
                    ثبت نظر
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </v-col>
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
      reviews: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        loadingSubmit: false,
        loading: false,
        page: 1,
        lastPage: 1,
        isChild: true,
        sheet: false,
        rating: 5,
        model: {
          view: "",
        },
        schema: {
          view: {
            type: "form-text-area",
            placeholder:
              "لطفا نظر خود را درباره این آگهی با ما به اشتراک بگذارید.",
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
      async submit() {
        if (this.model.view.length < 150) {
          if (this.$refs.form.validate) {
            if (!this.rating) {
              return;
            }
            if (this.loadingSubmit == false) this.loadingSubmit = true;

            await this.$axios.$post(
              `/posts/${this.$route.params.id}/comments`,
              {
                content: this.model.view,
                rate: this.rating,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              },
            );
            this.sheet = false;
            this.$emit("updateComment");
            this.loadingSubmit = false;
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
