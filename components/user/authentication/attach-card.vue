<template>
  <span>
    <v-card
      v-if="!noDocument"
      class="custom-rounded pa-0 mb-1"
      elevation="0"
      @click="onClick"
    >
      <v-card-text class="px-4 d-flex justify-space-between align-center">
        <span class="d-flex flex-column align-center">
          <p style="color: var(--medium-gray)">بارگذاری کارت شناسایی ملی</p>
          <p style="color: black">{{ document?.file_name }}</p>
        </span>
        <span class="custom-upload-btn">
          <v-icon color="var(--medium-gray)" style="transform: rotate(-45deg)"
            >mdi-upload</v-icon
          >
        </span>
      </v-card-text>
    </v-card>
    <v-file-input
      ref="filePicker"
      v-show="false"
      @change="onChange"
      accept="image/*"
    />
    <div>
      <v-img
        :src="document?.url"
        width="100%"
        max-height="150px"
        contain
      ></v-img>
    </div>
  </span>
</template>
<script>
  import { rules } from "@/constants/VuetifyRules.js";
  import services from "@/services";
  import { formPostPrepare } from "@/constants/PanelFormHandler";
  import { showError } from "@/constants/messages";
  export default {
    data() {
      return {
        selectedImg: [],
        document: "",
        noDocument: false,
      };
    },
    methods: {
      onClick() {
        if (this.radioGroup !== "") {
          this.$refs.filePicker.$refs.input.click();
        } else {
          this.$toast.error("لطفا ابتدا نوع مدرک شناسایی خود را مشخص کنید.");
        }
      },
      onChange(img) {
        console.log(img)
        this.$emit("imageSelected", img);
      },
      handleImg(image) {
        if (image instanceof File) {
          this.selectedImg.push({ url: image, loading: true });
          this.uploadImage(image);
        } else {
          this.selectedImg.push({ url: image, loading: false });
        }
      },
      async uploadImage(image) {
        try {
          if (!this.loading) this.loading = true;
          const response = await services.media.upload(image);
          this.document = response?.data;
          this.$emit("fileId", response?.data?.id);
        } catch (error) {
          this.loading = false;
          showError(error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
</script>
<style scoped>
  .custom-upload-btn {
    width: 25px;
    height: 25px;
    border-radius: 5px;
    border: 2px solid var(--medium-gray);
    transform: rotate(45deg);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
