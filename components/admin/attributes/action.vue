<template>
  <span>
    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-card-title>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="10" class="d-flex justify-center">
              <h5>مقادیر</h5>
            </v-col>

            <v-col cols="1" class="d-flex justify-center">
              <v-icon color="grey" dark @click="dialog = false">
                mdi-close
              </v-icon>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col cols="12" class="d-flex justify-center">
                <v-form-base :model="model" :schema="schema" />
              </v-col>
              <v-col
                cols="12"
                class="d-flex justify-center pa-5 justify-sm-end"
              >
                <v-btn
                  dark
                  :color="id ? 'primary' : 'success'"
                  :loading="loading"
                  :block="$vuetify.breakpoint.xsOnly"
                  class="pa-5"
                  @click="submit"
                >
                  {{ id ? "ویرایش" : "ثبت" }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
  import { Constants } from "@/constants/GlobalConstants";
  import services from "@/services";
  import {
    formGetPrepare,
    formPostPrepare,
  } from "@/constants/PanelFormHandler";
  import { set } from "vue";
  //   import { get } from "@/services/product";

  export default {
    props: {
      value: Boolean,
      itemId: Number,
      newItems: Object,
      id: {
        default: null,
      },
    },
    computed: {
      dialog: {
        get() {
          return this.value || false;
        },
        set(value) {
          this.$emit("input", value);
        },
      },
    },
    data() {
      return {
        loading: false,
        editLoading: false,
        service: "attributeValue",
        model: {
          attribute_value: this.newItems,
        },
        schema: {
          attribute_value: {
            type: "form-text-field",
            label: "مقدار",
            rules: [Constants.rules.required],
            required: true,
            col: { cols: 12 },
          },
        },
        item: "",
      };
    },
    created() {},
    methods: {
      submit() {
        if (this.id) {
          if (this.$refs.form.validate()) {
            if (!this.editLoading) this.editLoading = true;

            let data = formPostPrepare(this.model);
            data.append("attribute_id", this.itemId);
            services[this.service]
              .update(data, this.id)
              .then((response) => {
                this.loading = false;
                this.dialog = false;
                this.$toast.success("با موفقیت ویرایش شد");
                this.$emit("getList");
              })
              .catch((error) => {
                this.dialog = false;
                this.loading = false;
                console.log(error);
              });
          } else {
            this.loading = false;
            this.$toast.error("لطفا اطلاعات رو وارد نمایید");
          }
        } else {
          if (this.$refs.form.validate()) {
            if (!this.loading) {
              this.loading = true;
            }

            let data = formPostPrepare(this.model);
            data.append("attribute_id", this.itemId);
            services[this.service]
              .create(data)
              .then((response) => {
                this.loading = false;
                this.dialog = false;
                this.$toast.success("با موفقیت ایجاد شد");
                this.$emit("getList");
              })
              .catch((error) => {
                this.dialog = false;
                this.loading = false;
                console.log(error);
              });
          } else {
            this.loading = false;
            this.$toast.error("لطفا اطلاعات رو وارد نمایید");
          }
        }
      },
    },
  };
</script>

<style></style>
