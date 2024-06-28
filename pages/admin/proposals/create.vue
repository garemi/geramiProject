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
    created() {},
    data() {
      return {
        title: "پیشنهاد",
        service: "proposal",

        // use 'initModelValue' inside each schema if you want to initialize a model with different values
        schema: {
          property_id: {
            type: "form-auto-complete",
            label: "آگهی",
            rounded: "rounded-lg",
            items: [],
            itemText: "title",
            itemValue: "id",
            rules: [Constants.rules.required],
            required: true,
            loading: true,
            col: { cols: 12, md: 4 },
          },
          price: {
            type: "form-text-price-field",
            label: "قیمت",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12, md: 4 },
          },
          due: {
            type: "form-modal-date-picker",
            label: "تاریخ سررسید",
            min: moment().locale("en").format("YYYY/MM/DD"),
            rules: [Constants.rules.required],
            required: true,
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
