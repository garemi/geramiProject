<template>
  <div>
    <div class="d-flex align-end flex-row position-relative mt-2">
      <v-avatar class="" size="38">
        <img
          :src="item.user?.image ?? require('@/assets/img/default.jpg')"
          alt="John"
        />
        <img />
      </v-avatar>
      <div class="chat-div parent-bg position-relative rounded-xl mr-4">
        <div class="d-flex justify-space-between align-center ma-2">
          <div class="d-flex align-center">
            <v-icon
              v-if="isChild && withReply"
              small
              class="ml-2 mb-1"
              color="black"
            >
              mdi-arrow-left-bottom
            </v-icon>
            <h5 class="right-text caption-regular light-secondary-text">
              {{
                item?.user?.shop_name ||
                (item?.user?.first_name && item?.user?.last_name)
                  ? item?.user?.first_name + " " + item?.user?.last_name
                  : "کاربر گرمی"
              }}
            </h5>
          </div>

          <div class="d-flex align-center">
            <span v-if="item?.price" class="md-text mx-2">
              {{ new Intl.NumberFormat().format(item?.price) || "-" }}
              <small>ت</small>
            </span>
            <div
              class="rounded-xl d-flex justify-space-between align-center brown-bg white--text py-1 px-2"
            >
              <span class="md-text ml-1">{{ item?.rate }}</span>
              <v-icon color="white" small> mdi-star </v-icon>
            </div>
          </div>
        </div>
        <div class="">
          <p class="text-right ma-2 mr-3 text-justify">
            <span
              v-if="isChild"
              class="light-brown rounded-lg white--text ml-1 fit-content-size"
            >
              <span class="md-text mx-1">
                {{ parentName }}
              </span>
            </span>
            {{ item?.content }}
          </p>
        </div>
        <div class="d-flex justify-space-between align-center mx-3 mb-2">
          <span class="caption-thin mt-1 gray-text">
            {{ item?.created_at | moment("dddd  HH:mm") }}
          </span>
          <div
            v-if="withReply"
            class="flex flex-col items-center !grow-0 w-fit"
          >
            <div
              @click="sheet = true"
              class="border-radius-50 pa-1 d-flex justify-center"
            >
              <v-icon color="black" small>mdi-arrow-left-bottom</v-icon>
            </div>
            <div class="text-[10px]"> پاسخ </div>
          </div>
        </div>
      </div>
    </div>
    <v-bottom-sheet v-model="sheet" scrollable>
      <v-card class="text-center ma-2 rounded-xl pa-4">
        <v-card-text class="px-3">
          <v-row class="" no-gutters>
            <v-col cols="12" class="d-flex justify-space-between align-center">
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
  </div>
</template>

<script>
  export default {
    props: {
      parentName: {
        type: String,
        require: true,
      },
      item: {
        type: Object,
        required: true,
      },
      isChild: {
        type: Boolean,
        default: false,
      },
      withReply: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        sheet: false,
        rating: 5,
        model: {
          view: "",
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
                comment_id: this.item.id,
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
  .border-radius-50 {
    background-color: var(--medium-gray);
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  .parent-bg {
    background-color: #ebeae6;
  }

  .child-bg {
    background-color: #eae6dd;
  }
  .brown-bg {
    background-color: var(--goldy-brown);
  }
  .chat-div {
    width: 100%;
    min-height: 50px;
    z-index: 10;
  }
  .light-brown {
    background-color: var(--light-brown);
  }

  .chat-div::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-left: 20px solid #ebeae6;
    border-bottom: 5px solid transparent;
    position: absolute;
    right: -14px;
    bottom: 15px;
    z-index: 0;
  }
  .fit-content-size {
    height: fit-content;
    width: fit-content;
  }
</style>
