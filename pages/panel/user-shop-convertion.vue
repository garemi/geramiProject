<template>
  <span>
    <user-authentication-dialogs-final
      v-model="confirmDialog"
      :image="require('@/assets/img/conertionToShop.jpg')"
      desc="همکاران ما اطلاعات شما را بررسی کرده و نتیجه نهایی را به شما اعلام خواهند کرد"
      title="ثبت مغازه با موفقیت انجام شد."
    />
    <div class="mx-6 mt-10">
      <common-sub-header title="تبدیل پروفایل به مغازه" />
      <v-card
        class="rounded-lg my-4 d-flex flex-column overflow-hidden"
        elevation="0"
      >
        <label class="mt-2 mr-2 md-text text-100" for="username">
          نام مغازه
        </label>
        <input
          id="username"
          v-model="shop_name"
          class="pa-1"
          required
          type="text"
        />
      </v-card>
      <v-card
        class="rounded-lg my-4 d-flex flex-column overflow-hidden"
        elevation="0"
      >
        <label class="mt-2 mr-2 md-text text-100" for="phone">
          شماره تماس
        </label>
        <input id="phone" v-model="phone" class="pa-1" required type="text" />
      </v-card>
      <v-card
        class="custom-rounded pa-0 mb-1 overflow-hidden"
        elevation="0"
        @click="uploadJavaz"
      >
        <v-card-text class="px-4 d-flex justify-space-between align-center">
          <span class="d-flex flex-column align-center">
            <p style="color: var(--medium-gray)">{{
              shop_javaz?.name || "بارگذاری جواز کسب"
            }}</p>
            <p style="color: black">{{ document }}</p>
          </span>
          <span class="custom-upload-btn">
            <v-progress-circular
              v-if="loading"
              color="var(--primary)"
              indeterminate
            />
            <v-img v-else :src="require('@/assets/img/upload.svg')"></v-img>
          </span>
        </v-card-text>
      </v-card>
      <v-file-input
        v-show="false"
        ref="filePicker"
        v-model="shop_javaz"
        accept="image/*"
      />
      <!-- @change="onChange" -->
      <v-card class="rounded-lg my-4 d-flex flex-column" elevation="0">
        <label class="mt-2 mr-2 md-text text-100" for="phonenumber">
          منطقه
        </label>
        <v-autocomplete
          id="phonenumber"
          v-model="shop_state"
          :items="states"
          class="pa-1"
          flat
          hide-details
          item-text="name"
          item-value="name"
          solo
          type="auto-complete"
        />
      </v-card>

      <!-- <v-card
        v-if="shop_state"
        class="rounded-lg my-4 d-flex flex-column"
        elevation="0"
      >
        <label class="mt-2 mr-2 md-text text-100" for="phonenumber">
          شهر
        </label>
        <v-autocomplete
          id="phonenumber"
          v-model="shop_city"
          :items="cities.cities"
          class="pa-1"
          flat
          hide-details
          item-text="name"
          item-value="name"
          solo
          type="auto-complete"
        />
      </v-card> -->

      <v-card
        class="rounded-lg my-4 d-flex flex-column overflow-hidden"
        elevation="0"
      >
        <label class="mt-2 mr-2 md-text text-100" for="phonenumber">
          جزییات آدرس
        </label>
        <input
          id="address"
          v-model="shop_address"
          class="pa-1"
          required
          type="text"
        />
      </v-card>
    </div>
    <v-row no-gutters>
      <v-col cols="10">
        <v-btn
          class="rounded-pill"
          color="var(--text-700)"
          outlined
          style="
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
          "
          type="submit"
          width="85%"
          x-large
          @click="updateProfile"
        >
          <v-progress-circular
            v-if="submitLoading"
            color="var(--primary)"
            indeterminate
          />
          ثبت اطلاعات
        </v-btn>
      </v-col>
    </v-row>
  </span>
</template>
<script>
  import services from "@/services";
  import { getErrorText } from "@/constants/VianaAxios";
  import { showError } from "@/constants/messages";

  export default {
    data() {
      return {
        shop_javaz: "",
        shop_state: "",
        shop_city: "",
        shop_name: "",
        phone: "",
        shop_address: "",
        cities: [],
        counties: [],
        imgLoading: false,
        loading: false,
        confirmDialog: false,
        submitLoading: false,
      };
    },
    layout: "users-panel",

    async asyncData({ $axios }) {
      const states = await $axios.$get(
        "https://iran-locations-api.ir/api/v1/fa/states",
      );
      return { states };
    },

    methods: {
      getCounties() {
        services.county
          .get(null, { noPaginate: true })
          .then((response) => {
            this.counties = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      uploadJavaz() {
        this.$refs.filePicker.$refs.input.click();
      },
      updateProfile() {
        this.submitLoading = true;
        if (
          !this.shop_javaz &&
          !this.shop_state &&
          !this.shop_name &&
          !this.phone &&
          !this.shop_address
        ) {
          showError("اطلاعات را به طور کامل وارد کنید");
          this.submitLoading = false;
          return;
        }
        let data = new FormData();
        data.append("shop_javaz", this.shop_javaz || undefined);
        data.append("shop_state", this.shop_state || undefined);
        if (this.shop_city) {
          data.append("shop_city", this.shop_city);
        }
        data.append("shop_name", this.shop_name || undefined);
        data.append("phone", this.phone || undefined);
        data.append("shop_address", this.shop_address || undefined);

        services.user
          .upgrade(data, null)
          .then((response) => {
            this.$store.commit("setUserData", { ...response.data.data });
            this.confirmDialog = true;
            this.submitLoading = false;
          })
          .catch((error) => {
            this.$toast.error(getErrorText(error));
            this.submitLoading = false;
          });
      },
      onClick() {
        this.loading = true;
        this.$refs.filePicker.$refs.input.click();
      },

      onChange(img) {
        // this.shop_javaz = img;
        // services.media
        //   .upload(img)
        //   .then((response) => {
        //     this.loading = false;
        //     this.imageUrl = response.data.url;
        //     this.shop_javaz = response.data.id;
        //     this.document = response.data.file_name;
        //   })
        //   .catch((error) => {
        //     this.loading = false;
        //     this.$emit("uploadFailed", error);
        //     console.error("آپلود ناموفق بود:", error);
        //   });
      },
    },
    mounted() {
      this.getCounties();
    },

    watch: {
      async shop_state() {
        this.cities = await this.$axios.$get(
          `https://iran-locations-api.ir/api/v1/fa/cities?state=${this.shop_state}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );
      },
    },
  };
</script>

<style>
  .v-btn:not(.v-btn--round).v-size--small {
    min-width: 0;
  }
</style>
<style scoped>
  *:focus {
    outline: none;
  }

  .avatar-style {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 1px solid var(--gray);
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
