<template>
  <v-col cols="12" class="pa-2">
    <div v-if="label" class="grey--text" :class="{ 'error--text': hasError }">
      {{ label }}
      <span class="error--text" v-if="$attrs.required">*</span>
    </div>
    <filePond
      v-model="currentFiles"
      :class="{ 'small-items': multiple }"
      :max-files="maxFiles"
      label-idle="فایل خود را اینجا رها کنید و یا  <span class='filepond--label-action'>انتخاب کنید</span>"
      :accepted-file-types="fileTypes"
      :files="customFiles"
      imagePreviewHeight="200px"
      filePosterHeight="200px"
      :maxFileSize="maxFileSize"
      :imageValidateSizeMaxWidth="imageMaxWidth"
      :imageValidateSizeMaxHeight="imageMaxHeight"
      imageValidateSizeLabelImageSizeTooBig="تصویر بیش از حد بزرگ است."
      :imageValidateSizeLabelExpectedMaxSize="`بیشترین سایز برابر ${imageMaxWidth} × ${imageMaxHeight}`"
      labelInvalidField="فایل نامعتبر"
      labelFileLoading="در حال بارگزاری"
      labelFileLoadError="مشکل در بارگزاری"
      labelFileProcessing="در حال آپلود"
      labelFileProcessingComplete="آپلود موفق"
      labelFileProcessingError="مشکل در آپلود"
      labelTapToCancel="برای لغو آپلود کلیک کنید"
      labelTapToRetry="برای آپلود مجدد کلیک کنید"
      labelTapToUndo="برای حذف کلیک کنید"
      :allowImageValidateSize="allowImageValidateSize"
      :allowMultiple="multiple"
      :beforeRemoveFile="removeFile"
      @processfile="processFile"
      @activatefile="activateFile"
    />
    <!-- keep this and remove it later -->
    <!-- @removefile="removeFile" -->
    <small v-if="errorBucket?.length" class="error--text">
      {{ errorBucket[0] }}
    </small>
  </v-col>
</template>

<script>
  import vueFilePond, { setOptions } from "vue-filepond";
  import "filepond/dist/filepond.min.css";

  import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";
  import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

  import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";

  import FilePondPluginFilePoster from "filepond-plugin-file-poster";
  import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";

  import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";

  import { Constants } from "@/constants/GlobalConstants";

  const VInput = !process.server
    ? require("vuetify/es5/components/VInput").default
    : {};

  const filePond = vueFilePond(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginFilePoster,
    FilePondPluginImageValidateSize,
  );

  export default {
    components: {
      filePond,
    },
    mixins: [VInput],
    data() {
      return {
        currentFiles: [],
        customFiles: [],
        token: localStorage.getItem(Constants.storeKey),
        options: {
          server: {
            url: `${Constants.mainURL_fa}/media/`,
            process: {
              url: "upload",
              method: "POST",
              // withCredentials: false,
              headers: {
                Authorization:
                  "Bearer " +
                  (!!localStorage.getItem(Constants.storeKey)
                    ? JSON.parse(localStorage.getItem(Constants.storeKey))
                        ?.token?.access_token
                    : ""),
              },
              timeout: 500000,
              onload: (res) => {
                const response = JSON.parse(res);
                return response;
              },
            },
            revert: null,
          },
        },
      };
    },
    props: {
      /**
       * is Inherited by mixin
       *  value: {
            // v-model instance
            type: Object | String,
            required: true,
          },
       */
      maxFileSize: {
        type: String,
        default: "5MB",
      },
      maxFiles: {
        type: Number,
        default: 100,
      },
      fileTypes: {
        type: String,
        default: "image/jpeg, image/png, image/svg+xml",
      },
      label: {
        type: String,
        default: null,
      },
      allowImageValidateSize: {
        type: Boolean,
        default: true,
      },
      imageMaxWidth: {
        type: Number,
        default: 65535,
      },
      imageMaxHeight: {
        type: Number,
        default: 65535,
      },
      labelClass: {
        type: String,
        default: "grey--text text-right",
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      pushMedia: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      processFile(_, { serverId }) {
        const newFile = this.pushMedia ? serverId : serverId.id;

        this.media_id = this.multiple
          ? [...(Array.isArray(this.media_id) ? this.media_id : []), newFile]
          : newFile;
      },
      activateFile(val) {
        // TODO: fix the url
        // if (val.serverId) window.open(val.serverId, "_blank");
      },
      removeFile(data) {
        if (this.multiple) {
          const fileIdx = [...this.currentFiles].findIndex(
            (file) => file.id == data.id,
          );

          this.media_id = this.media_id.filter((_, i) => i != fileIdx);
        } else this.media_id = null;

        // TODO: uncomment it later after backend changes
        // VianaAxios.delete("/media/" + this.media_id + "/delete")
        //   .then((response) => {
        //     console.log(response.data);
        //     this.media_id = null;
        //   })
        //   .catch((error) => {
        //     console.log(error?.response || error);
        //   });
      },
      generateCustomFile(val) {
        return {
          source: val.url,
          options: {
            type: "local",
            file: {
              id: val.id,
              name: val.file_name,
              size: val.file_size,
              type: val.file_type,
            },
            metadata: {
              poster: val.url,
            },
          },
        };
      },
    },
    computed: {
      media_id: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        },
      },
    },
    mounted() {
      setOptions(this.options);
      this.errorBucket = [];
      this.hasFocused = false;
      this.hasInput = false;
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          console.log("val file pond", val);
          try {
            if (
              val &&
              ((typeof val == "object" && val.file_name && val.file_type) ||
                (Array.isArray(val) &&
                  val.every(
                    (media) =>
                      typeof media == "object" &&
                      media.file_name &&
                      media.file_type,
                  )))
            ) {
              this.$nextTick(() => {
                this.customFiles = this.multiple
                  ? val.map((media) => this.generateCustomFile(media))
                  : [this.generateCustomFile(val)];
              });
            }
          } catch (error) {
            console.log("ERROR IN WATCH OF FILE POND", error);
          }
        },
      },
    },
  };
</script>

<style lang="scss">
  @import "~vuetify/src/styles/settings/_variables";

  $sub-text-margin: 0.25rem;

  .filepond {
    &--credits {
      display: none !important;
    }

    &--file-wrapper {
      z-index: 90;
    }

    &--file {
      z-index: 100;
    }

    &--file-status-sub,
    &--file-info-sub {
      margin-top: $sub-text-margin;
    }
  }

  .small-items {
    --width: calc(25% - 0.5em);

    & .filepond--item {
      width: var(--width);
      height: 100%;
    }

    @media #{map-get($display-breakpoints, 'xs-only')} {
      --width: 100%;
    }

    @media #{map-get($display-breakpoints, 'sm-only')} {
      --width: calc(50% - 0.5em);
    }

    @media #{map-get($display-breakpoints, 'md-only')} {
      --width: calc(33.33% - 0.5em);
    }
  }
</style>
