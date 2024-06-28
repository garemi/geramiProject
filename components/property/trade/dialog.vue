<template>
  <v-bottom-sheet
    v-model="model"
    scrollable
    content-class="ma-2 rounded-xl"
    max-width="500px"
  >
    <v-card class="text-center pa-4 rounded-xl">
      <v-card-text class="px-3 pb-0">
        <v-row class="" no-gutters>
          <v-col
            cols="12"
            class="d-flex justify-space-between align-center mt-2"
          >
            <p class="black--text xl-text font-weight-bold text-right">
              مبادله کالا
            </p>
            <div class="rounded-lg div-style d-flex justify-center">
              <v-icon @click="model = !model" color="black"> mdi-close </v-icon>
            </div>
          </v-col>
          <v-col cols="12" class="mt-4">
            <property-trade-expand-item
              v-model="selectedType"
              :isExpanded="expandIdx == 1"
              @toggleExpand="expandIdx == 1 ? (expandIdx = 0) : (expandIdx = 1)"
            >
              <template #title>
                <div class="d-flex align-center">
                  <v-img
                    :src="require('@/assets/img/minus-border.svg')"
                    max-width="18px"
                    max-height="18px"
                    contain
                  />
                  <p class="md-text font-weight-bold black--text mr-1">
                    ارسال پیام خودکار
                  </p>
                </div>
                <div class="text-right sm-text font-weight-500 black--text">
                  جهت مبادله، به صورت خودکار برای شخص پیغام ارسال می‌شود.
                </div>
              </template>
            </property-trade-expand-item>
            <v-divider class="my-2" />
            <property-trade-expand-item
              v-model="selectedType"
              :isExpanded="expandIdx == 2"
              @toggleExpand="expandIdx == 2 ? (expandIdx = 0) : (expandIdx = 2)"
            >
              <template #title>
                <div class="d-flex align-center">
                  <v-img
                    :src="require('@/assets/img/image.svg')"
                    max-width="18px"
                    max-height="18px"
                    contain
                  />
                  <p class="md-text font-weight-bold black--text mr-1">
                    ارسال عکس محصول با پیام خودکار
                  </p>
                </div>
                <div class="text-right sm-text font-weight-500 black--text">
                  جهت مبادله، پس از بارگذاری عکس محصولتان به صورت خودکار برای
                  شخص پیغام ارسال می‌شود.
                </div>
              </template>
              <v-form-file-picker
                @selected="
                  (img) => {
                    file = img;
                  }
                "
                class="mt-2"
              />
            </property-trade-expand-item>
          </v-col>
          <v-col cols="12"> </v-col>
          <v-col cols="12">
            <v-btn
              :loading="loading"
              @click="submit"
              elevation="0"
              block
              rounded
              color="var(--text-700)"
              class="white--text mb-0 py-5 mt-2"
            >
              ثبت درخواست
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
  import { autoModel } from "@/mixins/auto-model";
  import services from "@/services";
  import { formPostPrepare } from "@/constants/PanelFormHandler";
  import { showError } from "@/constants/messages";
  export default {
    mixins: [autoModel],
    props: {
      user: String,
    },
    data() {
      return {
        expandIdx: 0,
        selectedType: 0,
        file: null,
        loading: false,
        items: [
          {
            id: "1",
            title: "بنده مایل هستم کالای شما را با کالای خود مبادله کنم.",
          },
          {
            id: "2",
            title: "آیا تمایل دارید کالای خود را با کالای بنده تعویض نمایید؟",
          },
          {
            id: "3",
            title: "اگر متمایل هستید مبادله کالا به کالا داشته باشیم!",
          },
        ],
      };
    },
    watch: {
      expandIdx() {
        this.clear();
      },
      model() {
        if (this.model) {
          this.expandIdx = 0;
          this.clear();
        }
      },
    },
    methods: {
      clear() {
        this.selectedType = 0;
        this.file = null;
      },
      async submit() {
        try {
          if (!this.selectedType) throw 629;
          this.loading = true;

          const formData = new FormData();
          formData.append("content", this.items[this.selectedType].title);
          if (this.file) {
            formData.append("image", this.file);
          }

          await this.$axios.$post(`/messages/${this.user}`, formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });

          this.$router.push("/chat");

          //   this.loading = true;

          //   const data = formPostPrepare({
          //     type: this.selectedType,
          //     media_id: this.file,
          //   });

          //   const response = await services.trade.create(data);

          this.loading = false;
        } catch (error) {
          console.log(error);
          showError(error);
          this.loading = false;
        }
      },
    },
  };
</script>

<style></style>
