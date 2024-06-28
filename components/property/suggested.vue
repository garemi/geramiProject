<template>
  <v-card
    class="rounded-xl"
    elevation="0"
    @click="$router.push('/property/details/' + item.id)"
  >
    <v-card-text>
      <div class="d-flex align-center mx-2">
        <v-avatar class="my-2" size="40">
          <v-img :src="item?.user?.image" />
        </v-avatar>
        <div class="mx-1">
          <h4>{{ item?.user?.first_name + " " + item?.user?.last_name }}</h4>
          <div v-if="item.county?.name" class="d-flex-align0center">
            <v-icon color="black" small>mdi- mdi-map-marker-outline</v-icon>
            <span class="sm-text">{{ item.user?.shop_country }}</span>
          </div>
        </div>
      </div>
      <v-img
        :src="item?.images[0]"
        class="rounded-xl my-3"
        width="100%"
        :aspect-ratio="1 / 1"
      ></v-img>
      <div class="mx-1">
        <p
          :class="screen == 320 ? 'sm-text' : 'md-text'"
          class="gray-text font-weight-500 text-right"
        >
          {{ item?.title }}
        </p>
        <span class="d-flex align-center">
          <v-icon color="black" small>mdi-alert-circle-outline </v-icon>
          <p
            :class="screen == 320 ? 'sm-text' : 'md-text'"
            class="font-weight-bold mr-1"
          >
            {{
              new Intl.NumberFormat().format(
                item?.online_value || item?.price,
              ) || "-"
            }}
            <span class="xs-text gray-text">تومان</span>
          </p>
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {};
    },
  };
</script>
