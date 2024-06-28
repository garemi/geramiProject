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
    <v-card-subtitle> </v-card-subtitle>
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
  import { adminCreate } from "@/mixins/admin/create";
  import { adminFetch } from "@/mixins/admin/fetch";
  import moment from "jalali-moment";

  export default {
    mixins: [adminCreate, adminFetch],
    created() {
      this._getItems("parent_id", "review");
    },
    data() {
      return {
        title: "نظر",
        service: "review",

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

        // make changes to the data here before passing to create function

        this.create(data);
      },
    },
  };
</script>
