<template>
  <div class="mx-2 d-flex flex-column justify-space-between expand-height py-1">
    <div class="d-flex flex-column align-start">
      <h3>{{ item.title }}</h3>
      <p class="font-weight-bold md-text">
        {{ new Intl.NumberFormat().format(item.price) || "-" }}
        <span>تومان</span>
      </p>
      <v-chip x-small color="var(--light-cream)">
        <v-icon size="15" color="var(--dark-cream)">mdi-map-marker</v-icon>
        <span class="font-weight-bold">ولنجک</span>
      </v-chip>
    </div>

    <div class="d-flex align-center">
      <v-avatar size="20">
        <v-img :src="require('@/assets/img/default.jpg')"></v-img>
      </v-avatar>
      <p class="pr-1 md-text font-weight-bold text-no-wrap">حسین محمدی</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  };
</script>
