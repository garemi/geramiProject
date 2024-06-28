<template>
  <v-col :cols="12" class="pa-2">
    <div class="grey--text text-right">
      {{ label }}
      <span class="error--text" v-if="$attrs.required">*</span>
    </div>
    <v-textarea
      :background-color="
        !noBackground ? ($attrs.disabled ? 'grey' : backgroundColor) : undefined
      "
      :no-resize="noResize"
      hide-details="auto"
      label=""
      flat
      solo
      v-model="inputVal"
      v-bind="$attrs"
      :class="classInput ? classInput : 'rounded-xl'"
      :height="height"
    />
  </v-col>
</template>

<script>
  import { toEnglishNumber } from "@/constants/CustomFunctions/String";
  export default {
    props: {
      value: {
        required: true,
      },
      label: {
        type: String,
        required: false,
      },
      noBackground: {
        type: Boolean,
        default: false,
      },
      backgroundColor: {
        type: String,
        default: "grey lighten-2",
      },
      noResize: {
        type: Boolean,
        default: false,
      },
      classInput: {
        type: String,
        default: "",
      },
      height: {
        type: String,
        default: null,
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
  };
</script>
