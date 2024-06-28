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
  import { makeSlug } from "@/constants/CustomFunctions/String";
  import services from "@/services";
  import { statuses } from "@/constants/statuses";

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    data() {
      return {
        title: "ویژگی",
        service: "attribute",
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
        users: [],
        model: {
          name: "",
          is_writeable: 0,
          icon_id: "",
          placeholder: "",
          suffix: "",
        },
        schema: {
          name: {
            type: "form-text-field",
            label: "عنوان",
            class: "required",
            rules: [Constants.rules.required],
            col: { cols: 12, sm: 4 },
          },

          is_writeable: {
            type: "form-auto-complete",
            label: "نوع ویژگی",
            itemText: "name",
            itemValue: "id",
            items: [
              {
                id: 1,
                name: "قابل نوشتن توسط کاربر",
              },
              {
                id: 0,
                name: "انتخابی",
              },
            ],
            loading: false,
            // rules: [Constants.rules.required],
            col: { cols: 12, sm: 4 },
          },
          placeholder: {
            type: "form-text-field",
            label: "متن پیش فرض",
            col: { cols: 12, sm: 4 },
          },
          suffix: {
            type: "form-text-field",
            label: "واحد",
            col: { cols: 12, sm: 4 },
          },
          icon_id: {
            type: "form-file-pond",
            label: "ایکن",
            col: { cols: 12, sm: 4 },
          },
        },
        section_code: null,
        loading: false,
      };
    },
    components: {},
    watch: {},
    mounted() {
      // this.getCategories();
    },
    methods: {
      // getCategories: function () {
      //   if (!this.schema.category_ids.loading)
      //     this.schema.category_ids.loading = true;

      //   services.category
      //     .get(null, { noPaginate: true })
      //     .then((response) => {
      //       console.log(response.data);
      //       this.schema.category_ids.loading = false;
      //       this.schema.category_ids.items = response.data;
      //     })
      //     .catch((error) => {
      //       this.schema.category_ids.loading = false;
      //     });
      // },
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;

          // let data = new FormData();

          // data.append("name", this.model.name);
          // data.append("is_writeable", this.model.is_writeable);
          // this.model.category_ids.forEach((category_id, i) => {
          //   formData.append("categories[" + i + "][category_id]", category_id);
          // });
          let data = formPostPrepare(this.model);
          data.append("is_writeable", this.model.is_writeable);

          services[this.service]
            .create(data)
            .then((response) => {
              this.loading = false;
              this.$router.go(-1);
              this.$toast.success(this.model.name + " با موفقیت ایجاد شد.");
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
