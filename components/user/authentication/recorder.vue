<template>
  <span>
    <user-authentication-dialogs-info
      v-model="showDialog"
      :dialogInfo="dialogInfo"
    />

    <div class="mt-6 d-flex flex-column align-center justify-center">
      <v-progress-circular
        :rotate="-90"
        :size="200"
        :width="5"
        :value="value"
        color="red"
      >
        <div class="video-container">
          <video autoplay id="web-cam-container" class="custom-video">
            مرورگر شما از ویدیو پشتیبانی نمیکند
          </video>
        </div>
        <v-img
          :src="require('@/assets/img/scan-img.png')"
          class="video-frame"
        ></v-img>
      </v-progress-circular>
      <span class="d-flex align-center justify-center mt-6">
        <v-btn
          outlined
          color="var(--text-700)"
          class="custom-rounded mx-auto d-flex align-center justify-space-between px-1"
          width="120px"
          @click="recorded ? postVideo() : record()"
        >
          <p>{{ recorded ? "ارسال" : isRecording ? "در حال ضبط" : "شروع" }}</p>
          <v-badge color="red" class="ml-2 mt-1" dot></v-badge>
        </v-btn>
        <v-btn @click="refresh" icon>
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </span>
      <p style="color: black" class="font-weight-bold mt-3 px-3 text-center"
        >"اینجانب محمد اسکندپور فرزند محسن با کد ملی 545435433 در تاریج 1 آبان
        402 تقاضای تایید هویت در سامانه گرمی را دارم."
      </p>
      <v-btn
        outlined
        color="var(--text-700)"
        class="custom-rounded mt-8 mb-3 mx-auto bottom-btn-style"
        @click="nextLevel"
      >
        <!-- :disabled="!recorded" -->
        مرحله بعد
      </v-btn>
    </div>
  </span>
</template>
<script>
  import { rules } from "@/constants/VuetifyRules.js";
  import services from "@/services";
  import { formPostPrepare } from "@/constants/PanelFormHandler";
  import { showError } from "@/constants/messages";
  export default {
    data() {
      return {
        mediaRecorder: null,
        chunks: [],
        isRecording: false,
        interval: {},
        value: 0,
        recorded: false,
        blob: "",
        video: "",
        showDialog: false,
        loading: false,
        dialogInfo: {
          title: "ثبت چهره",
          desc: "صورت خود را در محدوده مشخص شده قرار دادهو بر روی دکمه شروع کلیک کنید. سپس جمله‌ی قرار داده شده را تکرار نمایید.",
          button: "شروع فرآیند اسکن",
          image: "require('@/assets/img/scan.svg')",
        },
        sent: false,
      };
    },
    mounted() {
      this.showDialog = true;
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((localMediaStream) => {
          this.video = document.querySelector("video");
          this.video.srcObject = localMediaStream;
        })
        .catch((error) => {
          console.log("Rejected!", error);
        });
    },
    beforeDestroy() {},

    methods: {
      record() {
        if (!this.isRecording) {
          this.interval = setInterval(() => {
            if (this.value === 100) {
              this.recorded = true;
              this.stopRecording();
              this.stopMediaStream(this.video.srcObject);
            }
            this.value += 5;
          }, 1000);
          this.startRecording();
        } else {
          this.stopRecording();
        }
      },
      startRecording() {
        this.chunks = [];
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = (e) => {
              if (e.data.size > 0) {
                this.chunks.push(e.data);
              }
            };
            this.mediaRecorder.onstop = () => {
              this.blob = new Blob(this.chunks, { type: "video/webm" });
            };
            this.mediaRecorder.start();
            this.isRecording = true;
          })
          .catch((err) => console.error("Error starting recording: ", err));
      },
      stopRecording() {
        if (this.isRecording) {
          this.mediaRecorder.stop();
          clearInterval(this.interval);
          this.isRecording = false;
          this.recorded = true;
        }
      },
      async postVideo() {
        try {
          if (!this.loading) this.loading = true;
          let data = formPostPrepare({
            video: this.blob,
          });
          const response = await services.authentication.setVideo(data);
          this.sent = true;
          this.loading = false;
        } catch (error) {
          showError(error);
          this.loading = false;
        }
      },
      refresh() {
        this.isRecording = false;
        this.value = 0;
        clearInterval(this.interval);
        this.stopRecording();
      },
      stopMediaStream(stream) {
        stream.getTracks().forEach((track) => track.stop());
      },
      nextLevel() {
        if (this.sent) {
          this.$emit("increamentLevel");
        } else {
          this.postVideo();
          this.$emit("increamentLevel");
        }
      },
    },
  };
</script>
<style scoped>
  .video-container {
    position: relative;
    width: 200px;
    height: 200px;
    z-index: 0;
  }
  .custom-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .video-frame {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 50%;
  }
</style>
