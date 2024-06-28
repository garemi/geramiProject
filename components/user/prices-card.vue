<template>
  <v-card
    class="expand-width custom-rounded !pl-4"
    elevation="0"
    :style="
      isTopest
        ? 'background-color: rgba(255, 0, 0, 0.04)'
        : proposal?.user?.id == $store.state.userData?.id
        ? 'background-color: var(--medium-gray)'
        : ' background-color:#fff'
    "
  >
    <v-card-text class="pa-2 d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-avatar class="custom-rounded ml-2">
          <v-img :src="require('@/assets/img/default.jpg')"></v-img>
        </v-avatar>
        <span>
          <p
            v-if="proposal?.user?.id == $store.state.userData?.id"
            class="gray-text font-weight-bold"
            :class="screen == 320 ? 'sm-text' : 'md-text'"
            >پیشنهاد من
          </p>
          <p
            class="font-weight-bold"
            :class="screen == 320 ? 'sm-text' : 'md-text'"
          >
            {{ new Intl.NumberFormat().format(proposal.price) || "-" }}
            <span :class="screen == 320 ? 'sm-text' : 'md-text'">ت</span>
          </p>
        </span>
      </div>
      <div
        class="d-flex align-center mr-5"
        style="line-height: 10px"
        v-if="remainingTime"
      >
        <span class="mx-1">
          <p :class="screen == 320 ? 'sm-text' : 'md-text'">
            {{ seconds }}
            <span class="lg-text mr-1">:</span>
          </p>
          <span class="gray-text xs-text">ثانیه</span>
        </span>

        <span class="mx-1">
          <p :class="screen == 320 ? 'sm-text' : 'md-text'">
            {{ minutes }}
            <span class="lg-text mr-1">:</span>
          </p>

          <span class="gray-text xs-text">دقیقه</span>
        </span>

        <span class="mx-1 text-center">
          <p :class="screen == 320 ? 'sm-text' : 'md-text'">
            {{ hours }}
          </p>
          <span class="gray-text xs-text pt-2">ساعت</span>
        </span>
      </div>
      <v-chip v-else x-small color="red" dark>منقضی شده</v-chip>
      <v-icon v-if="proposal?.user?.id == $store.state.userData?.id"
        >mdi-dots-vertical</v-icon
      >
      <div v-else>
        <v-img :src="require('@/assets/img/Group_1.svg')"></v-img>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        remainingTime: null,

        intervalId: null,
      };
    },
    computed: {
      screen() {
        return this.$vuetify.breakpoint.width;
      },
      endTime() {
        const targetDate = new Date(this.proposal?.deadline_until).getTime();
        if (targetDate > 0) {
          return targetDate;
        }
      },
      days() {
        return Math.floor(this.remainingTime / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0");
      },
      hours() {
        return Math.floor(
          (this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        )
          .toString()
          .padStart(2, "0");
      },
      minutes() {
        return Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0");
      },
      seconds() {
        return Math.floor((this.remainingTime % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0");
      },
    },
    props: {
      proposal: {
        type: Object,
        required: true,
      },
      isTopest: {
        type: Boolean,
      },
    },
    methods: {
      startTimer() {
        if (this.intervalId) this.endTimer();
        this.intervalId = setInterval(() => {
          this.calculateTime();
          if (this.remainingTime < 1) this.endTimer();
        }, 1000);
      },
      endTimer() {
        clearInterval(this.intervalId);
        this.$emit("onTimerEnds");
      },
      calculateTime() {
        const now = new Date().getTime();
        if (this.endTime > now) {
          this.remainingTime = +this.endTime - +now;
        }
      },
    },

    watch: {
      endTime: {
        handler() {
          if (this.endTime > 0) {
            this.calculateTime();
            this.startTimer();
          }
        },
        immediate: true,
      },
    },
  };
</script>
