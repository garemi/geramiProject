<template>
  <v-col :cols="12" class="pa-2">
    <div class="grey--text text-right" :class="{ 'text-center': centerText }">
      {{ label }}
      <span class="error--text" v-if="required">*</span>
    </div>
    <v-text-field
      :background-color="$attrs.disabled ? 'grey' : backgroundColor"
      solo
      hide-details="auto"
      flat
      class="rounded-pill"
      :maxlength="maxlength"
      v-model="inputVal"
      v-bind="$attrs"
      label=""
    />
  </v-col>
</template>

<script>
  import {
    filterNumber,
    toEnglishNumber,
  } from "@/constants/CustomFunctions/String";

  export default {
    props: {
      value: {
        required: true,
      },
      required: {
        required: false,
        default: false,
      },
      label: {
        type: String,
        required: false,
      },
      centerText: {
        type: Boolean,
        default: false,
      },
      maxlength: {
        type: Number,
        default: 16,
      },
      backgroundColor: {
        type: String,
        default: "grey lighten-2",
      },
    },
    computed: {
      inputVal: {
        get() {
          return filterNumber(this.value);
        },
        set(val) {
          this.$emit("input", toEnglishNumber(val?.trim().split(",").join("")));
        },
      },
    },
  };
</script>

<style></style>
