<template>
  <div ref="main" class="overflow-visible default-main relative">
    <help-center />
    <div class="px-4 mx-0 position-relative">
      <div class="d-flex align-center pt-7">
        <v-btn
          :ripple="false"
          class="d-flex align-center px-0"
          plain
          to="landing/select-city"
        >
          <v-avatar color="#908D85" size="32">
            <span
              class="d-flex align-center justify-center"
              style="width: 15px"
            >
              <v-img
                :src="require('@/assets/img/Location-Icon.svg')"
                width="15px"
              ></v-img>
            </span>
          </v-avatar>
          <p class="text-100 mr-2 md-text">
            {{
              selectedCities.length > 1
                ? `${selectedCities.length} شهر`
                : selectedCities.length == 1
                ? selectedCities[0]
                : "انتخاب شهر"
            }}
          </p>
        </v-btn>

        <v-spacer />

        <div class="d-flex" @click="$router.push('chat')">
          <v-badge color="red" dot overlap>
            <v-img :src="require('@/assets/img/Group_1.svg')"></v-img>
          </v-badge>
        </div>
      </div>
    </div>
    <viana-swiper
      :data="bestSellers.data"
      :loop="false"
      :sizes="[1, 1, 1, 1, 1, 1]"
      :spaceBetween="10"
      class="pt-6 px-8 overflow-y-auto"
      fixSize
      fixSpace
    >
      <template #default="{ props }">
        <nuxt-link to="/best-sellers">
          <landing-new-seller-card :item="props.item" class="mb-10" />
        </nuxt-link>
      </template>
    </viana-swiper>
    <div>
      <landing-new-search-bar :withIcon="withIcon" />
    </div>
    <div>
      <landing-new-tabs :categories="categories" @tabClicked="tabClicked" />
    </div>
    <div class="mb-15">
      <v-row v-if="loading" class="mt-7" no-gutters>
        <v-col v-for="i in 5" :key="i" class="pa-2" cols="6">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else no-gutters>
        <v-col v-if="items.length == 0" cols="12">
          <no-item class="mt-5" />
        </v-col>

        <v-col
          v-for="(item, index) in posts.data"
          :key="index"
          class="pa-2 d-flex"
          cols="6"
        >
          <user-cards-ads :item="item" class="flex-1" />
        </v-col>
      </v-row>
    </div>
    <!-- <a
      referrerpolicy="origin"
      target="_blank"
      href="https://trustseal.enamad.ir/?id=486916&Code=pryXKTgX58UEWAr90xK5GvpnZ5JrjK8B"
      ><img
        referrerpolicy="origin"
        src="https://trustseal.enamad.ir/logo.aspx?id=486916&Code=pryXKTgX58UEWAr90xK5GvpnZ5JrjK8B"
        alt=""
        style="cursor: pointer"
        Code="pryXKTgX58UEWAr90xK5GvpnZ5JrjK8B"
    /></a> -->
    <user-bottom-navigation />
  </div>
</template>

<script>
  import services from "@/services";

  export default {
    layout: "default",

    data() {
      return {
        items: {},
        loading: false,
        withIcon: true,
        categories: [],
      };
    },
    computed: {
      screen() {
        return this.$vuetify.breakpoint.width;
      },
      selectedCities() {
        try {
          const selectedCities = localStorage.getItem("selections") || "[]";
          return JSON.parse(selectedCities);
        } catch (error) {
          return [];
        }
      },
      selectedCityIds() {
        try {
          const selectedCityIds = localStorage.getItem("countyIds") || "[]";
          return JSON.parse(selectedCityIds);
        } catch (error) {
          return [];
        }
      },
    },
    async asyncData({ $axios, route }) {
      const bestSellers = await $axios.$get("/trades/best?limit=5", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const posts = await $axios.$get(`/posts${route.fullPath.split("/")[1]}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return { bestSellers, posts };
    },
    methods: {
      async getProperties(category_id) {
        try {
          if (!this.loading) this.loading = true;
          const response = await services.property.get(null, {
            category_id,
            with: ["createby", "reviews", "image", "county"],
            cities: this.selectedCityIds.length
              ? this.selectedCityIds
              : undefined,
          });
          this.items = response.data.data;
          this.loading = false;
        } catch (error) {
          this.loading = false;
        }
      },
      async getCategories() {
        try {
          if (!this.loading) this.loading = true;
          const response = await services.category.get();
          this.categories = response.data.data;

          this.getProperties(response?.data?.data[0]?.id);
        } catch (error) {}
      },
      tabClicked(id) {
        // this.getProperties(id);
      },
    },
    mounted() {
      if (!this.$store.state?.userData) {
        this.$router.push("/login");
        return;
      }
      // this.getCategories();
    },
  };
</script>
<style scoped>
  .default-main {
    height: 100%;
    background-color: var(--background);
  }
</style>
