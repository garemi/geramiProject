<template>
  <span>
    <div class="mx-6 mt-10">
      <image-cropper
        v-model="showDialog"
        :src="tempImg"
        :loading="loading"
        @update:src="tempImg = $event"
        @onFinish="uploadImage($event)"
      />
      <common-sub-header title="اطلاعات حساب کاربری" />
      <h4 class="text-500">
        جهت وارد شدن به پروفایل خود، ابتدا اطلاعات زیر را وارد کنید.
      </h4>
      <div class="avatar-style mx-auto my-7 relative" @click="onClick">
        <span
          v-if="!$store.state.userData?.image && !imageUrl"
          class="text-center"
        >
          <v-icon color="var(--medium-gray)">mdi-plus-circle-outline</v-icon>
          <p class="md-text" style="color: var(--medium-gray)">عکس پروفایل</p>
        </span>
        <span v-else>
          <v-skeleton-loader
            v-if="imgLoading"
            class="rounded-pill"
            height="120px"
            type="image"
            width="120px"
          >
          </v-skeleton-loader>

          <v-img
            v-else
            :src="imageUrl ? imageUrl : $store.state.userData?.image"
            style="
              width: 120px;
              height: 120px;
              border-radius: 50%;
              border: 1px solid var(--gray);
            "
          >
          </v-img>
        </span>
        <v-file-input
          v-show="false"
          ref="filePicker"
          accept="image/*"
          @change="onChange"
        />
        <div class="p-1 rounded-full bg-gray-200 !absolute bottom-0 left-0">
          <v-icon>mdi-folder-image</v-icon>
        </div>
      </div>

      <v-card class="rounded-lg my-4 d-flex flex-column" elevation="0">
        <label class="mt-2 mr-2 md-text text-100" for="first_name"> نام </label>
        <input id="first_name" v-model="first_name" class="pa-1" type="text" />
      </v-card>
      <v-card class="rounded-lg my-4 d-flex flex-column" elevation="0">
        <label class="mt-2 mr-2 md-text text-100" for="last_name">
          نام خانوادگی
        </label>
        <input id="last_name" v-model="last_name" class="pa-1" type="text" />
      </v-card>
      <v-card class="rounded-lg my-4 d-flex flex-column" elevation="0">
        <label class="mt-2 mr-2 md-text text-100" for="phonenumber">
          شماره همراه
        </label>
        <input id="phonenumber" v-model="cellphone" class="pa-1" type="text" />
      </v-card>
    </div>
    <v-row no-gutters>
      <v-col cols="10">
        <v-btn
          class="custom-rounded"
          color="var(--text-700)"
          outlined
          style="
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
          "
          width="85%"
          @click="updateProfile"
        >
          ذخیره
        </v-btn>
      </v-col>
    </v-row>
  </span>
</template>
<script>
  import services from "@/services";
  import { getErrorText } from "@/constants/VianaAxios";

  export default {
    data() {
      return {
        name: this.$store.state.userData?.full_name,
        first_name: this.$store.state.userData?.first_name,
        last_name: this.$store.state.userData?.last_name,
        cellphone: this.$store.state.userData?.cellphone,
        imageUrl: this.$store.state.userData?.image,
        imageId: "",
        image: "",
        imgLoading: false,
        tempImg: "",
        showDialog: false,
        loading: false,
      };
    },
    layout: "users-panel",
    methods: {
      async updateProfile() {
        try {
          let data = new FormData();
          data.append("first_name", this.first_name);
          data.append("last_name", this.last_name);
          data.append("image", this.image);

          await this.$axios.$post("/users/update", data, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          this.$toast.success("اطلاعات با موفقیت تغییر پیدا کرد");

          const res = await this.$axios.$get("/users/dashboard", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });

          this.$store.commit("setUserData", res.data.user);
          this.$router.push("/panel");
        } catch (err) {
          console.log(err);

          this.$toast.error(err);
        }
      },
      onClick() {
        this.$refs.filePicker.$refs.input.click();
      },

      // onChange(img) {
      //   this.imgLoading = true;
      //   this.imageUrl = URL.createObjectURL(img);
      //   this.image = img;
      //   this.imgLoading = false;
      // },
      onChange(img) {
        if (!img) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          const imageURL = e.target.result;
          this.tempImg = imageURL;
          this.showDialog = true;
        };
        reader.readAsDataURL(img);
      },
      uploadImage(img) {
        this.loading = true;
        this.imageUrl = URL.createObjectURL(img);
        this.image = img;
        this.loading = false;
        this.showDialog = false;
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
