<template>
  <v-dialog
    v-model="model"
    max-width="600"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card color="var(--background)" :loading="loading">
      <v-card-title>
        <v-btn
          color="var(--medium-gray)"
          small
          elevation="0"
          style="width: 30px"
          class="rounded-lg ml-2"
          @click="model = false"
        >
          <v-icon color="var(--gray)">mdi-chevron-right</v-icon>
        </v-btn>
        ایجاد تیکت
        <v-spacer />
      </v-card-title>

      <v-card-text>
        <div class="my-2">
          <div class="grey--text">عنوان تیکت</div>
          <v-text-field
            background-color="grey lighten-2"
            hide-details="auto"
            solo
            flat
            class="rounded-lg"
            v-model="title"
          />
        </div>
        <div class="my-2">
          <div class="grey--text">متن تیکت</div>
          <v-textarea
            background-color="grey lighten-2"
            hide-details="auto"
            solo
            flat
            class="rounded-lg"
            v-model="desc"
          />
        </div>
        <div class="mt-4 d-flex">
          <v-spacer />
          <v-btn
            dark
            class="px-8"
            color="primary"
            elevation="0"
            :loading="loading"
            @click="sendTicket"
          >
            ثبت
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { getErrorText } from "@/constants/VianaAxios";
  import services from "@/services";
  import { autoModel } from "@/mixins/auto-model";
  export default {
    mixins: [autoModel],
    data() {
      return {
        loading: false,
        title: "",
        desc: "",
      };
    },
    methods: {
      showModal() {
        this.model = true;
      },
      sendTicket() {
        if (this.title <= 0 || this.desc <= 0) {
          this.$toast.error("پاسخ را به درستی وارد نمایید");
          return;
        }

        if (!this.loading) this.loading = true;
        let formData = new FormData();

        formData.append("title", this.title);
        formData.append("desc", this.desc);
        formData.append("status", 0);

        services.ticket
          .create(formData)
          .then((response) => {
            this.title = "";
            this.desc = "";
            this.loading = false;
            this.model = false;
            this.$toast.success("تیکت شما با موفقیت ثبت شد.");
            this.$emit("getList");
            console.log(response);
          })
          .catch((error) => {
            this.loading = false;
            this.$toast.error(getErrorText(error));
            console.log(error, error.response);
          });
      },
    },
  };
</script>

<style></style>
