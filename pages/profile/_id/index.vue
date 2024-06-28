<template>
  <div class="pb-20">
    <small> آدرس </small>
    <p v-if="nuxtChildKey?.address" class="border p-2 !rounded-xl border-black">
      {{ nuxtChildKey?.address }}
    </p>
    <div class="ma-1 pb-1">
      <div id="map"> </div>
    </div>
  </div>
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";

  export default {
    layout: "global-profile",
    props: {
      nuxtChildKey: {
        type: Object,
      },
    },
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
  };
</script>

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
