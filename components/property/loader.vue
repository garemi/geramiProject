<template>
  <v-row no-gutters>
    <v-col cols="12">
      <viana-swiper
        :autoplayEnabled="true"
        :data="Array(5)"
        :loop="false"
        :sizes="[1, 1, 1, 1]"
        class="pb-3 style-swiper skelet-height"
        dark
        hasPaginate
      >
        <template #default>
          <v-skeleton-loader type="image" width="100vw"></v-skeleton-loader>
        </template>
      </viana-swiper>
    </v-col>
    <v-col class="d-flex justify-space-between align-center" cols="12">
      <div class="d-flex align-center">
        <v-skeleton-loader
          aspect-ratio="1 /1"
          class="rounded-lg position-relative mx-2"
          height="50px"
          type="image"
          width="50px"
        >
        </v-skeleton-loader>
        <div>
          <v-skeleton-loader type="text" width="100px"></v-skeleton-loader>
          <v-skeleton-loader type="text" width="50px"></v-skeleton-loader>
        </div>
      </div>
      <v-skeleton-loader class="mx-2" height="10px" type="image" width="50px">
      </v-skeleton-loader>
    </v-col>
    <v-col class="d-flex justify-space-between align-center my-4" cols="12">
      <v-skeleton-loader class="mx-2" height="13px" type="image" width="90px">
      </v-skeleton-loader>
      <div class="d-flex align-center mx-2">
        <v-skeleton-loader class="rounded-pill mx-1" type="chip">
        </v-skeleton-loader>
        <v-skeleton-loader
          class="rounded-circle mx-auto"
          height="50px"
          type="avatar"
          width="50px"
        >
        </v-skeleton-loader>
      </div>
    </v-col>

    <v-col class="d-flex justify-center" cols="12">
      <div class="mx-1">
        <v-skeleton-loader
          class="my-2 mx-auto"
          height="15px"
          type="image"
          width="70px"
        >
        </v-skeleton-loader>

        <v-skeleton-loader
          class="mx-auto"
          height="10px"
          type="image"
          width="50px"
        >
        </v-skeleton-loader>
      </div>
      <div class="mx-1">
        <v-skeleton-loader
          class="my-2 mx-auto"
          height="15px"
          type="image"
          width="70px"
        >
        </v-skeleton-loader>

        <v-skeleton-loader
          class="mx-auto"
          height="10px"
          type="image"
          width="50px"
        >
        </v-skeleton-loader>
      </div>
    </v-col>

    <v-col cols="12">
      <v-skeleton-loader class="mx-2 my-6" type="paragraph">
      </v-skeleton-loader>
    </v-col>

    <v-col class="d-flex align-end flex-row position-relative my-2" cols="12">
      <v-skeleton-loader size="38" type="avatar"></v-skeleton-loader>
      <v-skeleton-loader
        class="chat-div position-relative rounded-xl mr-4"
        type="image"
      >
      </v-skeleton-loader>
    </v-col>
    <v-col cols="12">
      <viana-swiper
        :autoplayEnabled="true"
        :data="Array(5)"
        :loop="false"
        :sizes="[5, 5, 5, 5, 2, 2]"
        class="px-4 mx-2 mt-5 skelet-height"
        dark
      >
        <template #default>
          <v-skeleton-loader type="image" width="42vw"></v-skeleton-loader>
        </template>
      </viana-swiper>
    </v-col>
    <v-col class="d-flex justify-center align-center mt-8 mb-4" cols="12">
      <div class="d-flex justify-center">
        <v-skeleton-loader class="rounded-pill mx-8" type="chip">
        </v-skeleton-loader>
      </div>
      <div class="d-flex justify-center">
        <v-skeleton-loader class="rounded-pill mx-8" type="chip">
        </v-skeleton-loader>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        required: false,
      },
    },
  };
</script>

<style scoped>
  .chat-div {
    width: 100%;
    min-height: 50px;
  }
</style>

<style lang="scss">
  .skelet-height {
    .v-skeleton-loader__image {
      height: 312px;
      border-radius: 0;
    }
  }
</style>
