<template>
  <span class="d-flex">
    <image-cropper
      v-model="showDialog"
      :src="tempImg"
      :loading="loading"
      @update:src="tempImg = $event"
      @onFinish="uploadImage($event)"
    />
    <div
      v-if="editable"
      class="ma-auto cursor-pointer relative"
      :class="classProp"
    >
      <!-- <v-badge avatar overlap bottom offset-x="28" offset-y="28"> -->
      <v-avatar size="110" class="avatar-wrapper">
        <v-progress-circular
          v-if="loading"
          class="circle-position"
          indeterminate
          color="var(--primary)"
        ></v-progress-circular>
        <v-img v-else class="img-position" :src="image" :alt="alt" />
      </v-avatar>
      <!-- </v-badge> -->
      <v-file-input
        ref="filePicker"
        v-show="false"
        @change="onChange"
        accept="image/*"
      />
    </div>
    <div class="ma-auto" :class="classProp" v-else>
      <v-avatar size="100">
        <v-img :src="avatar" :alt="alt" />
      </v-avatar>
      <b class="mr-4">{{ name }}</b>
    </div>
  </span>
</template>

<script>
  import services from "@/services";

  const initImage = require("@/assets/img/default.jpg");

  export default {
    data() {
      return {
        loading: false,
        image: this.value || initImage,
        tempImg: "",
        showDialog: false,
      };
    },
    props: {
      value: {
        // v-model instance
        required: true,
      },
      alt: {
        type: String,
        default: "آواتار",
      },
      name: {
        type: String,
        default: "",
      },
      classProp: {
        type: String,
        default: "",
      },
      editable: {
        type: Boolean,
        default: true,
      },
      withCrop: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onClick() {
        this.editable && this.$refs.filePicker.$refs.input.click();
      },
      onChange(img) {
        if (!img) return;

        if (this.withCrop) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageURL = e.target.result;
            this.tempImg = imageURL;
            this.showDialog = true;
          };
          reader.readAsDataURL(img);
        } else this.uploadImage(img);
      },
      uploadImage(img) {
        this.loading = true;
        services.media
          .upload(img)
          .then((response) => {
            this.avatar = response.data.id;
            this.image = response.data.url;
            this.loading = false;
            this.showDialog = false;
          })
          .catch((error) => {
            this.loading = false;
            if (
              error?.response?.data?.message
                ?.toLowerCase()
                ?.includes("duplicate")
            )
              this.$toast.error(
                "اسلاگ تکراری است. لطفا در نامگذاری مقاله دقت کنید. اسلاگ همان نام پست میباشد.",
              );
            else this.$toast.error("مشکلی پیش آمده است. لطفا دوباره سعی کنید");
          });
      },
    },
    watch: {
      avatar() {
        if (typeof this.avatar == "string" && this.image == initImage)
          this.image = this.avatar;
      },
    },
    computed: {
      avatar: {
        get() {
          if (this.value == null) return require("@/assets/img/default.jpg");
          else if (typeof this.value == "object") {
            return URL.createObjectURL(this.value);
          }
          return this.value;
        },
        set(img) {
          this.$emit("input", img);
        },
      },
    },
  };
</script>

<style scoped>
  .circle-position {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .img-position {
    position: relative;
    /* transition: opacity 0.3s ease-in-out; */
  }
  /* .avatar-wrapper {
    position: relative;
  } */
</style>
