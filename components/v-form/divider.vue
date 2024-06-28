<template>
  <div class="d-flex align-center my-4">
    <div class="divider" />
    <h4 class="black--text mx-2">{{ title }}</h4>
    <div class="divider" />
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .divider {
    height: 0.1rem;
    flex: 1;
    border-radius: 0.125rem;
    background-color: #999;
  }
</style>
