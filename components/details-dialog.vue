<template>
  <v-dialog key="2" v-model="dialog" max-width="950">
    <v-card :loading="loading" :disabled="loading" class="rounded-lg">
      <v-card-title class="d-flex align-center pa-5 pb-0">
        <h3>{{ title }}</h3>

        <v-spacer></v-spacer>
        <v-btn large icon class="d-flex flex-end ml-2" @click="close">
          <v-icon color="black">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="overflow-auto mt-2">
        <slot name="top" />

        <v-row>
          <v-col
            v-for="(item, i) in schema"
            :key="'details-item' + i"
            v-bind="
              item.type == 'divider'
                ? { cols: 12 }
                : item.colAttributes || {
                    cols: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                  }
            "
          >
            <v-form-divider
              v-if="item.type == 'divider'"
              :title="item.title || ''"
            />
            <template v-else-if="item.type == 'image'">
              <small>{{ item.title || "" }}</small>
              <viana-img
                :src="getValue(item)"
                v-bind="item.attributes"
                v-on="item.on"
              >
              </viana-img>
            </template>
            <template v-else>
              <small>{{ item.title || "" }}</small>
              <component
                :is="item.component ?? 'h3'"
                class="black--text"
                v-bind="item.attributes"
                v-on="item.on"
              >
                {{ getValue(item) || (item.default ?? "-") }}
              </component>
            </template>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import moment from "jalali-moment";
  import { getNestedProperty } from "@/constants/CustomFunctions/Array";

  export default {
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: "جزئیات",
      },
      data: {
        type: Object,
        default: () => ({}),
      },
      /**
       * schema Array walkthrough
       *
       * Each index contains an object with these properties:
       *
       * @property {string} title             => data heading title
       * @property {string} key               => key that pick from "data" prop
       * @property {string} conditionalValue  => a function which get value of the key and returns show data
       * @property {string} colAttributes     => v-col attributes
       * @property {string} type              => for defining main components like divider,...
       * @property {string} prefix            => a text that appears before the dynamic text
       * @property {string} postfix           => a text that appears after the dynamic text
       *
       * @property {string} component         => (optional) define render component inside each item
       * @property {string} attributes        => (optional) render component attributes
       * @property {string} on                => (optional) render component events
       *
       */
      schema: Array,
    },
    computed: {
      dialog: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
    },
    methods: {
      close() {
        this.dialog = false;
      },
      getValue(item) {
        if (!this.data) return null;

        if (item.key.includes(".")) {
          const property = getNestedProperty(this.data, item.key);
          return property ? this.getValueFromType(property, item) : null;
        } else if (this.data[item.key])
          return this.getValueFromType(this.data[item.key], item);
      },
      getValueFromType(text, item) {
        let finalText = "";

        switch (item?.type) {
          case "price":
            finalText = new Intl.NumberFormat().format(text);
            break;

          case "user_full_name":
            finalText = `${this.data?.first_name ?? "-"} ${
              this.data?.last_name ?? ""
            }`;
            break;

          case "date":
            finalText = moment(new Date(text)).format(
              item.dateFormat || "hh:mm jYYYY/jMM/jDD",
            );
            break;

          default:
            finalText = text;
            break;
        }

        if (item.conditionalValue && typeof item.conditionalValue == "function")
          finalText = item.conditionalValue(text);

        if (item.prefix) finalText = `${item.prefix} ${finalText}`;
        if (item.postfix) finalText += ` ${item.postfix}`;

        return finalText;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
