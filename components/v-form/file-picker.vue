<template>
  <div class="ma-auto cursor-pointer expand-width">
    <div
      @click.prevent.stop="onClick"
      class="avatar-wrapper rounded-xl overflow-hidden position-relative expand-width"
    >
      <v-icon
        @click.prevent.stop="onClick"
        class="absolute-image-icon rounded white z-10 pa-1"
        color="black"
        small
      >
        mdi-pen
      </v-icon>
      <v-progress-circular
        v-if="loading"
        class="circle-position"
        indeterminate
        color="var(--primary)"
      ></v-progress-circular>
      <v-img
        class="img-position"
        :src="image"
        :alt="alt"
        width="100%"
        :aspect-ratio="1 / 1"
      />
    </div>
    <v-file-input
      ref="filePicker"
      v-show="false"
      @change="onChange"
      accept="image/*"
      @click.stop
    />
  </div>
</template>

<script>
  import services from "@/services";

  const initImage = require("@/assets/img/default.jpg");

  export default {
    data() {
      return {
        loading: false,
        image: this.value || initImage,
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
    },
    methods: {
      onClick() {
        this.$refs.filePicker.$refs.input.click();
      },
      onChange(img) {
        if (!img) return;

        this.loading = true;
        this.image = URL.createObjectURL(img);
        this.$emit("selected", img);
        this.loading = false;
        // services.media
        //   .upload(img)
        //   .then((response) => {
        //     this.avatar = response.data.id;
        //     this.image = response.data.url;
        //   })
        //   .catch((error) => {
        //     this.loading = false;
        //     if (
        //       error?.response?.data?.message
        //         ?.toLowerCase()
        //         ?.includes("duplicate")
        //     )
        //       this.$toast.error(
        //         "اسلاگ تکراری است. لطفا در نامگذاری مقاله دقت کنید. اسلاگ همان نام پست میباشد.",
        //       );
        //     else this.$toast.error("مشکلی پیش آمده است. لطفا دوباره سعی کنید");
        //   });
      },
    },
    watch: {
      avatar() {
        if (typeof this.avatar == "string" && this.image == initImage)
          this.image = this.avatar;
        console.log(
          "avatar",
          this.avatar,
          this.image,
          typeof this.avatar == "string",
          this.image == initImage,
        );
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

  .absolute-image-icon {
    position: absolute;
    top: 20px;
    left: 20px;
  }
</style>
