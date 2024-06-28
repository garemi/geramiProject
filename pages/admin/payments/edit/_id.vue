<template>
  <v-card :loading="loading" :disabled="loading" class="pb-10">
    <v-card-title>
      {{ "ویرایش " }}
      <v-spacer></v-spacer>

      <v-btn color="primary" @click="$router.go(-1)">
        <v-icon>mdi-undo-variant</v-icon>
        بازگشت
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-form-base
          :model="model"
          :schema="schema"
          :row="rowAttribute"
          :col="{ cols: 12, md: 6 }"
        />
        <v-row>
          <v-col cols="12">
            <v-checkbox
              type="checkbox"
              v-model="has_allow_phone"
              label="آیا مایل به انتشار شماره موبایل خود هستید؟"
            >
            </v-checkbox>
          </v-col>

          <v-col cols="12">
            <v-checkbox
              type="checkbox"
              v-model="has_allow_exchange"
              label="آیا مایل به نمایش تاریخ مجاز معامله هستید؟"
            >
            </v-checkbox>
          </v-col>

          <v-col cols="12">
            <v-checkbox
              type="checkbox"
              v-model="has_online_price"
              label="آیا مایل به نمایش قیمت آنلاین هستید؟"
            >
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row align="center" justify="end" class="mt-8">
          <v-btn
            class="mx-4"
            dark
            color="success"
            @click="submit"
            :loading="loading"
          >
            {{ "ایجاد " + title + " جدید" }}
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import { makeSlug } from "@/constants/CustomFunctions/String";
  import { Constants } from "@/constants/GlobalConstants";
  import {
    formPostPrepare,
    formGetPrepare,
  } from "@/constants/PanelFormHandler";
  import services from "@/services";

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    data() {
      return {
        title: "محصول",
        service: "property",
        name: this.$route.params.name || "",
        id: this.$route.params.id,
        destinationRoute: this.localePath(
          this.$route.fullPath.slice(0, this.$route.fullPath.indexOf("/edit")),
        ),
        rowAttribute: {
          justify: "start",
          align: "start",
          noGutters: false,
        },

        has_allow_phone: "",
        has_allow_exchange: "",
        has_online_price: "",

        users: [],
        model: {
          title: "",
          due: "",
          image: "",
          gallery: [],
          desc: "",
        },
        schema: {
          title: {
            type: "form-text-field",
            label: "نام محصول",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, md: 6 },
          },
          image: {
            type: "form-file-pond",
            label: "تصویر شاخص",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, md: 6 },
          },

          desc: {
            type: "form-tiny-mce",
            label: "توضیحات کامل",
            // rules: [Constants.rules.required, Constants.rules.email],
            required: true,
            col: { cols: 12 },
          },

          gallery: {
            type: "form-multi-input",
            label: "گالری",
            addRecordTitle: "افزودن تصویر ",
            schema: {
              image: {
                type: "form-file-pond",
                label: "تصویر",
                col: { cols: 12 },
                rules: [Constants.rules.required],
              },
            },
          },
          due: {
            id: 1,
            type: "form-modal-date-picker",
            pickerType: "date-time",
            label: "تاریخ مجاز معامله",
            rounded: true,
            col: {
              cols: 12,
              md: 6,
            },
          },
          // has_allow_phone: {
          //   type: "checkbox",
          //   label: "تاریخ مجاز معامله",
          //   col: {
          //     cols: 12,
          //     md: 6,
          //   },
          // },
        },

        loading: false,
      };
    },
    components: {},

    created() {
      this.getData();
    },

    methods: {
      getData: async function () {
        if (!this.loading) this.loading = true;

        try {
          const response = await services[this.service].get(this.id, {
            noPaginate: true,
            with: ["image"],
          });
          formGetPrepare(response, this.model);
          this.has_online_price = response.data[0].has_online_price == 1;
          this.has_allow_exchange = Boolean(
            response.data[0].has_allow_exchange,
          );
          this.has_allow_phone = !!response.data[0].has_allow_phone;

          this.model.gallery = this.model.gallery.map((item) => {
            return { image: item };
          });
        } catch (error) {
        } finally {
          this.loading = false;
        }
      },

      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          let data = formPostPrepare(this.model);
          data.append("has_allow_phone", +this.has_allow_phone);
          data.append("has_allow_exchange", +this.has_allow_exchange);
          data.append("has_online_price", +this.has_online_price);
          services[this.service]
            .update(data)
            .then((response) => {
              this.loading = false;
              this.$router.go(-1);
              this.$toast.success(" با موفقیت ویرایش شد.");
            })
            .catch((error) => {
              this.loading = false;
              if (
                error?.response?.data?.message
                  ?.toLowerCase()
                  ?.includes("duplicate")
              )
                this.$toast.error(
                  "اسلاگ تکراری است. لطفا در نامگذاری مقاله دقت کنید. اسلاگ همان نام پست میباشد.",
                );
              else
                this.$toast.error("مشکلی پیش آمده است. لطفا دوباره سعی کنید");
              console.log(error.response || error);
            });
        } else {
          this.$toast.error("لطفا اطلاعات را به درستی وارد نمایید.");
        }
      },
    },
  };
</script>

<style></style>
