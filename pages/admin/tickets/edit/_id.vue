<template>
  <v-card :disabled="loading" :loading="loading" class="pb-10">
    <v-card-title>
      {{ "ویرایش " }}
      <v-spacer></v-spacer>

      <v-btn color="primary" @click="$router.go(-1)">
        <v-icon>mdi-undo-variant</v-icon>
        بازگشت
      </v-btn>
    </v-card-title>
    <v-card-subtitle></v-card-subtitle>
    <v-card-text>
      <v-form ref="form">
        <v-form-base
          :col="{ cols: 12, md: 6 }"
          :model="model"
          :row="rowAttribute"
          :schema="schema"
        />

        <v-row align="center" class="mt-8" justify="end">
          <v-btn
            :loading="loading"
            class="mx-4"
            color="success"
            dark
            @click="submit"
          >
            ویرایش
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import { Constants } from "@/constants/GlobalConstants";
  import { formPostPrepare } from "@/constants/PanelFormHandler";
  import { adminEdit } from "@/mixins/admin/edit";
  import { adminFetch } from "@/mixins/admin/fetch";

  export default {
    mixins: [adminEdit, adminFetch],
    created() {
      this.getData((response) => {
        /**
         * parse data here if it doesn't work as you wanted
         * example => this.model.avatar = response.data[0].avatar.url;
         */
      });
    },
    data() {
      return {
        title: "پشتیبانی",
        service: "ticket",

        // use 'initModelValue' inside each schema if you want to initialize a model with different values
        schema: {
          desc: {
            type: "form-tiny-mce",
            label: "توضیحات کامل",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12 },
          },
          rate: {
            type: "form-auto-complete",
            label: " امتیاز ",
            rules: [Constants.rules.required],
            required: true,
            itemText: "title",
            itemValue: "id",
            items: [
              { id: 1, title: 1 },
              { id: 2, title: 2 },
              { id: 3, title: 3 },
              { id: 4, title: 4 },
              { id: 5, title: 5 },
            ],
            suffix: "از 5",
            col: { cols: 12, md: 4 },
          },
          model_id: {
            type: "form-auto-complete",
            label: "مربوط به آموزش",
            rules: [Constants.rules.required],
            required: true,
            itemText: "title",
            itemValue: "id",
            items: [],
            loading: true,
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
        },
      };
    },
    methods: {
      async submit() {
        let data = formPostPrepare(this.model);

        // make changes to the data here before passing to edit function

        this.edit(data);
      },
    },
  };
</script>

<style></style>