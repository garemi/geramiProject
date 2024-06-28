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
  import { statuses } from "@/constants/statuses";

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    data() {
      return {
        title: "دسته بندی",
        service: "category",
        name: this.$route.params.name || "",
        id: this.$route.params.id,
        destinationRoute: this.localePath(
          this.$route.fullPath.slice(0, this.$route.fullPath.indexOf("/edit")),
        ),
        access: ["project", "course", "post"],
        loading: false,
        rowAttribute: {
          justify: "start",
          align: "start",
          noGutters: false,
        },
        users: [],
        model: {
          title: "",
          slug: "",
          order: "",
          parent_id: "",
          status: "",
          desc: "",
          icon: "",
        },
        schema: {
          title: {
            type: "form-text-field",
            label: "عنوان",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, md: 4 },
          },
          order: {
            type: "form-text-field",
            label: "ترتیب",
            rules: [Constants.rules.numeric, Constants.rules.required],
            required: true,

            col: { cols: 12, md: 4 },
          },
          parent_id: {
            type: "form-auto-complete",
            label: "ای دی پدر",
            loading: true,
            items: [],
            itemText: "title",
            itemValue: "id",
            col: { cols: 12, md: 4 },
          },

          status: {
            type: "form-auto-complete",
            label: "وضعیت",
            rules: [Constants.rules.required],
            required: true,
            itemText: "title",
            itemValue: "id",
            items: statuses.category,
            loading: false,
            col: { cols: 12, md: 4 },
          },
          desc: {
            type: "form-tiny-mce",
            label: "توضیحات کامل",

            col: { cols: 12 },
          },
          icon: {
            type: "form-file-pond",
            label: "آیکون",
            align: "center",
            col: { cols: 12, md: 4 },
          },
        },
      };
    },

    created() {
      if (this.access.find((value) => this.$route.params.type == value)) {
        this.getData();
        this.getParent();
      } else {
        this.$router.push("/");
      }
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
      getParent() {
        if ((this.schema.parent_id.loading = false))
          this.schema.parent_id.loading = true;
        services.category
          .getWithType(this.$route.params.type, null, {
            noPaginate: true,
          })
          .then((response) => {
            this.schema.parent_id.items = response.data;
            this.schema.parent_id.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.schema.parent_id.loading = false;
          });
      },
      getData() {
        if (!this.loading) this.loading = true;

        services[this.service]
          .getWithType(this.$route.params.type, this.id, { noPaginate: true })
          .then((response) => {
            formGetPrepare(response, this.model);
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
          });
      },
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          let data = formPostPrepare(this.model);
          data.append("slug", makeSlug(this.model.title));

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
