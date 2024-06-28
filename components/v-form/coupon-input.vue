<template>
  <v-row>
    <v-col :cols="12" class="py-0">
      <div
        :class="[{ 'text-center': centerText }, { 'text-right': rightText }]"
        class="primary-text text-right mr-2 mb-n2"
      >
        {{ label }}
      </div>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" sm="8">
          <v-text-field
            :background-color="$attrs.disabled ? 'grey' : 'grey lighten-2'"
            solo
            hide-details="auto"
            flat
            rounded
            :height="height"
            class="rounded-pill text-center d-flex align-center"
            v-model="inputVal"
            v-bind="$attrs"
            label=""
            :disabled="initDisable || disable"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="4" class="mr-md-n3 py-3 d-flex align-center">
          <v-btn
            :color="disable ? 'var(--dark-gray)' : 'var(--primary)'"
            class="rounded-pill white--text"
            :loading="loading"
            @click="onSubmitCoupon"
            block
            :height="height"
            elevation="0"
            :disabled="initDisable || disable"
          >
            اعمال کد تخفیف
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  import { Constants, getErrorText } from "@/constants/GlobalConstants";
  import MyAxios from "@/constants/VianaAxios";
  import services from "@/services";

  export default {
    name: "VCouponInput",
    props: {
      value: {
        required: true,
      },
      centerText: {
        type: Boolean,
        default: false,
      },
      rightText: {
        type: Boolean,
        default: true,
      },
      height: {
        type: String,
        default: null,
      },
      label: {
        type: String,
        required: false,
      },
      inputType: {
        type: String,
        default: "input",
      },
      initDisable: {
        type: Boolean,
        default: false,
      },
      modelType: {
        type: String,
        default: undefined,
      },
    },

    computed: {
      inputVal: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        },
      },
    },
    data() {
      return {
        loading: false,
        coupon: {},
        disable: false,
      };
    },
    methods: {
      onSubmitCoupon() {
        if (!this.loading) this.loading = true;
        let data = new FormData();
        services.coupon
          .check(this.inputVal, { model_type: this.modelType })
          .then((response) => {
            this.loading = false;
            this.$emit("setCoupon", this.inputVal, response.data);
            this.$toast.success("کد تخفیف شما با موفقیت اعمال شد");
            this.disable = true;
          })
          .catch((error) => {
            console.log("coupons error", error);
            this.loading = false;
            this.$toast.error("کد تخفیف نا معتبر است");
          });
      },
    },
  };
</script>

<style scoped>
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
</style>
