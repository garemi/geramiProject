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
        title: "ویژگی",
        service: "attribute",
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
          name: "",
          is_writeable: "",
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
            rules: [Constants.rules.required],
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
        // model: {
        //   name: "",
        //   is_writeable: 0,
        //   category_ids: null,
        // },
        // schema: {
        //   name: {
        //     type: "form-text-field",
        //     label: "عنوان",
        //     class: "required",
        //     rules: [Constants.rules.required],
        //     col: { cols: 12, sm: 4 },
        //   },
        //   category_ids: {
        //     type: "form-auto-complete",
        //     label: "دسته بندی های مجاز",
        //     itemText: "name",
        //     itemValue: "id",
        //     items: [],
        //     rules: [Constants.rules.required],
        //     loading: true,
        //     multiple: true,
        //     col: { cols: 12, sm: 4 },
        //   },
        //   is_writeable: {
        //     type: "form-auto-complete",
        //     label: "نوع ویژگی",
        //     itemText: "name",
        //     itemValue: "id",
        //     items: [
        //       {
        //         id: 2,
        //         name: "قابل نوشتن توسط کاربر",
        //       },
        //       {
        //         id: 1,
        //         name: "انتخابی",
        //       },
        //     ],
        //     loading: false,
        //     rules: [Constants.rules.required],
        //     col: { cols: 12, sm: 4 },
        //   },
        // },
        section_code: null,
      };
    },
    created() {
      this.getData();
      // this.getCategories();
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
      getCategories: function () {
        if (!this.schema.category_ids.loading)
          this.schema.category_ids.loading = true;

        services.category
          .get(null, { noPaginate: true })
          .then((response) => {
            console.log(response.data);
            this.schema.category_ids.loading = false;
            this.categories = response.data.data;

            this.schema.category_ids.items = response.data.data;
          })
          .catch((error) => {
            this.schema.category_ids.loading = false;
          });
      },
      getData() {
        if (!this.loading) this.loading = true;

        services[this.service]
          .get(this.id, { noPaginate: true })
          .then((response) => {
            formGetPrepare(response, this.model);
            this.model.icon_id = response.data[0]?.icon;

            // this.model.files = response.data[0]?.files?.length
            //   ? response.data[0].files.map((file) => ({
            //       file,
            //     }))
            //   : [];
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
          });
      },
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;

          // let formData = new FormData();

          // formData.append("name", this.model.name);
          // formData.append("is_writeable", this.model.is_writeable - 1);

          // this.model.category_ids.forEach((category_id, i) => {
          //   formData.append("categories[" + i + "][category_id]", category_id);
          // });
          let data = formPostPrepare(this.model);

          services[this.service]
            .update(data, this.id)
            .then((response) => {
              this.loading = false;
              this.$toast.success(this.model.name + " با موفقیت ویرایش شد.");
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
