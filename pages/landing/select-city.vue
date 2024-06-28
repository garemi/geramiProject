<template>
  <div class="mt-6">
    <div class="d-flex align-center justify-space-between px-0 mx-4">
      <v-btn
        :ripple="false"
        class="d-flex align-center px-0"
        text
        @click="back"
      >
        <v-icon small>mdi-chevron-right</v-icon>
        <p class="mr-4 lg-text"> انتخاب محل</p>
      </v-btn>
      <span width="15px">
        <v-img :src="require('@/assets/img/find-location-icon.svg')"> </v-img>
      </span>
    </div>
    <div>
      <landing-new-search-bar v-model="searchText" />
    </div>
    <div class="d-flex align-center flex-wrap mx-4">
      <span v-for="(selected, index) in selections" :key="index" class="ma-1">
        <v-chip
          close
          close-icon="mdi-close"
          label
          outlined
          class="md-text"
          @click:close="deleteCity(selected)"
          >{{ selected }}
        </v-chip>
      </span>
    </div>
    <div v-if="loading" class="my-7 text-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else class="mx-4">
      <span v-if="selectCity">
        <landing-new-counties
          v-for="(county, i) in search"
          :key="i"
          :checked="Boolean(selections.find((x) => x == county.name))"
          :county="county"
          :selections="selections"
          @chooseCity="chooseCity"
        />
      </span>
      <span v-else>
        <span
          v-for="(province, i) in search"
          :key="i"
          @click="clicked(province.center)"
        >
          <landing-new-provinces :province="province" />
        </span>
      </span>
    </div>
    <v-btn
      class="btn-gradiant custom-rounded"
      dark
      style="position: fixed; bottom: 15px; left: 15px"
      @click="submit"
    >
      <!-- @click="selectCity ? submit() : locate()" -->
      انتخاب منطقه
    </v-btn>
  </div>
</template>
<script>
  import services from "@/services";

  export default {
    layout: "empty",
    data() {
      return {
        searchText: "",
        provinces: [],
        loading: false,
        selectCity: false,
        counties: [],

        selections: [],
        countyIds: [],
        removed: false,
      };
    },
    created() {
      const storedItem = localStorage.getItem("selections");
      const countyIds = localStorage.getItem("countyIds");
      this.selections = JSON.parse(storedItem) || [];
      this.countyIds = JSON.parse(countyIds) || [];
    },
    methods: {
      async getProvinces() {
        try {
          if (!this.loading) this.loading = true;
          const response = await this.$axios.$get(
            "https://iran-locations-api.ir/api/v1/fa/states",
          );
          this.provinces = response;
          this.loading = false;
        } catch (error) {
          this.loading = false;
        }
      },
      clicked(id) {
        this.selectCity = true;
        this.searchText = "";
        this.getCounties(id);
      },
      async getCounties(id) {
        try {
          if (!this.loading) this.loading = true;

          const response = await this.$axios.$get(
            `https://iran-locations-api.ir/api/v1/fa/cities?state=${id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            },
          );
          this.counties = response[0].cities;
          this.loading = false;
        } catch (error) {
          this.loading = false;
        }
      },

      back() {
        if (this.selectCity) {
          this.selectCity = false;
        } else {
          this.$router.push("/");
        }
      },
      chooseCity(county) {
        if (!this.selections.find((x) => x == county.name)) {
          this.selections.push(county.name);
          this.countyIds.push(county.id);
        } else {
          let index = this.selections.findIndex((x) => x === county.name);
          if (index !== -1) {
            this.selections.splice(index, 1);
            this.countyIds.splice(index, 1);
          }
        }
      },
      async submit() {
        try {
          if (!this.loading) this.loading = true;

          // const response = await services.user.syncCounty(
          //   JSON.stringify(this.countyIds),
          // );
          localStorage.setItem("selections", JSON.stringify(this.selections));
          localStorage.setItem("countyIds", JSON.stringify(this.countyIds));
          this.selectCity = false;
          this.loading = false;
          this.$router.push("/");
        } catch (error) {
          console.log("select city error", error);
          this.loading = false;
        }
      },
      deleteCity(deleted) {
        this.selections.splice(this.selections.indexOf(deleted), 1);
        this.countyIds.splice(this.countyIds.indexOf(deleted), 1);
        this.selections = [...this.selections];
      },
    },
    mounted() {
      this.getProvinces();
    },
    computed: {
      search() {
        if (this.searchText) {
          if (!this.selectCity) {
            return this.provinces.filter((item) => {
              const filteredItems = item?.name.includes(this.searchText);
              return filteredItems;
            });
          } else {
            return this.counties.filter((item) => {
              const filteredItems = item?.name.includes(this.searchText);
              return filteredItems;
            });
          }
        } else {
          if (!this.selectCity) {
            return this.provinces;
          } else {
            return this.counties;
          }
        }
      },
    },
  };
</script>
<style scoped>
  .btn-gradiant {
    background-image: linear-gradient(
      to right,
      var(--text-600),
      var(--text-200)
    );
  }
</style>
