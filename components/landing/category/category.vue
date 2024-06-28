<template>
  <div>
    <div class="d-flex align-center justify-space-between mx-6">
      <h3>دسته‌بندی ها</h3>
      <v-btn text color="var(--slime-green)" class="font-weight-bold pa-0 ma-0"
        >مشاهده همه
      </v-btn>
    </div>
    <div v-if="loading" class="d-flex align-center">
      <v-skeleton-loader
        v-for="(item, i) in 3"
        :key="i"
        type="image"
        width="100px"
        height="100px"
        class="mx-1"
      ></v-skeleton-loader>
    </div>
    <viana-swiper
      v-else
      :data="data"
      :sizes="[6, 6, 6, 3, 3, 3]"
      hasPaginate
      fixSpace
      fixSize
      :spaceBetween="10"
      class="pb-14 mt-6 mx-2"
      :loop="false"
    >
      <template #default="{ props }">
        <landing-category-card :item="props.item" />
      </template>
    </viana-swiper>
  </div>
</template>
<script>
  import services from "@/services";
  export default {
    data() {
      return {
        data: [],
        loading: false,
      };
    },
    methods: {
      getCategories() {
        this.loading = true;
        services.category
          .get()
          .then((response) => {
            this.loading = false;
            this.data = response.data.data;
          })
          .catch((error) => {
            this.loading = false;
          });
      },
    },
    mounted() {
      this.getCategories();
    },
  };
</script>
