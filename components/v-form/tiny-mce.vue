<template>
  <div v-if="show">
    <div class="grey--text text-right">
      {{ label }}
      <span class="error--text" v-if="$attrs.required">*</span>
    </div>
    <editor
      ref="tinymceRef"
      :key="'tinymce_' + slug"
      v-model="tinyMCEvalue"
      :init="editorConfig"
    />
  </div>
</template>

<script>
  import VianaAxios from "@/constants/VianaAxios";
  import Editor from "@tinymce/tinymce-vue";

  let tinymce = null;
  if (!process.server) tinymce = require("vue-tinymce-editor");

  export default {
    components: {
      tinymce,
      Editor,
    },
    mounted() {
      this.editorConfig.language_url = require("@/constants/fa.js");
      setTimeout(() => {
        this.show = true;
      }, 200);
    },
    data() {
      return {
        show: false,
        editorConfig: {
          language_url: null,
          directionality: "rtl",
          height: "300px",
          images_upload_handler: this.uploadImage,
          toolbar:
            "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
          plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "template paste textcolor colorpicker textpattern imagetools toc help emoticons hr codesample",
          ],
        },
      };
    },
    props: {
      value: {
        required: true,
      },
      label: {
        required: true,
        type: String,
      },
      slug: {
        type: String,
        default: "1",
      },
      rules: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      uploadImage(blobInfo, success, failure, progress) {
        let data = new FormData();
        data.append("filepond", blobInfo.blob());
        data.append("title", blobInfo.filename());
        VianaAxios.post(`/media/upload`, data)
          .then((response) => {
            success(response.data?.url || "");
          })
          .catch((error) => {
            failure("با خطا مواجه شد");
          });
      },
    },
    computed: {
      tinyMCEvalue: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        },
      },
    },
  };
</script>

<style></style>
