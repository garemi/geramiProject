<template>
  <v-form ref="form">
    <v-card class="custom-rounded my-5" elevation="0">
      <v-card-text class="d-flex align-start pa-0">
       
        <v-btn
          icon
          @click="getUserLocation"
          class="ma-1"
          style="min-width: 40px; margin-top: 20px;"
        >
          <v-icon color="var(--text-700)">mdi-crosshairs-gps</v-icon>
        </v-btn>
        <v-textarea
          v-if="ischangable"
          v-model="address"
          placeholder="آدرس خود را وارد کنید"
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
          width="100%"
          @input="updateMapLocationFromAddress"
        ></v-textarea>
        <p v-else class="pa-1">
          استان تهران ، تهران، آزادی، بلوار تیموری ، خیابان حبیب زادگان ، بن بست
          فاطمی، پلاک 12
        </p>
      </v-card-text>
    
      <div class="ma-1 pb-1">
        <div id="map"></div>
      </div>
    </v-card>
    <v-row no-gutters v-if="ischangable" class="mt-5">
      <v-col :cols="level ? '12' : '6'">
        <v-text-field
          v-model="form.postcode"
          label="کد پستی"
          color="var(--gray)"
          background-color="#fff"
          elevation="0"
          solo
          hide-details="auto"
          :rules="[rules.required]"
          class="mx-1 py-0 my-0 md-text"
          flat
        ></v-text-field>
      </v-col>
    </v-row>
    <v-col v-if="ischangable" cols="12">
      <v-btn
        outlined
        color="var(--text-700)"
        class="custom-rounded mt-8 mb-3 mx-auto bottom-btn-style"
        @click="auth ? setPostal() : saveAddress()"
        :disabled="!isPostalCodeFilled"
      >
        ذخیره
      </v-btn>
    </v-col>
  </v-form>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

import { rules } from "@/constants/VuetifyRules.js";

export default {
  data() {
    return {
      rules,
      address: "",
      form: {
        postcode: "",
        longitude: "",
        latitude: "",
      },
      map: null,
      marker: null,
    };
  },
  props: {
    ischangable: {
      type: Boolean,
      default: false,
    },
    level: {
      type: Number,
      required: false,
    },
    auth: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: require("@/assets/img/location.svg"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    this.initializeMap();
  },
  computed: {
    isPostalCodeFilled() {
      return !!this.form.postcode;
    },
  },
  methods: {
    initializeMap() {
      this.map = L.map("map", {
        key: "service.1d53f4e5b6124c839c438413e3e0c56a",
        maptype: "neshan",
        poi: true,
        traffic: true,
        center: [35.699756, 51.338076],
        zoom: 14,
      }).setView([35.7052, 51.35422], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      this.marker = L.marker([35.699756, 51.338076], {
        draggable: true,
      }).addTo(this.map);

      this.marker.on("dragend", this.updateAddress);
    },
    updateAddress(event) {
      const marker = event.target;
      const position = marker.getLatLng();
      this.form.latitude = position.lat;
      this.form.longitude = position.lng;
      this.updateMapLocation();
    },
    updateMapLocation() {
      axios
        .get(
          `https://api.neshan.org/v4/reverse?lat=${this.form.latitude}&lng=${this.form.longitude}`,
          {
            headers: {
              "Api-Key": "service.e729c458e48745388fc3ddef0068f465",
            },
          }
        )
        .then((response) => {
          const formattedAddress = response.data.formatted_address;
          this.address = formattedAddress;
          console.log("Address updated to:", this.address);
          console.log("location :" , this.form.latitude , this.form.longitude)
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
          this.$toast.error("مشکلی در بازیابی موقعیت پیش آمده است");
        });
    },
    updateMapLocationFromAddress() {
      axios
        .get(
          `https://api.neshan.org/v4/geocoding?address=${this.address}`,
          {
            headers: {
              "Api-Key": "service.91eb671c747d4316a0adeaa2c0301087",
            },
          }
        )
        .then((response) => {
          if (response.data && response.data.location) {
            const location = response.data.location;
            if (location.y && location.x) {
              this.form.latitude = location.y;
              this.form.longitude = location.x;
              this.marker.setLatLng([location.y, location.x]);
              this.map.setView([location.y, location.x], 14);
              console.log("Map location updated to:", this.form.latitude, this.form.longitude);
            } else {
              console.error("Invalid location data:", location);
              this.$toast.error("اطلاعات موقعیت معتبر نیست");
            }
          } else {
            console.error("Invalid response data:", response.data);
            
          }
        })
        .catch((error) => {
          console.error("Error fetching location from address:", error);
          this.$toast.error("مشکلی در بازیابی موقعیت پیش آمده است");
        });
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.latitude = position.coords.latitude;
            this.form.longitude = position.coords.longitude;
            this.marker.setLatLng([position.coords.latitude, position.coords.longitude]);
            this.map.setView([position.coords.latitude, position.coords.longitude], 14);
            this.updateMapLocation();
          },
          (error) => {
            console.error("Error getting user location:", error);
            this.$toast.error("مشکلی در دریافت موقعیت فعلی پیش آمده است");
          }
        );
      } else {
        this.$toast.error("مرورگر شما از امکانات موقعیت مکانی پشتیبانی نمی‌کند.");
      }
    },
    saveAddress() {
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("postal_code", this.form.postcode);
        data.append("latitude", this.form.latitude);
        data.append("longitude", this.form.longitude);

        console.log("Data to be sent:", {
          address: this.address,
          postal_code: this.form.postcode,
          latitude: this.form.latitude,
          longitude: this.form.longitude,
        });

       

        this.loading = true;

        // services.user
        //   .update(data)
        //   .then((response) => {
        //     console.log("Address update response:", response);
        //     this.$store.commit("updateUser", {
        //       postal_code: this.postcode,
        //       latitude: this.form.latitude,
        //       longitude: this.form.longitude,
        //     });
        //     if (!this.level) {
        //       this.$router.replace("/panel");
        //     }
        //   })
        //   .catch((error) => {
        //     console.error("Error updating user:", error);
        //     this.$toast.error("مشکلی پیش آمده است لطفا دوباره امتحان کنید");
        //   })
        //   .finally(() => {
        //     this.loading = false;
        //   });
      } else {
        console.log("Form validation failed");
      }
    },
    async setPostal() {
      console.log(this.form.postcode);
      this.$emit("increamentLevel", this.form);
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 300px;
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
