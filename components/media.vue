<template>
  <v-card class="pa-1" :loading="loading">
    <v-row class="ma-4">
      <v-col cols="12" md="2" sm="6" v-for="(photo, i) in photos" :key="i">
        <v-hover v-slot="{ hover }">
          <div
            class="d-flex align-center justify-center custom-shadow"
            :class="[detail == photo ? 'selected' : '', hover ? 'image' : '']"
          >
            <viana-img
              :src="photo.url"
              :width="140"
              cover
              :aspect-ratio="1 / 1"
              class="cursor-pointer"
              @click="openDetails(photo)"
            >
            </viana-img>
          </div>
        </v-hover>
      </v-col>
    </v-row>
    <v-navigation-drawer v-model="showDetails" fixed left width="400" temporary>
      <!-- color="#cccccc" -->
      <!-- temporary -->
      <div class="details text-center">
        <div class="w-100 text-right">
          <v-icon class="ma-4" x-large @click="close()"> mdi-close</v-icon>
        </div>
        <div class="d-flex justify-center mx-6">
          <viana-img
            :src="detail.url"
            :aspect-ratio="2 / 1"
            contain
            class="rounded-xl mt-4"
          >
          </viana-img>
        </div>
        <div class="d-flex" dir="ltr">
          <v-chip class="mt-4 mx-4"> {{ detail.file_name }} </v-chip>
          <v-chip class="mt-4 mx-4">
            {{ toMegaByte(detail.file_size) }}مگابایت</v-chip
          >
          <v-chip class="mt-4 mx-4"> {{ detail.file_type }}</v-chip>
        </div>

        <div class="text-left">
          <v-btn text class="mt-5" @click="deleteItem(detail)">
            <span class="red-text"> حدف عکس </span>
          </v-btn>
        </div>
        <v-form ref="form" class="ma-4">
          <v-form-base
            :model="model"
            :schema="schema"
            :row="rowAttribute"
            :col="{ cols: 12, md: 6 }"
          />
          <v-btn
            color="green"
            fab
            class="check-btn ma-4"
            @click="updateInformation"
          >
            <v-icon>mdi-check </v-icon></v-btn
          >
        </v-form>
      </div>
    </v-navigation-drawer>
    <paginate v-model="page" :length="pageLength" @onChange="getMedia" />
  </v-card>
</template>

<script>
  import services from "@/services";
  import {
    formGetPrepare,
    formPostPrepare,
  } from "@/constants/PanelFormHandler";
  import { getErrorText } from "@/constants/VianaAxios";
  export default {
    data() {
      return {
        photos: [],
        pageLength: 1,
        page: 1,
        showDetails: false,
        detail: {},
        loading: false,
        model: {
          title: "",
          alt: "",
          desc: "",
        },
        schema: {
          title: {
            type: "form-text-field",
            label: "عنوان",

            col: { cols: 12 },
          },

          alt: {
            type: "form-text-field",
            label: "متن جایگزین(alt)",

            col: { cols: 12 },
          },
          desc: {
            type: "form-text-area",
            label: "توضیحات",

            col: { cols: 12 },
          },
        },
      };
    },
    mounted() {
      this.getMedia();
    },
    computed: {},
    methods: {
      toMegaByte(byte) {
        return +byte / 1000000;
      },
      openDetails(photo) {
        this.detail = photo;
        this.showDetails = true;
        this.model.alt = this.detail.alt;
        this.model.desc = this.detail.desc;
        this.model.title = this.detail.title;
      },
      close() {
        this.detail = {};
        this.showDetails = false;
      },
      getMedia() {
        if (!this.loading) this.loading = true;
        services.media
          .get(null, { page: this.page })
          .then((response) => {
            this.photos = response.data.data;
            this.pageLength = response.data.last_page;
            console.log(response);
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      },

      deleteItem(item) {
        if (!this.loading) this.loading = true;
        services.media
          .destroy(item.id)
          .then((response) => {
            this.$toast.success(item.name + "با موفقیت حذف شد ");
            this.getMedia();
          })
          .catch((error) => {
            this.$toast.error("مشکلی پیش آمد. لطفا دوباره تلاش کنید.");
            this.loading = false;
          });
      },
      updateInformation() {
        if (!this.updateLoading) this.updateLoading = true;
        const data = formPostPrepare(this.model);
        services.media
          .update(data, this.detail.id)
          .then((response) => {
            this.getMedia();
          })
          .catch((error) => {
            this.$toast.error(getErrorText(error));
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .selected {
    border: 1px solid blue;
  }
  .image {
    scale: 1.1;
    opacity: 0.9;
  }

  .check-btn {
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
