<template>
  <v-skeleton-loader
    v-if="loading"
    type="image"
    width="100%"
    height="15%"
    class="my-4"
  ></v-skeleton-loader>
  <v-row no-gutters class="my-2 align-center" v-else>
    <v-col cols="2" sm="1">
      <v-avatar v-if="item.model.user" size="45">
        <v-img :src="item.model.user.image" contain />
      </v-avatar>
      <v-img v-else src="/icon.png" class="!w-11" contain />
    </v-col>
    <v-col cols="7" sm="10" class="px-1">
      <small class="text-500">
        <!-- <span class="font-weight-bold"> نرگس امامی</span> -->
        {{ item.content }}
      </small>
    </v-col>
    <v-col cols="3" sm="1">
      <div v-if="item.model.user" class="flex justify-end">
        <button
          class="text-xs rounded-full py-1.5 px-4"
          @click="$router.push(`/property/details/${item.model.id}`)"
          style="color: #908d85; border: 1px #908d85 solid"
          >پاسخ</button
        >
      </div>
      <div v-else class="flex justify-end">
        <button
          class="text-xs rounded-full py-1.5 px-4"
          style="color: #908d85; border: 1px #908d85 solid"
          @click="$router.push('/panel/transactions')"
          >مشاهده</button
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: {},
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style></style>
