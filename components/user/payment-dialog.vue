<template>
  <v-dialog
    v-model="showDialog"
    content-class="align-self-end custom-rounded ma-2 pa-0 !z-[500]"
    max-width="100%"
    persistent
  >
    <v-card class="my-0 mx-0 overflow-hidden">
      <v-card-title class="py-8">
        <h5>افزایش موجودی کیف پول</h5>
        <v-spacer />
        <v-btn
          color="var(--medium-gray)"
          small
          elevation="0"
          style="width: 30px"
          class="rounded-lg"
          @click="showDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <div
        style="overflow-x: auto"
        class="expand-width d-flex align-center mr-4"
      >
        <v-chip
          v-for="(price, index) in prices"
          :key="index"
          class="flex-s0 ml-1"
          outlined
          @click="getPrice(price)"
        >
          {{ new Intl.NumberFormat().format(price) || "-" }}
          تومان
        </v-chip>
      </div>
      <v-card-text class="mx-0">
        <v-card
          class="rounded-lg my-4 d-flex flex-column pa-1"
          elevation="0"
          style="border: 1px solid var(--gray)"
        >
          <p class="md-text text-100"> مبلغ مورد نظر </p>
          <text-price-field
            class="lg-text text-500 py-0"
            dense
            v-model="chargeAmount"
            solo
            flat
            background-color="transparent"
            hide-details="auto"
          >
          </text-price-field>
        </v-card>
        <v-btn dark class="custom-rounded" block @click="charge"
          >افزایش موجودی</v-btn
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import services from "@/services";
  import { getErrorText } from "@/constants/VianaAxios";
  import textPriceField from "../v-form/text-price-field.vue";
  export default {
    components: { textPriceField },
    data() {
      return {
        prices: ["1000000", "1500000", "2000000", "2500000"],
        chargeAmount: "",
      };
    },
    props: {
      value: {
        type: Boolean,
        required: true,
      },
    },
    computed: {
      showDialog: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
    },
    methods: {
      getPrice(price) {
        this.chargeAmount = price;
      },
      async charge() {
        // console.log(this.chargeAmount);
        // if (
        //   parseInt(this.chargeAmount) < 10000 ||
        //   parseInt(this.chargeAmount) >= 1000000000
        // ) {
        const res = await this.$axios.$get(
          `/pay/charge-wallet?amount=${this.chargeAmount}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );
        window.location.href = res.action;
        // let data = new FormData();
        // data.append("price", this.chargeAmount);
        // services.user
        //   .charge(data)
        //   .then((response) => {
        //     this.$toast.info("در حال انتقال به درگاه");
        //     window.open(response.data.action, "_self");
        //   })
        //   .catch((error) => {
        //     this.$toast.error(getErrorText(error));
        //   });
        // } else {
        //   this.$toast.error("مبلغ وارد شده مجاز نیست");
        // }
      },
    },
  };
</script>
<style>
  .v-dialog__content {
    z-index: 500 !important;
  }
</style>
