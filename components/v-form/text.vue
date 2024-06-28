<template>
  <v-col :cols="12" class="pa-2">
    <div :class="['purple-text', { 'text-center': centerText }]">
      <!-- class="grey--text text-right" -->
      {{ label }}
      <span class="error--text" v-if="$attrs.required">*</span>
    </div>
  </v-col>
</template>

<script>
  export default {
    props: {
      centerText: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        required: false,
      },
    },
  };
</script>

<style></style>
