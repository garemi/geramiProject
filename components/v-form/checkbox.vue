<template>
  <div class="d-flex align-center my-3">
    <div
      class="custom-box"
      :style="
        checked
          ? 'background-color: var(--gray);'
          : 'background-color: transparent;'
      "
    >
      <v-icon v-if="checked" size="15" color="white">mdi-check</v-icon>
    </div>
    <p style="color: var(--text-200)" class="mr-2">{{ label }}</p>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: "",
      },
    },
    computed: {
      checked: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
    },
  };
</script>
<style scoped>
  .custom-box {
    width: 15px;
    height: 15px;
    border-radius: 3px;
    border: 2px solid var(--gray);

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
