<template>
  <v-container>
    <v-row v-if="loadingProfile">
      <v-col cols="12">
        <div class="position-relative">
          <v-skeleton-loader
            type="image"
            class="border-div mx-auto mt-16"
            style="height: 230px; width: 100%"
          />
          <v-skeleton-loader
            type="image"
            class="position-absolute rounded-circle border-img"
            width="180px"
            height="180px"
          />
        </div>
      </v-col>
      <v-col cols="12" md="4" lg="3" class="mt-16 text-md-left text-center">
        <v-btn
          class="rounded-pill text-center ml-2 btn-follow"
          height="48px"
          elevation="0"
          disabled
        >
          <p class="primary-text text-btn"> دنبال کردن </p>
        </v-btn>

        <v-btn
          class="rounded-pill text-center mt-md-4 mt-0 ml-2 btn-follow"
          height="48px"
          disabled
        >
          <p class="primary-text text-btn"> پیشنهاد همکاری </p>
        </v-btn>
      </v-col>
      <v-col cols="12" md="8" lg="9" class="mt-8 pt-sm-0">
        <v-row>
          <v-col cols="12" md="6" class="d-flex mt-0 mt-md-0">
            <v-skeleton-loader type="text" width="40%" class="mr-5 ml-5 mt-3" />
            <v-rating
              background-color="#B8B08C"
              color="#B8B08C"
              hover
              class="ltr disabled"
              length="5"
              :value="0"
              readonly
              size="25"
              dense
            >
            </v-rating>
          </v-col>
          <v-col cols="12" md="6" class="d-flex">
            <div class="d-flex text-justify">
              <v-skeleton-loader type="text" class="ml-12" />
              <v-skeleton-loader type="text" />
            </div>
          </v-col>
          <v-col cols="12">
            <v-skeleton-loader type="list-item-three-line" class="mx-1" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" lg="4" class="d-flex d-md-block">
            <div class="d-flex">
              <v-icon
                color="#94A4A4"
                style="font-size: 40px"
                class="mr-md-4 mr-0"
              >
                mdi-map-marker-outline
              </v-icon>
              <v-skeleton-loader type="text" width="70%" class="pt-0 pt-md-3" />
            </div>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-skeleton-loader type="text" width="70%" class="pt-0 pt-md-3" />
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-skeleton-loader type="text" width="70%" class="pt-0 pt-md-3" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="mt-2 mb-8 mx-5 d-flex">
              <v-skeleton-loader
                type="chip"
                v-for="i in 8"
                :key="i"
                class="my-2 ml-2"
              />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <div class="position-relative">
          <v-img
            class="border-div mx-auto mt-16"
            style="height: 230px; width: 100%"
            v-if="profile?.cover"
            :src="profile?.cover?.url"
          >
          </v-img>
          <div
            v-if="!profile?.cover"
            class="border-div mx-auto mt-16 gray-bg"
            style="height: 230px; width: 100%"
          >
          </div>

          <v-img
            class="rounded-circle pa-2 border-img position-absolute"
            :src="profile?.avatar?.url || require('@/assets/img/default.jpg')"
            :aspect-ratio="1 / 1"
          >
          </v-img>
        </div>
      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="3"
        class="mt-16 text-md-left text-center"
        v-if="$store.state.userData?.id != (profile?.user_id ?? profile?.id)"
      >
        <v-btn
          v-if="profile?.is_followed"
          @click="follows"
          class="rounded-pill text-center ml-2 btn-follow"
          height="48px"
          elevation="0"
          color="var(--light-gray)"
        >
          <p class="primary-text text-btn"> دنبال میکنید </p>
        </v-btn>
        <v-btn
          v-else
          :loading="loadingFollow"
          @click="following"
          class="rounded-pill text-center ml-2 btn-follow"
          height="48px"
          color="var(--primary)"
        >
          <p class="white--text text-btn">
            {{ follow }}
          </p>
        </v-btn>
        <v-btn
          @click="onClickOffer"
          class="rounded-pill text-center mt-md-4 mt-0 ml-2 btn-follow"
          height="48px"
          color="var(--primary)"
        >
          <p class="white--text text-btn"> پیشنهاد همکاری </p>
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="4"
        lg="3"
        class="mt-16 text-md-left text-center"
        v-else
      >
      </v-col>
      <v-col cols="12" md="8" lg="9" class="mt-8 pt-sm-0">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="d-flex justify-center justify-sm-start"
          >
            <p class="header-s primary-text ml-5 mr-1">
              {{ profile?.full_name }}
            </p>
            <v-rating
              background-color="#B8B08C"
              color="#B8B08C"
              hover
              class="ltr disabled"
              length="5"
              :value="profile?.rate || 0"
              readonly
              size="22"
              dense
            >
            </v-rating>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex justify-sm-end justify-center">
            <div class="d-flex text-justify">
              <p class="primary-text ml-12">
                <span class="header-s ml-1">{{ profile?.done_project }}</span>
                <span class="caption-bold-600">پروژه انجام شده</span>
              </p>
              <p class="primary-text ml-5">
                <span class="header-s ml-1">
                  {{ profile?.follower_count }}
                </span>
                <span class="caption-bold-600">دنبال کننده</span>
              </p>
            </div>
          </v-col>
          <v-col cols="12">
            <p class="text-justify mx-5 mx-sm-1"> {{ profile?.desc || "" }} </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            class="d-flex justify-start d-md-block"
            v-if="profile?.residence?.name"
          >
            <div class="d-flex">
              <v-icon
                color="#94A4A4"
                style="font-size: 38px"
                class="mr-4 mr-sm-0"
              >
                mdi-map-marker-outline
              </v-icon>
              <p class="Dark-cyan-text pt-3 label-s">
                <span>ایران</span>
                <span>/</span>
                <span>{{ profile?.residence?.name || "-" }}</span>
              </p>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            v-if="profile?.user?.last_online_at || profile?.last_online_at"
          >
            <p class="Dark-cyan-text pt-3 label-s mr-5 mr-sm-0">
              آخرین فعالیت :
              {{ lastOnline }}
            </p>
          </v-col>
          <v-col cols="12" sm="4" v-if="profile?.created_at">
            <p class="Dark-cyan-text pt-3 label-s mr-5 mr-sm-0">
              تاریخ عضویت : {{ profile?.created_at | moment("jD jMMMM jYYYY") }}
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="mt-2 mb-8 mx-5 mx-sm-2">
              <v-chip
                v-for="(item, i) in profile?.skills"
                :key="i"
                class="my-2 ml-2"
              >
                <p class="my-2 mx-2 label-s Dark-cyan-text">
                  {{ item?.skill?.title }}
                </p>
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab> نمونه کار</v-tab>
      <v-tab>پروژه ها </v-tab>
      <v-tab> دوره</v-tab>
      <v-tab> پکیج ها</v-tab>
      <v-tab> خدمات</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item :value="0">
        <work-samples
          :items="workSamples"
          :loading="loadingWorkSample"
          class="my-8"
          type="button"
        />
      </v-tab-item>
      <v-tab-item :value="1">
        <panel-my-project-projects :user_id="profile?.user_id ?? profile?.id" />
      </v-tab-item>
      <v-tab-item :value="2">
        <panel-my-project-course
          :user_id="profile?.user_id ?? profile?.id"
          type="1"
        />
      </v-tab-item>
      <v-tab-item :value="3">
        <panel-my-project-course
          :user_id="profile?.user_id ?? profile?.id"
          type="2"
        />
      </v-tab-item>
      <v-tab-item :value="4">
        <panel-my-project-course
          :user_id="profile?.user_id ?? profile?.id"
          type="3"
        />
      </v-tab-item>
    </v-tabs-items>
    <other-profiles :items="reviews" :loading="loadingReview" class="mb-8" />
    <profile-dialog ref="offerToCooperate" />
  </v-container>
</template>

<script>
  import moment from "jalali-moment";
  import services from "@/services";
  export default {
    props: {
      profile: {
        type: Object,
        require: true,
      },
      reviews: {
        type: Array,
        require: true,
      },
      workSamples: {
        type: Array,
        require: true,
      },
      loadingProfile: {
        type: Boolean,
        default: false,
      },
      loadingReview: {
        type: Boolean,
        default: false,
      },
      loadingWorkSample: {
        type: Boolean,
        default: false,
      },
      loadingFollow: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        tab: null,
        follow: "دنبال کردن",
      };
    },
    computed: {
      lastOnline() {
        const currentDate = moment().unix();
        const last_online_at = moment(
          new Date(
            this.profile?.user?.last_online_at ?? this.profile?.last_online_at,
          ),
        ).unix();

        const remaining = currentDate - last_online_at;
        const remainingHour = Math.floor(remaining / 3600);
        const remainingMinutes = Math.floor((remaining % 3600) / 60);

        return `${remainingHour ? remainingHour + " ساعت" : ""} ${
          remainingMinutes ? remainingMinutes + " دقیقه" : ""
        } قبل`;
      },
    },
    methods: {
      following() {
        if (!this.$store.state.userData) {
          this.$toast.error("برای دنبال کردن شخص وارد حساب کاربری خود شوید.");
          return;
        }

        this.loadingFollow = true;
        services.follow
          .create({
            following_id: this.profile?.user_id ?? this.profile?.id,
          })
          .then((response) => {
            this.loadingFollow = false;
            this.profile.is_followed = true;
            this.follow = "دنبال میکنید";
            this.profile.follower_count = +this.profile.follower_count + 1;
            this.$toast.success("با موفقیت دنبال شد.");
          })
          .catch((error) => {
            this.loadingFollow = false;
          });
      },

      follows() {
        this.$toast.warning("قبلا این کاربر را دنبال کردید");
      },

      onClickOffer() {
        if (!this.$store.state.userData) {
          this.$toast.error(
            "برای ارسال پیشنهاد همکاری وارد حساب کاربری خود شوید.",
          );
          return;
        }

        this.$refs.offerToCooperate.show();
      },
    },
  };
</script>

<style scoped>
  .border-div {
    border-radius: 65px;
  }
  .position-absolute {
    position: absolute;
    bottom: -70px;
    right: 75px;
  }
  .border-img {
    border: 5px solid white;
    width: 180px;
  }
  .disabled {
    pointer-events: none;
  }
  .btn-follow {
    width: 70%;
  }
  @media screen and (max-width: 959px) {
    .position-absolute {
      position: absolute;
      right: 50%;
      bottom: -20%;
      transform: translate(50%);
    }
    .btn-follow {
      width: 30%;
    }
  }
  @media screen and (min-width: 959px) and (max-width: 1264px) {
    .header-s {
      font-family: var(--font-family);
      font-size: 1rem;
      font-weight: 500;
    }
    .caption-bold-600 {
      font-family: var(--font-family);
      font-weight: 500;
      font-size: 0.7rem;
    }
  }
  @media screen and (max-width: 396px) {
    .text-btn {
      font-size: 0.7rem;
    }
    .btn-follow {
      width: 50%;
    }
  }
</style>
