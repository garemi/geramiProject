<template>
  <v-col :cols="size">
    <v-row justify="center">
      <v-toolbar v-if="button_bottom" flat color="transparent">
        <div>
          <h2 class="mb-2">
            {{ label }}
            <span class="error--text" v-if="$attrs.required">*</span>
          </h2>
          <span v-if="subtitle" class="grey--text">
            افزودن قیمت و موجودی برای متغیر
            {{ subtitle }}
          </span>
        </div>
        <template v-if="button_bottom">
          <v-spacer></v-spacer>
          <v-chip
            v-if="addRecordActive && (!records || records.length < max)"
            class="ma-2"
            close
            close-icon="mdi-plus-circle"
            color="primary"
            text-color="white"
            @click="addRecords"
          >
            افزودن
          </v-chip>
        </template>
      </v-toolbar>
    </v-row>
    <v-row class="justify-center">
      <v-col
        cols="12"
        class="pt-0 pb-0 mt-0 mb-0"
        v-for="(item, i) in records"
        :key="i"
      >
        <v-row :no-gutters="no_gutters">
          <v-col cols="12" :sm="removeRecordActive ? 11 : 12">
            <v-form-base :model="item" :schema="schema" :row="rowAttribute" />
          </v-col>

          <v-col
            cols="12"
            sm="1"
            v-if="removeRecordActive"
            class="d-flex align-center justify-center pt-2 pt-md-0 text-center"
          >
            <v-btn
              icon
              outlined
              @click="removeRecords(i)"
              color="var(--dark-gray)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider v-if="divider" />
      </v-col>
      <template v-if="!button_bottom">
        <div class="d-flex justify-center mt-6 flex-1">
          <v-btn
            class="ma-2 py-10"
            v-if="addRecordActive && (!records || records.length < max)"
            x-large
            text
            color="var(--primary)"
            @click="addRecords"
          >
            <div>
              <v-icon x-large> mdi-plus-circle-outline </v-icon>
              <div class="primary-text"> افزودن مرحله جدید</div>
            </div>
          </v-btn>
        </div>
      </template>
    </v-row>
  </v-col>
</template>

<script>
  export default {
    name: "VMultiInput",
    components: {},
    data() {
      return {
        rowAttribute: {
          justify: "start",
          align: "start",
          noGutters: true,
        },
      };
    },
    props: {
      value: {
        // v-model instance
        type: Array,
        required: true,
      },
      priceRule: {
        type: Function,
      },
      label: {
        type: String,
      },
      divider: {
        type: Boolean,
        default: true,
      },
      button_bottom: {
        type: Boolean,
        default: true,
      },
      no_gutters: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: "12",
      },
      subtitle: {
        type: String,
        default: null,
      },
      addRecordActive: {
        type: Boolean,
        default: true,
      },
      removeRecordActive: {
        type: Boolean,
        default: true,
      },
      pushRecord: {
        type: Object,
      },
      schema: {
        type: Object,
        required: true,
      },
      max: {
        type: Number,
        default: 1000,
      },
    },
    methods: {
      addRecords() {
        let record = {};
        Object.keys(this.schema).forEach((key) => {
          record[key] = "";
        });
        this.records.push(record);
      },
      removeRecords(index) {
        this.records.splice(index, 1);
      },
      getRecords() {
        return this.records;
      },
      onEditClick(item) {
        this.$emit("onEditClick", item);
      },
      onDeleteClick(item) {
        this.$emit("onDeleteClick", item);
      },
    },
    mounted() {},
    computed: {
      records: {
        get() {
          return this.value;
        },
        set(records) {
          this.$emit("input", records);
        },
      },
    },
  };
</script>

<style scoped>
  .v-btn {
    display: flex;
    flex-direction: column;
  }
</style>
