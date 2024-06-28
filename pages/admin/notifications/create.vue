<template>
  <v-card :loading="loading" :disabled="loading" class="pb-10">
    <v-card-title>
      ایجاد {{ title }} جدید
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="type" tile color="deep-purple accent-3" group>
        <v-btn value="کلی"> کلی </v-btn>
        <v-btn value="تکی"> تکی </v-btn>
      </v-btn-toggle>
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
  import { Constants } from "@/constants/GlobalConstants";
  import { formPostPrepare } from "@/constants/PanelFormHandler";
  import services from "@/services";

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    data() {
      return {
        title: "اطلاعیه",
        type: "کلی",
        service: "user",
        loading: false,
        destinationRoute: this.$route.fullPath.slice(
          0,
          this.$route.fullPath.indexOf("/create"),
        ),
        rowAttribute: {
          justify: "start",
          align: "start",
          noGutters: false,
        },
        users: [],
        model: {
          title: "",
          desc: "",
          roleName: "",
        },
        schema: {
          roleName: {
            type: "form-auto-complete",
            label: "نقش",
            items: ["admin", "user"],
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, sm: 6 },
          },
          title: {
            type: "form-text-field",
            label: "عنوان",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, sm: 6 },
          },
          desc: {
            type: "form-text-area",
            label: "توضیحات",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12 },
          },
        },

        loading: false,
      };
    },
    components: {},
    created() {},
    mounted() {},
    watch: {
      type() {
        this.model = {
          title: "",
          desc: "",
          ...(this.type == "تکی" ? { ids: "" } : { roleName: "" }),
        };
        this.schema = {
          ...(this.type == "تکی"
            ? {
                ids: {
                  type: "form-auto-complete",
                  multiple: true,
                  label: "کاربر",
                  rules: [Constants.rules.required],
                  required: true,
                  itemText: "full_name",
                  itemValue: "id",
                  items: [],
                  col: { cols: 12, md: 6 },
                },
              }
            : {
                roleName: {
                  type: "form-auto-complete",
                  label: "نقش",
                  items: ["admin", "user"],
                  rules: [Constants.rules.required],
                  required: true,
                  col: { cols: 12, sm: 6 },
                },
              }),
          ...this.schema,
        };

        if (this.type == "تکی") {
          delete this.schema.roleName;
          this.getUsers();
        } else delete this.schema.ids;
      },
    },
    methods: {
      getUsers() {
        services.user
          .get()
          .then((response) => {
            this.schema.ids.items = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          let data = formPostPrepare(this.model);
          if (this.type == "تکی") {
            services.user
              .sendWithId(data)
              .then((response) => {
                this.loading = false;
                this.$toast.success("با موفقیت ارسال شد.");
                this.model.title = "";
                this.model.desc = "";
                this.model.ids = "";
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
                console.log(error.response || error);
              });
          } else {
            services[this.service]
              .send(data, this.model.roleName)
              .then((response) => {
                this.loading = false;
                this.$toast.success("با موفقیت ارسال شد.");
                this.model.title = "";
                this.model.desc = "";

                this.model.roleName = "";
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
                console.log(error.response || error);
              });
          }
        } else {
          this.$toast.error("لطفا اطلاعات را به درستی وارد نمایید.");
        }
      },
    },
  };
</script>

<style></style>
