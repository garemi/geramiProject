<template>
  <div class="mx-6 mt-10">
    <common-sub-header title="آدرس" />

    <!-- <user-cards-location :ischangable="ischangable" /> -->

    <!-- <iframe
      class="w-full h-[400px]"
      src="https://api.neshan.org/v4/static?key=service.80bbae03d0b14812988b12c8d2abd2c6&type=neshan&zoom=12&width=350&height=100&center=35.7033139269425,51.40331221804303&markerToken="
    /> -->

    <!-- <div id="map"> </div> -->
    <v-card class="custom-rounded my-5" elevation="0">
      <v-card-text class="d-flex align-start pa-0">
        <span class="custom-icon">
          <v-icon color="white"> mdi-map-marker-outline </v-icon>
        </span>
        <v-textarea
          color="var(--dark-gray)"
          background-color="#fff"
          elevation="0"
          rounded
          dense
          filled
          hide-details="auto"
          auto-grow
          rows="1"
          class="mx-3 my-2"
          v-model="address"
          width="100%"
          placeholder="آدرس خود را وارد کنید"
          @change="addressChanged"
        >
        </v-textarea>
      </v-card-text>
      <div class="ma-1 pb-1">
        <div
          v-show="loading"
          class="w-full flex justify-center items-center h-[317px]"
        >
          <v-progress-circular indeterminate />
        </div>
        <div v-show="!loading" id="map"> </div>
      </div>
    </v-card>
    <v-btn
      class="rounded-pill"
      color="var(--text-700)"
      outlined
      style="
        position: fixed;
        bottom: 20px;
        background-color: white;
        left: 50%;
        transform: translateX(-50%);
      "
      type="submit"
      width="85%"
      x-large
      @click="updateAddress"
    >
      <v-progress-circular
        v-if="submitLoading"
        color="var(--primary)"
        indeterminate
      />
      ثبت اطلاعات
    </v-btn>
  </div>
</template>
<script>
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";

  export default {
    layout: "users-panel",

    data() {
      return {
        ischangable: true,
        address: null,
        loading: false,
        submitLoading: false,
        lat: null,
        long: null,
      };
    },

    mounted() {
      this.address = this.$store.state.userData.address;
      L.Marker.prototype.options.icon = L.icon({
        iconUrl: require("@/assets/img/location.svg"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      this.map = L.map("map").setView(
        [
          this.$store.state.userData.long || 35.7052,
          this.$store.state.userData.lat || 51.35422,
        ],
        13,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      this.marker = L.marker([
        this.$store.state.userData.long || 35.7052,
        this.$store.state.userData.lat || 51.35422,
      ])
        .addTo(this.map)
        .bindPopup("A sample marker");
    },

    methods: {
      async addressChanged() {
        this.loading = true;
        const res = await this.$axios.$get(
          `https://api.neshan.org/v4/geocoding?address=${this.address}`,
          {
            headers: {
              "Api-Key": "service.6c1c6db18d05416da5b43b817137d02f",
            },
          },
        );
        if (res.location) {
          this.lat = res.location.x;
          this.long = res.location.y;
          this.map.panTo(new L.LatLng(res.location.y, res.location.x));
          this.marker.setLatLng(new L.LatLng(res.location.y, res.location.x));
        } else {
          this.$toast.warning(
            "لطفا از این فرمت استفاده کنید استان + شهر / روستا + میدان + خیابان + کوچه + پلاک",
          );
        }
        this.loading = false;
      },
      async updateAddress() {
        this.submitLoading = true;
        let data = new FormData();
        data.append("lat", this.lat);
        data.append("long", this.long);
        data.append("address", this.address);

        await this.$axios.$post("/users/update", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const res = await this.$axios.$get("/users/dashboard", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.$store.commit("setUserData", res.data.user);
        this.$router.push("/panel");
        this.$toast.success("اطلاعات با موفقیت تغییر پیدا کرد");
        this.submitLoading = false;
      },
    },
  };
</script>
<style>
  .leaflet-control-attribution {
    display: none;
  }
</style>

<style scoped>
  #map {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 1rem;
  }
  .custom-icon {
    width: 35px;
    height: 55px;
    border-bottom-left-radius: 1rem;
    border-top-right-radius: 1rem;
    background-color: var(--medium-gray);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-border {
    border: 2px solid var(--text-400);
    width: 25px;
    height: 25px;
    border-radius: 5px;
    transform: rotate(45deg);
  }
</style>
