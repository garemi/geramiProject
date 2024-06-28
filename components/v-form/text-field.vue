<template>
  <v-col :cols="12" class="pa-2 text-right">
    <div :class="['grey--text', { 'text-center': centerText }]">
      <!-- class="grey--text text-right" -->
      {{ label }}
      <span class="error--text" v-if="$attrs.required">*</span>
    </div>
    <v-text-field
      :background-color="
        !noBackground ? ($attrs.disabled ? 'grey' : backgroundColor) : undefined
      "
      hide-details="auto"
      flat
      solo
      :autofocus="focus"
      class="rounded-pill"
      v-model="inputVal"
      v-bind="$attrs"
      :type="
        password ? (show_password ? 'text' : 'password') : $attrs.inputType
      "
      :append-icon="
        password
          ? show_password
            ? 'mdi-eye'
            : 'mdi-eye-off'
          : $attrs.appendIcon
      "
      @click:append="onAppendClick"
      label=""
      @keyup.enter="$emit('Add')"
    />
  </v-col>
</template>

<script>
  import { toEnglishNumber } from "@/constants/CustomFunctions/String";

  export default {
    data() {
      return {
        show_password: false,
      };
    },
    props: {
      value: {
        required: true,
      },
      centerText: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        required: false,
      },
      password: {
        type: Boolean,
        default: false,
      },
      noBackground: {
        type: Boolean,
        default: false,
      },
      backgroundColor: {
        type: String,
        default: "grey lighten-2",
      },
      focus: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      inputVal: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", toEnglishNumber(val?.trim()));
        },
      },
    },
    methods: {
      onAppendClick() {
        this.show_password = !this.show_password;
      },
    },
  };
</script>

<style scoped>
  .text-right {
    text-align: right;
  }

  .text-center {
    text-align: center;
  }
</style>
