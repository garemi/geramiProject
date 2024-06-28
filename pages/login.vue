<template>
  <div
    class="px-6 py-12 relative w-full !h-[calc(100svh-100px)]"
    style="background-color: var(--background)"
  >
    <intro
      class="absolute z-20"
      @closeIntro="dontShowIntro"
      v-if="showingIntro"
    />
    <!-- <intro /> -->
    <v-img
      :src="require('@/assets/img/panel-icon.png')"
      class="mb-5"
      height="50px"
      width="50px"
    >
    </v-img>
    <div class="mb-7">
      <h2>
        با گرمی
        <br />
        معامله پرسود خود را بیابید.
      </h2>
    </div>
    <div class="mt-10">
      <user-login-otp
        v-if="codeSent"
        v-model="timer"
        :cellphone="cellphone"
        :withBtn="withBtn"
        @backToEntry="backToEntry"
      />
      <user-login-entry
        v-else
        v-model="cellphone"
        :loading="loading"
        @sendCode="sendCode"
      />
    </div>
  </div>
</template>
<script>
  import { rules } from "@/constants/VuetifyRules.js";
  import services from "@/services";
  import { getErrorText } from "@/constants/VianaAxios";

  export default {
    data() {
      return {
        cellphone: "",
        codeSent: false,
        rules,
        loading: false,
        timer: 60,
        withBtn: true,
        showingIntro: false,
      };
    },

    mounted() {
      const isNotFirstTimeIntro = this.$cookies.get("isNotFirstTimeIntro");
      if (!isNotFirstTimeIntro) {
        this.showingIntro = true;
      }
    },

    methods: {
      async sendCode() {
        if (!this.loading) this.loading = true;
        await this.$axios.$post("/users/pre/register", {
          cellphone: this.cellphone,
        });
        this.codeSent = true;
        this.loading = false;
        this.startTimer();
        // services.user
        //   .register(this.cellphone)
        //   .then((response) => {
        //     this.codeSent = true;
        //     this.loading = false;
        //     this.startTimer();
        //     this.$toast.success("کد با موفقیت ارسال شد");
        //   })
        //   .catch((error) => {
        //     this.loading = false;
        //     console.log(error);
        //     this.$toast.error(getErrorText(error));
        //   });
      },
      startTimer() {
        this.timer = 60;
        const intervalId = setInterval(() => {
          if (this.timer > 0) {
            if (this.timer <= 10) {
              this.timer = "0" + --this.timer;
            } else {
              this.timer -= 1;
            }
          } else {
            clearInterval(intervalId);
          }
        }, 1000);
      },
      backToEntry() {
        this.codeSent = false;
      },
      dontShowIntro() {
        this.showingIntro = false;
        this.$cookies.set("isNotFirstTimeIntro", true);
      },
    },
  };
</script>
<style>
  .chevron-border {
    border: 2px solid white;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    transform: rotate(45deg);
  }
</style>
<style scoped>
  *:focus {
    outline: none;
  }
</style>
