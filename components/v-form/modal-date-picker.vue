<template>
  <v-col :cols="12" class="pa-2">
    <div class="grey--text" v-if="label">
      {{ label }}
      <span class="error--text" v-if="$attrs.required">*</span>
    </div>
    <v-text-field
      :id="'my-custom-input' + id"
      label=""
      :value="date | moment('jYYYY/jMM/jDD')"
      readonly
      :background-color="
        transparent ? 'transparent' : disabled ? 'grey' : 'grey lighten-2'
      "
      solo
      hide-details="auto"
      flat
      class="rounded-pill cursor-pointer"
      :dense="dense"
      v-bind="$attrs"
      :rules="rules"
      :disabled="disabled"
      @click:clear="clearInput"
    ></v-text-field>
    <date-picker
      v-model="date"
      format="YYYY-MM-DD HH:mm:ss"
      display-format="dddd jDD jMMMM jYYYY"
      :view="view"
      :min="min"
      :type="pickerType"
      auto-submit
      :max="max"
      :element="'my-custom-input' + id"
    >
    </date-picker>
  </v-col>
</template>

<script>
  export default {
    components: {
      datePicker: () => import("vue-persian-datetime-picker"),
    },
    data() {
      return {
        modal: false,
      };
    },
    props: {
      value: {
        // v-model instance
        // type: String,
        required: true,
      },
      label: {
        required: true,
        type: String,
      },
      locale: {
        required: false,
        type: String,
        default: "fa-IR",
      },
      rules: {
        type: Array,
        default: () => [],
      },
      dense: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      min: {
        type: String,
        default: null,
      },
      max: {
        type: String,
        default: null,
      },
      view: {
        type: String | null,
        default: "year",
      },
      id: {
        // for using multiple date picker in a page set unique id for each : by hossein
        type: String | Number,
        default: 1,
      },
      transparent: {
        type: Boolean,
        default: false,
      },
      pickerType: {
        // for using multiple date picker in a page set unique id for each : by hossein
        type: String,
        default: "date",
      },
    },
    methods: {
      clearInput() {
        this.date = "";
      },
      onOkClick() {
        this.$refs.dialog.save(this.date);
      },
    },
    computed: {
      date: {
        get() {
          return this.value;
        },
        set(date) {
          this.$emit("input", date);
        },
      },
    },
  };
</script>

<style scoped>
  .v-input >>> * {
    cursor: pointer;
  }
</style>
