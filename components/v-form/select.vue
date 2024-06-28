<template>
  <v-col :cols="12" class="pa-2">
    <div class="grey--text text-right">
      {{ label }}
      <span class="error--text" v-if="$attrs.required">*</span>
    </div>
    <v-select
      :background-color="$attrs.disabled ? 'grey' : 'grey lighten-2'"
      solo
      hide-details="auto"
      flat
      class="rounded-lg"
      v-model="inputVal"
      v-bind="$attrs"
    />
  </v-col>
</template>

<script>
  export default {
    props: {
      value: {
        required: true,
      },
      label: {
        type: String,
        required: false,
      },
    },
    computed: {
      inputVal: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        },
      },
    },
  };
</script>

<style></style>
