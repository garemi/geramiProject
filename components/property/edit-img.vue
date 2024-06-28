<template>
  <v-row no-gutters>
    <v-col cols="12">
      <common-sub-header title="انتخاب و ویرایش عکس" dark class="ma-4" />
    </v-col>
    <!-- large image -->
    <v-col cols="12" v-if="largeImage" class="position-relative">
      <cropper :src="largeImage" ref="cropper" class="cropper-container" />
      <div
        class="black-bg rounded-lg position-absolute !right-8 !bottom-2 !w-fit"
      >
        <v-icon color="white" @click="deleteImage" class="pa-2">
          mdi-trash-can-outline
        </v-icon>
      </div>
    </v-col>

    <v-col cols="12" class="d-flex flex-wrap justify-center">
      <div
        v-for="(item, i) in uploadImages"
        :key="i"
        class="black-bg white-border width-height-size ma-2 mb-0 rounded-lg d-flex justify-center align-center"
      >
        <div>
          <v-img
            max-width="70px"
            max-height="90px"
            :src="item.url"
            class="pa-1"
            @click="showLargeImage(item?.url)"
          >
          </v-img>
        </div>
      </div>
      <div
        v-if="loading"
        class="custom-rounded-15 picker-border width-height-size d-flex justify-center align-center mx-auto"
      >
        <v-responsive :aspect-ratio="1 / 1">
          <v-progress-circular
            class="circle-position mx-auto"
            indeterminate
            color="var(--primary)"
          >
          </v-progress-circular>
        </v-responsive>
      </div>
      <div
        v-else-if="!loading && uploadImages.length < 10"
        class="text-100-bg width-height-size rounded-lg mt-2 d-flex justify-center align-center"
      >
        <div
          @click="onClick"
          class="text-center cursor-pointer diamond-shape d-flex justify-center align-center"
        >
          <v-icon color="yellow" class="transform-0">mdi-close</v-icon>
        </div>
        <v-file-input
          ref="filePicker"
          v-show="false"
          @change="onChange"
          accept="image/*"
        />
      </div>
    </v-col>
    <v-col cols="12" class="my-4 d-flex justify-center">
      <div class="d-flex gap-3 justify-center text-100-bg rounded-lg px-5 py-2">
        <v-icon>mdi-shape-square-rounded-plus</v-icon>
        <v-icon @click="rotateImage">mdi-rotate-left</v-icon>
        <v-icon @click="crop"> mdi-crop-rotate </v-icon>
      </div>
    </v-col>
    <v-col cols="12" class="">
      <div class="mx-4">
        <v-btn
          outlined
          :loading="uploadLoading"
          :disabled="uploadImages.length == 0"
          @click="uploadAllImages"
          class="white-border rounded-pill white--text py-5 absolute-btn"
        >
          مرحله بعد
        </v-btn>
      </div>
    </v-col>
    <v-snackbar v-model="sizeError" :timeout="5000" color="red accent-2">
      حجم عکس بیشتر از 5120 است
    </v-snackbar>
  </v-row>
</template>

<script>
  import services from "@/services";
  const initImage = require("@/assets/img/plus.png");
  import { Cropper } from "vue-advanced-cropper";
  import "vue-advanced-cropper/dist/style.css";

  export default {
    components: {
      Cropper,
    },
    layout: "empty",
    props: {
      editable: {
        type: Boolean,
        default: true,
      },
      step: {
        type: Number,
        require: true,
      },
    },
    data() {
      return {
        selectedImages: [],
        loading: false,
        uploadLoading: false,
        sizeError: false,
        largeImage: "",
        uploadImages: [],
        coordinates: {
          width: 0,
          height: 0,
          left: 0,
          top: 0,
        },
      };
    },

    methods: {
      onClick() {
        this.editable && this.$refs.filePicker.$refs.input.click();
      },
      onChange(img) {
        if (!img) return;
        if (img.size / 1024 > 5120) {
          this.sizeError = true;
          this.$refs.filePicker.$refs.input.value = null;
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageURL = e.target.result;
            const imageId = Date.now();
            this.uploadImages.push({ id: imageId, url: imageURL });
            if (!this.largeImage) {
              this.largeImage = imageURL;
            }
          };
          reader.readAsDataURL(img);
          this.$refs.filePicker.$refs.input.value = null;
        }
      },

      showLargeImage(imageSrc) {
        this.largeImage = imageSrc;
      },

      crop() {
        const { coordinates, canvas } = this.$refs.cropper.getResult();
        this.coordinates = coordinates;
        const croppedImage = canvas.toDataURL();
        console.log("cropped image", croppedImage);
        const newImageIndex = this.uploadImages.findIndex(
          (item) => item.url === this.largeImage,
        );
        if (newImageIndex !== -1) {
          this.uploadImages.splice(newImageIndex, 1, { url: croppedImage });
        }
        this.largeImage = croppedImage;
      },
      rotateImage() {
        if (!this.largeImage) return;

        const img = new Image();
        img.src = this.largeImage;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.height;
        canvas.height = img.width;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        const rotatedImage = canvas.toDataURL();
        const largeImageIndex = this.uploadImages.findIndex(
          (item) => item.url === this.largeImage,
        );

        if (largeImageIndex !== -1) {
          const tempUploadImages = [...this.uploadImages];
          tempUploadImages[largeImageIndex] = { url: rotatedImage };
          this.uploadImages = tempUploadImages;
          this.largeImage = rotatedImage;
        }
      },
      dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[arr.length - 1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      },
      uploadAllImages() {
        this.uploadLoading = true;
        const images = this.uploadImages.map((image, i) => {
          const item = this.dataURLtoFile(image?.url, `image${i}.text`);
          return item;
        });
        this.$emit("imagesUploaded", images, 2);
        this.uploadLoading = false;
        // Promise.all(
        //   this.uploadImages.map((image, i) =>
        //     services.media.upload(
        //       this.dataURLtoFile(image?.url, `image${i}.text`),
        //     ),
        //   ),
        // )
        //   .then((response) => {
        //     this.step++;
        //     const images = response
        //       .map((res) => res.data?.id)
        //       .filter((val) => !!val);

        //     this.uploadLoading = false;
        //   })
        //   .catch((error) => {
        //     this.$toast.error(
        //       "مشکلی در آپلود تصاویر بوجود آمده است. لطفا مجدد تلاش کنید",
        //     );
        //     this.uploadLoading = false;
        //   });
      },
      deleteImage() {
        const index = this.uploadImages.findIndex(
          (item) => item.url === this.largeImage,
        );
        if (index !== -1) {
          this.uploadImages.splice(index, 1);
          this.largeImage = "";
        }
      },
    },
  };
</script>

<style scoped>
  .diamond-shape {
    height: 25px;
    text-align: center;
    transform: rotate(45deg);
    width: 25px;
    border: 1px solid rgb(236, 236, 33);
    border-radius: 5px;
  }
  .width-height-size {
    width: 80px;
    height: 100px;
  }

  .black-bg {
    background-color: black;
  }

  .white-border {
    border: 1px solid white;
  }
  .background-gray {
    background-color: #dedcdd;
  }
  .position-absolute {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }

  .cropper-container {
    max-height: 50vh;
    width: 100%;
    height: 100% !important;
  }

  .absolute-btn {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
  }
</style>
