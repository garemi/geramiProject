<template>
  <v-container>
    <v-card :loading="loading" :disabled="loading" class="ma-5" elevation="0">
      <v-card-title>
        ایجاد {{ title }} جدید
        <v-spacer></v-spacer>
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
  </v-container>
</template>

<script>
  import { Constants } from "@/constants/GlobalConstants";
  import { formPostPrepare } from "@/constants/PanelFormHandler";
  import { showError, showMessage } from "@/constants/messages";
  import services from "@/services";

  export default {
    layout: "empty",
    data() {
      return {
        title: "اسکما",
        service: "schema",

        loading: false,

        model: {
          name: "",
          schema: "",
        },
        schema: {
          name: {
            type: "form-text-field",
            label: "نام",
            rules: [Constants.rules.required, Constants.rules.english_string],
            required: true,
            class: "ltr",
            col: { cols: 12 },
          },
          schema: {
            type: "form-text-area",
            label: "فیلد",
            rules: [Constants.rules.required],
            required: true,
            class: "ltr",
            col: { cols: 12 },
          },
        },
      };
    },
    methods: {
      async submit() {
        try {
          if (!services[this.service]) throw 628;

          if (!this.$refs.form.validate()) throw 600;

          this.loading = true;

          const data = formPostPrepare(this.model);

          await services[this.service].create(data);

          this.loading = false;

          showMessage(1004);
        } catch (error) {
          console.log(error);
          if (
            error?.response?.data?.message?.toLowerCase()?.includes("duplicate")
          )
            showError(621);
          else showError(error);

          this.loading = false;
        }
      },
    },
  };
</script>
