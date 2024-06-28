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
        title: " دسته بندی ",
        service: "category",
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
        access: ["project", "course", "post"],

        model: {
          title: "",

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

        loading: false,
      };
    },
    components: {},
    watch: {},
    mounted() {
      if (this.access.find((value) => this.$route.params.type == value)) {
        this.getParent();
      } else {
        this.$router.push("/");
      }
    },
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
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          let data = formPostPrepare(this.model);
          data.append("slug", makeSlug(this.model.title));
          data.append("model_type", this.$route.params.type);
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
    },
  };
</script>

<style></style>
