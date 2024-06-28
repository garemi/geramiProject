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
        title: "ریپورت",
        service: "report",
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
          //   id: "",
          model_id: "",
          //   model_type: "",
          user_id: "",
          desc: "",
          status: "",
        },
        schema: {
          user_id: {
            type: "form-auto-complete",
            label: "کاربر",
            itemText: "full_name",
            itemValue: "id",
            items: [],
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, md: 4 },
          },

          status: {
            type: "form-auto-complete",
            label: "وضعیت",
            rules: [Constants.rules.required],
            required: true,
            itemText: "title",
            itemValue: "id",
            items: statuses.report,
            loading: false,
            col: { cols: 12, md: 4 },
          },
          model_id: {
            type: "form-auto-complete",
            label: "مربوط به پروژه",
            rules: [Constants.rules.required],
            required: true,
            itemText: "title",
            itemValue: "id",
            items: [],
            loading: true,
            col: { cols: 12, md: 4 },
          },

          desc: {
            type: "form-tiny-mce",
            label: "توضیحات کامل",

            col: { cols: 12 },
          },
        },
      };
    },
    created() {
      this.getData();
      this.getUsers();
      this.getProjects();
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
      getProjects() {
        if ((this.schema.model_id.loading = false))
          this.schema.model_id.loading = true;
        services.projects
          .get(null, {
            noPaginate: true,
          })
          .then((response) => {
            this.schema.model_id.loading = false;
            this.schema.model_id.items = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getUsers() {
        if ((this.schema.user_id.loading = false))
          this.schema.user_id.loading = true;
        services.user
          .get(null, {
            noPaginate: true,
          })
          .then((response) => {
            this.schema.user_id.loading = false;

            this.schema.user_id.items = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getData() {
        if (!this.loading) this.loading = true;

        services[this.service]
          .getProjects(this.id, { noPaginate: true })
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
