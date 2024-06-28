<template>
  <div>
    <span class="d-flex align-center justify-space-between my-3 md-text">
      <p style="color: var(--text-200)">{{ province.name }}</p>
      <v-icon color="var(--text-200)"> mdi-chevron-left</v-icon>
    </span>
    <v-divider class="mx-auto"></v-divider>
  </div>
</template>
<script>
  export default {
    props: {
      province: {
        type: Object,
        required: true,
      },
    },
  };
</script>
