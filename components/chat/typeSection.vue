<template>
  <v-row class="" justify="center">
    <v-col cols="11">
      <input
        ref="filePickerRef"
        class="d-none pb-0"
        type="file"
        @change="onFileChange"
      />
      <v-row class="pb-md-0">
        <div
          v-if="reply"
          :class="$isRTL() ? 'rounded-bl-xl ' : ' rounded-br-xl '"
          class="replay-chat white--text rounded-t-xl position-relative d-flex justify-space-between !top-5"
          style="background-color: rgba(0, 0, 0, 0.8)"
        >
          <p
            v-if="reply.content"
            :class="$isRTL() ? 'text-right' : ' text-left'"
            class="px-4 pt-2 one-line-text font-style white--text"
          >
            {{ reply?.content }}
          </p>
          <p
            v-else
            :class="$isRTL() ? 'text-right' : ' text-left'"
            class="text-right px-4 pt-1 white--text"
          >
            file
          </p>

          <v-icon
            :class="$isRTL() ? 'ml-1' : ' mr-1'"
            class="cursor-pointer"
            color="white"
            small
            @click="$emit('removeReply')"
          >
            mdi-close
          </v-icon>
        </div>
        <v-col class="position-relative pa-0" cols="12">
          <div
            class="!flex gap-2 items-center rounded-pill style-bg-height px-0 pr-3"
          >
            <v-progress-circular
              v-if="loading"
              :class="$isRTL() ? 'ml-2' : 'mr-2'"
              class="my-auto mr-5 position-style"
              color="var(--primary)"
              indeterminate
            >
            </v-progress-circular>
            <div
              v-else
              class="d-flex justify-center items-center p-1 !rounded-lg"
              style="background-color: rgba(0, 0, 0, 0.7)"
            >
              <v-icon
                v-if="desc || isPlay"
                class="cursor-pointer"
                color="#ffffff"
                :disabled="isBlocked"
                @click="recordingLicense ? send() : voiceSend()"
              >
                mdi-send
              </v-icon>
            </div>
            <v-textarea
              v-if="selectVoice"
              v-model="desc"
              append-icon="mdi-paperclip"
              background-color="var(--light-gray)"
              class="rounded-xlpb-0"
              color="var(--primary)"
              flat
              hide-details
              :disabled="isBlocked"
              :label="isBlocked ? 'مکالمه مسدود شده' : 'چیزی بنویسید...'"
              no-resize
              rows="1"
              solo
              @click:append="openFilePicker"
              @keydown.enter.prevent="send()"
            >
            </v-textarea>
            <!-- voice -->
            <v-row>
              <v-col
                v-if="isRecording"
                class="d-flex justify-space-between align-center"
                cols="12"
              >
                <div class="location d-flex align-center mt-1">
                  <v-icon class="mb-1 mx-3" small @click="stopRecording">
                    mdi-square
                  </v-icon>
                  <div class="animatedClass cursor-pointer"></div>
                </div>

                <span
                  class="cursor-pointer position-style"
                  @click="cancelRecording"
                >
                  لغو ضبط
                </span>
              </v-col>
              <!-- play and pause voice -->
              <v-col v-if="isPlay" cols="12">
                <div v-if="isAudioPlaying">
                  <v-icon
                    class="cursor-pointer mr-7 mt-5"
                    color="black"
                    @click="playRecording"
                  >
                    mdi-pause
                  </v-icon>
                  <chat-equalizer
                    class="mx-auto d-flex justify-center position-equalizer"
                  />
                </div>
                <div v-else>
                  <v-icon
                    class="cursor-pointer mr-7 mt-5"
                    color="black"
                    @click="playRecording"
                  >
                    mdi-play
                  </v-icon>
                  <v-icon
                    class="cursor-pointer mr-7 mt-5"
                    color="black"
                    @click="cancelRecording"
                  >
                    mdi-trash-can-outline
                  </v-icon>
                </div>
              </v-col>
            </v-row>
            <!-- end section play and pause -->
          </div>
          <!-- voice -->

          <!-- Emoji -->
          <!-- <div v-if="isEmojiVisible">
            <Picker
              :data="emojiIndex"
              :class="$isRTL() ? 'position-picker-fa' : ' position-picker-en'"
              native
              :showPreview="false"
              :showSkinTones="false"
              @select="showEmoji"
            />
          </div> -->
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
  import data from "emoji-mart-vue-fast/data/all.json";
  import "emoji-mart-vue-fast/css/emoji-mart.css";

  import { EmojiIndex, Picker } from "emoji-mart-vue-fast";
  import services from "@/services";

  const emojiIndex = new EmojiIndex(data);

  export default {
    name: "App",
    components: {
      Picker,
    },
    props: {
      conversation_id: String | Number,
      reply: Object,
      isBlocked: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        emojiIndex: emojiIndex,
        emojisOutput: "",
        isEmojiVisible: false,
        activeSet: "native",
        emoji: "point_up",
        title: "Pick your emoji…",
        selectedEmojis: [],
        loading: false,
        desc: "",
        audioChunks: [],
        audioRecorder: null,
        message: "Ready to record",
        recordingLicense: true, //
        isRecording: false, //
        isPlay: false, //
        isCancelRecording: false, //
        selectVoice: true, //
        isAudioPlaying: false, //
      };
    },
    async mounted() {
      // navigator.mediaDevices
      //   .getUserMedia({ audio: true })
      //   .then((stream) => {
      //     this.audioRecorder = new MediaRecorder(stream);
      //     this.audioRecorder.addEventListener("dataavailable", (e) => {
      //       this.audioChunks.push(e.data);
      //     });
      //   })
      //   .catch((err) => {
      //     console.log("Error: " + err);
      //   });
    },
    methods: {
      voiceSend() {
        const blobObj = new Blob(this.audioChunks, { type: "audio/mp3" });
        this.uploadFile(blobObj);
      },
      openFilePicker() {
        this.$refs.filePickerRef.click();
      },
      onFileChange(event) {
        this.uploadFile(event.target.files[0]);
      },
      toggleEmojiPicker() {
        this.isEmojiVisible = !this.isEmojiVisible;
      },
      native() {
        return this.activeSet == "native";
      },
      showEmoji(emoji) {
        if (emoji.native) {
          this.desc += emoji.native;
        }
      },
      async uploadFile(file) {
        if (!file) return;

        this.loading = true;

        const formData = new FormData();
        formData.append("image", file);

        // this.conversation_id
        await this.$axios.$post(`/messages/${this.conversation_id}`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        this.$emit("refreshList");
      },
      async send(media_id = null) {
        if (this.desc == "" && !media_id) {
          this.$toast.error("لطفا پیامی بنویسید!");
          return;
        }

        this.loading = true;

        let payload = {
          content: this.desc,
        };
        // this.conversation_id
        await this.$axios.$post(`/messages/${this.conversation_id}`, payload, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        this.$emit("refreshList");

        this.desc = "";
        this.loading = false;
        // if (media_id)
        //   payload = {
        //     ...payload,
        //     media_id,
        //   };
        // else
        //   payload = {
        //     ...payload,
        //     desc: this.desc,
        //   };
        // if (this.isEmojiVisible == true) {
        //   this.isEmojiVisible = false;
        // }

        // services.message
        //   .create(payload)
        //   .then((response) => {
        //     this.$emit("refreshList");
        //     this.desc = "";
        //     this.$emit("removeReply");
        //     this.loading = false;
        //     this.recordingLicense = true;
        //     this.isPlay = false;
        //     this.selectVoice = true;
        //     this.isAudioPlaying = false;
        //   })
        //   .catch((error) => {
        //     this.loading = false;
        //   });
      },
      startRecording() {
        this.audioChunks = [];
        this.audioRecorder.start();
        this.message = "Recording started! Speak now.";
        this.recordingLicense = false;
        this.isRecording = true;
        this.selectVoice = false;
      },
      stopRecording() {
        this.audioRecorder.stop();
        this.message =
          "Recording stopped! Click on the play button to play the recorded audio.";
        // this.recordingLicense = true;
        this.isRecording = false;
        this.isPlay = true;
        this.isCancelRecording = true;
      },
      cancelRecording() {
        this.audioChunks = [];
        this.audioRecorder.stop();
        this.message = "Recording canceled";
        this.recordingLicense = true;
        this.isRecording = false;
        this.isPlay = false;
        this.isCancelRecording = false;
        this.selectVoice = true;
      },
      playRecording() {
        if (this.isAudioPlaying) {
          this.stopAudio();
        } else {
          this.startAudio();
        }
      },
      startAudio() {
        const blobObj = new Blob(this.audioChunks, { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(blobObj);
        this.audioElement = new Audio(audioUrl);

        this.audioElement.addEventListener("ended", () => {
          this.isAudioPlaying = false;
        });

        this.audioElement.play();
        this.message = "Playing the recorded audio!";
        this.isAudioPlaying = true;
      },

      stopAudio() {
        this.audioElement.pause();
        this.message =
          "Recording stopped! Click on the play button to play the recorded audio.";
        this.isAudioPlaying = false;
      },
    },
  };
</script>

<style scoped>
  .animatedClass {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: red;
    opacity: 1;
    animation: myfirst 1s linear 1s infinite alternate;
  }

  @keyframes myfirst {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0;
    }
  }

  .position-and-width {
    position: absolute;
    left: 17%;
    width: 90%;
    right: 0;
  }

  .margin-top {
    margin-top: 4px;
  }

  .style-bg-height {
    background-color: #eeeeee;
    height: 65px;
  }

  .icon-style {
    transform: rotate(180deg);
  }

  .position-picker-fa {
    position: absolute;
    bottom: 110px;
    right: 50px;
    z-index: 5;
  }

  .position-picker-en {
    position: absolute;
    bottom: 110px;
    left: 50px;
    z-index: 5;
  }

  .replay-chat {
    width: 60%;
    height: 30px;
    top: 30px;
    z-index: 5;
  }

  .font-style {
    font-size: 12px;
  }

  .transform {
    transform: rotate(-110deg);
  }

  .black-bg {
    background-color: black;
  }

  .position-style {
    position: absolute;
    left: 10px;
    top: 20px;
  }

  .space-top {
    top: 1px;
  }

  .position-equalizer {
    position: relative;
    overflow: hidden;
    width: 50%;
    top: -25px;
  }

  @media (min-width: 650px) {
    .position-equalizer {
      position: relative;
      overflow: hidden;
      width: 100%;
      top: -25px;
    }
  }
</style>
