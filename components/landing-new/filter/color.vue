<template>
  <span class="d-flex align-center" @click="clicked()">
    <v-form-checkbox v-model="checked" />
    <span
      v-if="attr?.code"
      class="color-sample"
      :style="{ 'background-color': attr?.code }"
    ></span>
    <p style="color: var(--text-200)" class="md-text mr-1">
      {{ attr?.attribute_value }}
    </p>
  </span>
</template>
<script>
  export default {
    data() {
      return {
        checked: false,
      };
    },

    methods: {
      clicked(id) {
        this.checked = !this.checked;
      },
    },
    props: {
      attr: {
        type: Object,
        required: true,
      },
    },
  };
</script>
<style scoped>
  .color-sample {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
</style>
