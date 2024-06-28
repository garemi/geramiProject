<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    v-model="model"
    max-width="600"
  >
    <v-card>
      <v-card-title>
        <v-btn fab icon small @click="closeDialog()">
          <v-icon> mdi-arrow-right </v-icon>
        </v-btn>
        <h3 class="text-center my-2">برش تصویر</h3>
        <v-spacer />
        <v-btn
          fab
          icon
          small
          :disabled="loading"
          class="ml-2"
          @click="rotateImage"
        >
          <v-icon>mdi-rotate-left</v-icon>
        </v-btn>
        <v-btn fab icon small :disabled="loading" class="ml-2" @click="crop">
          <v-icon> mdi-crop-rotate </v-icon>
        </v-btn>
        <v-btn
          fab
          color="success"
          elevation="0"
          small
          :loading="loading"
          @click="onFinish"
        >
          <v-icon> mdi-check </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <cropper :src="image" ref="cropper" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { Cropper } from "vue-advanced-cropper";
  import "vue-advanced-cropper/dist/style.css";
  import { autoModel } from "@/mixins/auto-model";

  export default {
    mixins: [autoModel],
    components: {
      Cropper,
    },
    props: {
      src: {
        type: String,
        required: true,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      image: {
        get() {
          return this.src;
        },
        set(v) {
          this.$emit("update:src", v);
        },
      },
    },
    methods: {
      crop() {
        const { coordinates, canvas } = this.$refs.cropper.getResult();
        this.coordinates = coordinates;
        const croppedImage = canvas.toDataURL();
        this.image = croppedImage;

        return croppedImage;
      },
      rotateImage() {
        if (!this.image) return;

        const img = new Image();
        img.src = this.image;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.height;
        canvas.height = img.width;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        const rotatedImage = canvas.toDataURL();

        this.image = rotatedImage;
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
      onFinish() {
        const croppedImage = this.crop();
        this.$emit("onFinish", this.dataURLtoFile(croppedImage, "temp.text"));
      },
      closeDialog() {
        this.image = "";
        this.model = false;
      },
    },
  };
</script>

<style></style>
