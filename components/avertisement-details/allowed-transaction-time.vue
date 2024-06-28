<template>
  <div class="rounded-pill nescafe-bg width-height px-3 py-1">
    <div class="d-flex flex-column justify-space-between expand-height">
      <div>
        <h3 class="font-weight-bold black--text mt-1 text-center">
          {{ remainingTime.days }}
        </h3>
        <h6 class="black--text sm-text mt-n2 mb-3 text-center">روز</h6>
      </div>
      <div>
        <h3 class="font-weight-bold black--text mt-1 text-center">
          {{ remainingTime.hours }}
        </h3>
        <h6 class="black--text sm-text mt-n2 mb-3 text-center">ساعت</h6>
      </div>
      <div>
        <h3 class="font-weight-bold black--text mt-1 text-center">
          {{ remainingTime.minutes }}
        </h3>
        <h6 class="black--text sm-text mt-n2 mb-3 text-center">دقیقه</h6>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // inject: ["targetTime"],
    inject: {
      targetTime: {
        default: null,
      },
    },
    data() {
      return {
        remainingTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
      };
    },

    methods: {
      calculateTime() {
        const currentDate = new Date().getTime();

        const timeDifference = +this.formattedTargetDate - +currentDate;

        this.remainingTime.days = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24),
        );
        this.remainingTime.hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        this.remainingTime.minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
        );
        this.remainingTime.seconds = Math.floor(
          (timeDifference % (1000 * 60)) / 1000,
        );
      },
    },
    mounted() {
      this.calculateTime();
    },

    watch: {
      targetTime: {
        handler() {
          this.calculateTime();
        },
        immediate: true,
      },
    },

    computed: {
      formattedTargetDate() {
        const targetDate = new Date(this.targetTime).getTime();
        return targetDate;
      },
    },
  };
</script>

<style scoped>
  .width-height {
    width: fit-content;
  }
</style>
