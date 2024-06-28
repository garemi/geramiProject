<template>
  <v-card :loading="loading" :disabled="loading" class="pb-10">
    <v-card-title>
      ایجاد {{ title }} جدید
      <v-spacer></v-spacer>

      <v-btn color="primary" @click="$router.go(-1)">
        <v-icon>mdi-undo-variant</v-icon>
        بازگشت
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      در این بخش میتوانید {{ title }} درست کنید.
    </v-card-subtitle>
    <v-card-text>
      <v-form ref="form">
        <v-form-base
          :model="model"
          :schema="schema"
          :row="rowAttribute"
          :col="{ cols: 12, md: 6 }"
        />

        <v-row class="px-4">
          <v-col cols="12">
            <h3 class="text-right">ویژگی ها </h3>
          </v-col>
          <v-col
            cols="12"
            v-for="(item, i) in attributes"
            :key="i"
            class="d-flex justify-space-between align-center input-bg rounded-pill my-2 py-2"
          >
            <span class="black--text font-weight-bold mx-2">
              {{ item?.name }}
            </span>
            <admin-attributes-create
              v-model="item.vModel"
              :items="item?.values"
              :nameTitle="item?.name"
              :isDefault="false"
              :is_writeable="item?.is_writeable"
              :placeHolder="item?.placeholder"
              :suffix="item.suffix"
            />
          </v-col>
        </v-row>

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
  import moment from "moment";
  import { Constants } from "@/constants/GlobalConstants";
  import { formPostPrepare } from "@/constants/PanelFormHandler";
  import { makeSlug } from "@/constants/CustomFunctions/String";
  import services from "@/services";
  import { statuses } from "@/constants/statuses";
  import { adminFetch } from "@/mixins/admin/fetch";

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    mixins: [adminFetch],
    data() {
      return {
        title: "محصول",
        service: "property",
        skipAutoRequests: true,
        destinationRoute: this.localePath(
          this.$route.fullPath.slice(
            0,
            this.$route.fullPath.indexOf("/create"),
          ),
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
          online_price: "",
          price: "",
          county_id: "",
          create_by: "",
          status: [],
        },
        schema: {
          title: {
            type: "form-text-field",
            label: "نام محصول",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, md: 4 },
          },
          desc: {
            type: "form-tiny-mce",
            label: "توضیحات کامل",
            // rules: [Constants.rules.required, Constants.rules.email],
            required: true,
            col: { cols: 12 },
          },
          image: {
            type: "form-file-pond",
            label: "تصویر شاخص",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, md: 4 },
          },
          gallery: {
            type: "form-multi-input",
            label: "گالری",
            addRecordTitle: "افزودن تصویر ",
            schema: {
              image: {
                type: "form-file-pond",
                label: "تصویر",
                col: { cols: 12, md: 4 },
                rules: [Constants.rules.required],
              },
            },
          },

          categories: {
            type: "form-auto-complete",
            label: "دسته بندی های آگهی",
            itemText: "title",
            itemValue: "id",
            loading: false,
            multiple: true,
            items: [],
            required: true,
            rules: [Constants.rules.array_required],
            col: { cols: 12, md: 4 },
          },
          online_price: {
            type: "form-text-price-field",
            label: " قیمت آنلاین ",
            require: "true",
            rules: [Constants.rules.numeric],
            suffix: "تومان",
            col: { cols: 12, md: 4 },
            required: true,
          },
          price: {
            type: "form-text-price-field",
            label: " قیمت  ",
            require: "true",
            rules: [Constants.rules.numeric],
            suffix: "تومان",
            col: { cols: 12, md: 4 },
            required: true,
          },
          create_by: {
            type: "form-auto-complete",
            label: "فروشنده",
            itemText: "full_name",
            itemValue: "id",
            loading: false,
            items: [],
            col: { cols: 12, md: 4 },
          },
          county_id: {
            type: "form-auto-complete",
            label: "موقیت مکانی",
            itemText: "name",
            itemValue: "id",
            loading: false,
            items: [],
            col: { cols: 12, md: 4 },
          },
          due: {
            id: 1,
            type: "form-modal-date-picker",
            pickerType: "date-time",
            label: "تاریخ مجاز معامله",
            rounded: true,
            col: {
              cols: 12,
            },
          },
          status: {
            type: "form-auto-complete",
            label: "وضعیت",
            items: statuses.property,
            itemText: "name",
            itemValue: "name",
            col: { cols: 12, md: 4 },
          },
        },

        loading: false,
        loadingAttribute: false,
        attributes: [],
        values: [],
        static_values: [],
      };
    },
    components: {},

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          let data = formPostPrepare(this.model);
          // سایر اطلاعات
          data.append("has_allow_phone", +this.has_allow_phone);
          data.append("has_allow_exchange", +this.has_allow_exchange);
          data.append("has_online_price", +this.has_online_price);

          // اضافه کردن مقادیر ویژگی‌ها به FormData
          this.values = this.attributes.reduce(
            (arr, current) =>
              current.vModel && current.is_writeable == "0"
                ? [...arr, { id: current.vModel?.id }]
                : arr,
            [],
          );
          this.static_values = this.attributes.reduce(
            (arr, current) =>
              current.vModel && current.is_writeable == "1"
                ? [...arr, { id: current.id, value: current.vModel }]
                : arr,
            [],
          );
          data.append(
            "attribute_values",
            this.values.length ? JSON.stringify(this.values) : undefined,
          );
          data.append(
            "static_values",
            this.static_values.length
              ? JSON.stringify(this.static_values)
              : undefined,
          );

          services[this.service]
            .create(data)
            .then((response) => {
              this.loading = false;
              this.$router.go(-1);
              this.$toast.success(" با موفقیت ایجاد شد.");
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
      getCounty() {
        if (!this.schema.county_id.loading)
          this.schema.county_id.loading = true;
        services.county
          .get(null, { noPaginate: true })
          .then((response) => {
            this.schema.county_id.items = response.data;
            this.schema.county_id.loading = false;
          })
          .catch((error) => {
            this.schema.county_id.loading = false;
            console.log(error);
          });
      },

      getAttribute() {
        if (!this.loadingAttribute) this.loadingAttribute = true;
        services.attribute
          .get(null, { noPaginate: true, with: ["values"] })
          .then((response) => {
            // this.attributes = response.data;
            this.attributes = response.data.map((val) => ({
              ...val,
              vModel: "",
            }));
            this.loadingAttribute = false;
          })
          .catch((error) => {
            this.loadingAttribute = false;
            console.log(error);
          });
      },

      getUser() {
        if (!this.schema.create_by.loading)
          this.schema.create_by.loading = true;
        services.user
          .get(null, { noPaginate: true })
          .then((response) => {
            this.schema.create_by.items = response.data;
            this.schema.create_by.loading = false;
          })
          .catch((error) => {
            this.schema.create_by.loading = false;
            console.log(error);
          });
      },
    },
    mounted() {
      this.getCounty();
      this.getAttribute();
      this.getUser();

      this._getItems("categories", "category");
    },
  };
</script>

<style></style>
