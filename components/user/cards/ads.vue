<template>
  <v-card
    class="custom-rounded mt-2"
    elevation="0"
    @click="openRoute('/property/details/' + item?.id)"
  >
    <v-card-text class="pa-1 py-1">
      <div class="d-flex align-center justify-start">
        <v-avatar class="ml-1" size="35">
          <v-img :src="item?.user?.image" :aspect-ratio="1 / 1"></v-img>
        </v-avatar>
        <span class="d-flex flex-column align-start justify-center py-1">
          <span
            :class="screen == 320 ? 'sm-text' : 'md-text'"
            class="font-weight-bold text-no-wrap"
          >
            {{
              item?.user?.shop_name ||
              (item?.user?.first_name && item?.user?.last_name)
                ? item?.user?.first_name + " " + item?.user?.last_name
                : "کاربر گرمی"
            }}
          </span>
          <span
            v-if="item?.user?.shop_address || item?.user?.address"
            class="d-flex align-center justify-start"
          >
            <v-icon x-small>mdi-map-marker-outline</v-icon>
            <span class="sm-text"
              >{{ item?.user?.shop_address || item?.user?.address }}
            </span>
          </span>
        </span>
      </div>
      <div class="position-relative">
        <v-img
          v-if="item?.images?.length"
          :src="item?.images[0]"
          class="custom-rounded"
          width="100%"
          :aspect-ratio="1 / 1"
        ></v-img>
        <v-img
          v-else
          src="./blog.png"
          class="custom-rounded"
          width="100%"
          :aspect-ratio="1 / 1"
        ></v-img>
        <div
          class="d-flex justify-space-between align-center pa-1 custom-box rounded-xl"
        >
          <span class="d-flex align-center">
            <v-icon color="white" x-small>mdi-account</v-icon>
            <p class="sm-text">{{ item?.comments_count }} نظر</p>
          </span>
          <span class="d-flex align-center">
            <p class="sm-text ml-1">{{ item?.rate }}</p>
            <div class="star-icon-bg">
              <v-icon color="white" small>mdi-star</v-icon>
            </div>
          </span>
        </div>
      </div>

      <div class="mt-6 mx-1">
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
                item?.price || item?.primitive_online_value,
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
    computed: {
      screen() {
        return this.$vuetify.breakpoint.width;
      },
    },
    props: {
      item: {
        type: Object,
      },
    },
    methods: {
      openRoute(path) {
        this.$router.push({ path: path });
      },
    },
  };
</script>
<style scoped>
  .custom-box {
    background-color: var(--goldy-brown);
    width: 90%;
    color: white;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -12px;
  }

  .star-icon-bg {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--dark-goldy-brown);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
