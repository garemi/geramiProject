<template>
  <v-dialog v-model="openDialog" max-width="600" persistent>
    <v-card>
      <div class="d-flex justify-space-between align-center mx-4">
        <v-card-title>ایجاد پرداخت جدید</v-card-title>
        <v-btn @click="closeDialog()" icon>
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </div>
      <v-card-text>
        <v-form ref="form">
          <v-form-base :model="model" :schema="schema"></v-form-base>
          <v-row>
            <v-col cols="12" class="text-left">
              <v-btn
                dark
                color="success"
                class="ml-2"
                @click="submit"
                :loading="isSubmitting"
                >ایجاد</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import { Constants } from "@/constants/GlobalConstants";
  import services from "@/services";
  import { formPostPrepare } from "@/constants/PanelFormHandler";
  export default {
    data() {
      return {
        isSubmitting: false,

        model: {
          price: "",
          regard: "",
          user_id: "",
        },
        schema: {
          user_id: {
            label: "کاربر",
            type: "form-auto-complete",
            col: { cols: 12 },
            required: true,
            rounded: "rounded-lg",
            items: [],
            itemText: "full_name",
            itemValue: "id",
            rules: [Constants.rules.required],
            loading: true,
          },
          price: {
            label: "مبلغ ",
            type: "form-text-price-field",
            rules: [Constants.rules.required, Constants.rules.numeric],
            required: true,
            col: { cols: 12 },
            rounded: "rounded-lg",
          },
          regard: {
            label: "بابت",
            type: "form-auto-complete",
            col: { cols: 12 },
            items: [{ text: " تایید نرم افزار" }, { text: "سایر" }],
            required: true,
            itemText: "text",
            rounded: "rounded-lg",
            rules: [Constants.rules.required],
          },
        },
      };
    },
    props: {
      openDialog: {
        type: Boolean,
      },
    },
    mounted() {
      this.getUsers();
    },

    methods: {
      getUsers() {
        services.user
          .get(null, { noPaginate: true })
          .then((response) => {
            this.schema.user_id.loading = false;
            this.schema.user_id.items = response.data;
          })
          .catch((error) => {
            this.schema.user_id.loading = false;
            console.log(error);
          });
      },
      closeDialog() {
        this.$emit("close", false);
        this.model.user_id = "";
        this.model.price = "";
        this.model.regard = "";
      },
      submit() {
        this.isSubmitting = true;
        if (this.$refs.form.validate()) {
          let data = formPostPrepare(this.model);
          services.payment
            .createLink(data)
            .then((response) => {
              this.$toast.success("لینک با موفقیت ارسال شد");
            })
            .catch((response) => {
              this.$toast.error("مشکلی پیش آمدده است،لطفا دوباره تلاش کنید");
            });
          this.isSubmitting = false;
        } else {
          this.$toast.error("لطفا اطلاعات را به درستی وارد کنید");
          this.isSubmitting = false;
        }
      },
    },
  };
</script>
