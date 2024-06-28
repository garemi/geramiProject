<template>
  <div
    class="d-flex flex-column justify-space-between"
    style="height: 100%; background-color: var(--background)"
  >
    <v-row
      v-for="(item, i) in introDetails"
      v-show="stepIntro == i"
      :key="i"
      justify="center"
    >
      <v-col class="justify-center text-center" cols="11">
        <v-img :src="item.img" contain height="45vh"></v-img>
      </v-col>
      <v-col class="mt-6" cols="11">
        <h3
          class="intro-dark-gray custom-text-500 font-weight-bold text-center my-2"
        >
          {{ item.title }}
        </h3>
        <p class="text-center">{{ item.desc }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="d-flex justify-space-around" cols="12">
        <v-btn
          v-if="stepIntro > 0"
          class="mx-5"
          color="black"
          large
          outlined
          rounded
          @click="minusStepIntro"
        >
          قبلی
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-5"
          color="black"
          dark
          large
          outlined
          rounded
          @click="plusStepIntro"
        >
          {{ stepIntro === 2 ? "شروع کن" : "بعدی" }}
        </v-btn>
      </v-col>
      <v-col class="d-flex justify-space-around" cols="12">
        <v-btn
          block
          class="border-top"
          color="black"
          large
          plain
          @click="$emit('closeIntro')"
        >
          نمیخواهم ببینم
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stepIntro: 0,
        introDetails: [
          {
            step: 1,
            img: require("@/assets/img/intro1.svg"),
            title: "راحت خرید و فروش کن",
            desc: "با گرمی، راحت میتونی هم طلایی که داری رو بفروشی و هم از کسی که میخوای طلا بخری. تازه مبادله کالا به کالا هم میتونی انجام بدی",
          },
          {
            step: 2,
            img: require("@/assets/img/intro2.svg"),
            title: "واسطه رو حذف کن",
            desc: "با گرمی،‌ میتونی به صورت مستقیم با فروشنده یا خریدار ارتباط برقرار کنی، صحبت داشته باشی و معاملت رو انجام بدی.",
          },
          {
            step: 3,
            img: require("@/assets/img/intro3.svg"),
            title: "بهینه معامله کن",
            desc: "در گرمی، با ابزاری که ما در اختیارت قرار میدیم،‌میتونی راحت معامله کنی و از فرصت هایی که پیش میاد بهتر استفاده کنی.",
          },
        ],
      };
    },

    methods: {
      plusStepIntro() {
        if (this.stepIntro + 1 == this.introDetails.length) {
          this.$emit("closeIntro");
        } else this.stepIntro += 1;
      },
      minusStepIntro() {
        if (this.stepIntro > 0) {
          this.stepIntro -= 1;
        }
      },
    },
  };
</script>

<style scoped></style>

<style lang="scss">
  .border-top {
    border-top: 1px solid #d9d9d9;
  }
</style>
