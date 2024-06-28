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

        <v-row align="center" justify="end" class="mt-8">
          <v-btn
            class="mx-4"
            dark
            color="success"
            @click="submit"
            :loading="loading"
          >
            ویرایش
          </v-btn>
        </v-row>
      </v-form>

      <v-form-text-field label="رمز" v-model="password">
        <!-- password: {
            type: "form-text-field",
            label: "رمز",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, md: 4 },
          },  -->
      </v-form-text-field>
      <v-btn
        class="mx-4"
        dark
        color="success"
        @click="submitPassword"
        :loading="loading"
      >
        ویرایش رمز
      </v-btn>
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
  import { getErrorText } from "@/constants/VianaAxios";

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    data() {
      return {
        title: "کاربر",
        service: "user",
        loadingPassword: false,
        password: "",
        name: this.$route.params.name || "",
        id: this.$route.params.id,
        destinationRoute: this.localePath(
          this.$route.fullPath.slice(0, this.$route.fullPath.indexOf("/edit")),
        ),
        loading: false,
        rowAttribute: {
          justify: "start",
          align: "start",
          noGutters: false,
        },
        users: [],
        model: {
          avatar: null,
          cellphone: "",
          email: "",
          first_name: "",
          last_name: "",
          type: "",
          shop: "",
          rate: "",
          shop_name: "",
          shop_phone: "",
          shop_javaz: "",
          shop_address: "",
          shop_status: "",
          shop_reject_desc: "",
        },
        schema: {
          avatar: {
            type: "form-avatar-picker",
            label: "آواتار",
            align: "center",
            col: { cols: 12 },
          },
          first_name: {
            type: "form-text-field",
            label: "نام",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, md: 4 },
          },
          last_name: {
            type: "form-text-field",
            label: "نام خانوادگی",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, md: 4 },
          },
          email: {
            type: "form-text-field",
            label: "ایمیل",
            rules: [Constants.rules.required, Constants.rules.email],
            required: true,
            col: { cols: 12, md: 4 },
          },
          rate: {
            type: "form-text-field",
            label: "امتیاز",

            col: { cols: 12, md: 4 },
          },
          type: {
            type: "form-auto-complete",
            label: "نقش کاربر",
            rules: [Constants.rules.required],
            required: true,
            itemText: "title",
            itemValue: "id",
            items: [
              {
                id: "user",
                title: "کاربر عادی",
              },
              {
                id: "user2",
                title: "کاربر مغازه دار",
              },
              {
                id: "admin",
                title: "ادمین",
              },
            ],
            col: { cols: 12, md: 4 },
          },
          cellphone: {
            type: "form-text-field",
            label: "شماره همراه",
            rules: [Constants.rules.required, Constants.rules.cellphone],
            required: true,
            col: { cols: 12, md: 4 },
          },

          shop: {
            type: "form-auto-complete",
            label: "نوع کاربر",
            itemText: "title",
            itemValue: "id",

            items: [
              {
                title: "حقیقی",
                id: "0",
              },
              {
                title: "حقوقی",
                id: "1",
              },
            ],
            disabled: true,
            col: { cols: 12, md: 4 },
          },
          shop_name: {
            type: "form-text-field",
            label: "نام مغازه",
            disabled: true,
            col: { cols: 12, md: 4 },
          },
          shop_phone: {
            type: "form-text-field",
            label: "شماره مغازه",
            disabled: true,
            col: { cols: 12, md: 4 },
          },
          shop_javaz: {
            type: "form-file-pond",
            label: "جواز مغازه",
            disabled: true,
            hidden: true,
            required: true,
            rules: [],
            col: { cols: 12, md: 6 },
          },
          shop_address: {
            type: "form-text-field",
            label: "آدرس مغازه",
            disabled: true,
            col: { cols: 12 },
          },
          shop_status: {
            type: "form-auto-complete",
            label: "وضعیت احراز مغازه",
            items: [
              {
                id: "0",
                title: "در حال بررسی",
              },
              {
                id: "1",
                title: "رد شده",
              },
              {
                id: "2",
                title: "تایید شده",
              },
            ],
            itemText: "title",
            itemValue: "id",
            col: { cols: 12 },
          },
          shop_reject_desc: {
            type: "form-text-field",
            label: "دلیل رد مغازه",
            disabled: true,
            col: { cols: 12 },
          },
        },
      };
    },
    watch: {
      "model.type"() {
        if (this.model.type == "user2") {
          this.schema.shop_javaz.hidden = false;
          this.schema.shop_javaz.rules = [Constants.rules.required];
        } else {
          this.schema.shop_javaz.hidden = true;
          this.schema.shop_javaz.rules = [];
          this.model.shop_javaz = "";
        }
      },
      "model.shop_status"() {
        this.schema.shop_reject_desc = {
          ...this.schema.shop_reject_desc,
          disabled: this.model.shop_status != 1,
        };

        if (this.model.shop_status != 1) this.model.shop_reject_desc = "";
      },
      "model.shop"() {
        if (this.model.shop == "1") {
          this.schema = {
            ...this.schema,
            shop_address: {
              ...this.schema.shop_address,
              rules: [Constants.rules.required],
              required: true,
              disabled: false,
            },
            shop_name: {
              ...this.schema.shop_name,
              rules: [Constants.rules.required],
              required: true,
              disabled: false,
            },
            shop_phone: {
              ...this.schema.shop_phone,
              rules: [Constants.rules.required],
              required: true,
              disabled: false,
            },
          };
        } else {
          this.schema = {
            ...this.schema,
            shop_address: {
              ...this.schema.shop_address,
              rules: [],
              required: false,
              disabled: true,
            },
            shop_name: {
              ...this.schema.shop_name,
              rules: [],
              required: false,
              disabled: true,
            },
            shop_phone: {
              ...this.schema.shop_phone,
              rules: [],
              required: false,
              disabled: true,
            },
          };
        }
      },
    },
    created() {
      this.getData();
    },
    components: {},
    computed: {},
    methods: {
      submitPassword() {
        if (!this.loadingPassword) this.loadingPassword = true;
        services.user
          .updatePassword({ password: this.password }, this.id)
          .then((response) => {
            this.$toast.success(this.title + " با موفقیت ویرایش شد.");

            this.loadingPassword = false;
          })
          .catch((error) => {
            console.log(error);
            this.$toast.error(getErrorText(error));
            this.loadingPassword = false;
          });
      },
      getData() {
        if (!this.loading) this.loading = true;

        services[this.service]
          .get(this.id, { noPaginate: true, with: ["javaz"] })
          .then((response) => {
            formGetPrepare(response, this.model);
            this.model.avatar = response.data[0].avatar?.url;
            this.model.type = response.data[0].javaz
              ? "user2"
              : response.data[0]?.roles[0]?.name;
            this.model.shop = response.data[0].shop_javaz ? "1" : "0";
            this.model.shop_status = response.data[0].shop_status + "";
            this.model.shop_javaz = response.data[0].javaz;
            console.log("roles", response.data[0].roles[0].id);
            console.log("avatar", response.data[0].avatar_url);
            this.loading = false;
          })
          .catch((error) => {
            console.log("error", error);
            this.loading = false;
          });
      },
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;

          let data = formPostPrepare(this.model);
          if (this.model.avatar?.includes("http")) {
            console.log("in if");
            data.delete("avatar");
          }

          data.append(
            "shop_javaz",
            this.model.shop_javaz?.id || this.model.shop_javaz,
          );

          data.append(
            "type",
            this.model.type == "user2" ? "user" : this.model.type,
          );

          services[this.service]
            .update(data, this.id)
            .then((response) => {
              this.loading = false;
              this.$toast.success(this.title + " با موفقیت ویرایش شد.");
              this.$router.go(-1);
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
            });
        } else {
          this.$toast.error("لطفا اطلاعات را به درستی وارد نمایید.");
        }
      },
    },
  };
</script>

<style></style>
