<template>
  <div>
    <!-- پیام های سمت راست -->
    <v-container v-if="item?.user_id === $store.state.userData?.id">
      <v-row>
        <v-col cols="12" class="d-flex flex-row position-relative">
          <div class="position-relative">
            <!-- for reply  -->
            <div
              class="rounded-l-xl message-bg cursor-pointer replay-icon-position-fa"
              :style="{ display: mydisplay }"
              @mouseover="displayReply"
              @mouseleave="resetReply"
              @click="$emit('setReply', item)"
            >
              <v-icon class="mr-8 mt-1" color="white">
                mdi-arrow-left-top
              </v-icon>
            </div>

            <div
              class="size-chat-div chat-div message-bg light-shadow cursor-pointer position-relative rounded-xl"
              :class="
                $isRTL()
                  ? 'rounded-bl-xl text-right ml-auto mr-1'
                  : ' rounded-br-xl text-left mr-auto ml-1'
              "
              @mouseover="displayReply"
              @mouseleave="resetReply"
            >
              <div
                v-if="item?.reply"
                class="size-replay-chat mx-auto rounded-lg position-relative replay-right-bg"
              >
                <p class="px-4 pt-1 one-line-text white--text">
                  {{ item?.reply?.desc }}
                </p>
                <p
                  v-if="item?.reply?.media"
                  class="px-4 pt-1 white-text one-line-text"
                >
                  فایل
                </p>
              </div>
              <div v-if="item?.content" class="d-flex">
                <v-icon v-if="item?.reply" color="white" class="mr-2">
                  mdi-arrow-down-right
                </v-icon>

                <p class="mx-3 py-4 white--text">
                  {{ item?.content }}
                </p>
              </div>
              <div v-else-if="item?.image">
                <div v-if="item?.image" class="d-flex position-relative">
                  <img
                    :src="item?.image"
                    class="flex-1 ma-2 mb-8 rounded-lg"
                    height="80%"
                    width="80%"
                    contain
                  />
                </div>
                <!-- <div
                  v-else-if="item?.media?.file_type.includes('video')"
                  class="d-flex"
                >
                  <video
                    class="flex-1 ma-2 mb-8"
                    width="80%"
                    height="80%"
                    controls
                  >
                    <source :src="item?.media?.url" type="video/mp4" />
                  </video>
                </div> -->
                <!-- <div
                  v-else-if="item?.media?.file_type.includes('audio')"
                  class="pa-4"
                >
                  <chat-messageSection-lines-equalizer
                    :srcAudio="item?.media?.url"
                  />
                </div> -->

                <div
                  v-else
                  class="rounded-pill primary-bg d-flex flex-column text-right px-8 mx-5 mb-6"
                >
                  <span class="mr-1 mt-2 secondary-text">فایل</span>
                  <a
                    :href="item?.file"
                    target="_blank"
                    class="no-decoration mb-2 mr-1 link-color-size-text"
                  >
                    دانلود فایل
                  </a>
                </div>
              </div>
              <div
                class="d-flex justify-start align-center pb-1"
                :class="$isRTL() ? 'ml-2' : 'mr-2'"
              >
                <span class="caption-thin px-4 white--text">
                  {{ item?.created_at | moment("dddd  HH:mm") }}
                </span>

                <!-- تیک سین شدن پیام -->
                <!-- <v-icon
                  v-if="item?.is_read == '1'"
                  small
                  color="primary pb-2 "
                  :class="$isRTL() ? 'ml-2' : 'mr-2'"
                >
                  mdi-check-all
                </v-icon>
                <v-icon
                  v-else
                  small
                  color="primary pb-2 "
                  :class="$isRTL() ? 'ml-2' : 'mr-2'"
                >
                  mdi-check
                </v-icon> -->
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- پیام های سمت چپ -->
    <v-container v-else>
      <v-row no-gutters>
        <v-col cols="12" class="d-flex flex-row-reverse">
          <!-- avatar -->

          <div class="position-relative">
            <!-- reply section -->
            <div
              class="rounded-xl pr-5 light-gray-bg cursor-pointer replay-icon-receiver-position"
              :style="{ display: mydisplay }"
              @mouseover="displayReply"
              @mouseleave="resetReply"
              @click="$emit('setReply', item)"
            >
              <v-icon class="mr-n4 mt-1" color="white">
                mdi-arrow-right-top
              </v-icon>
            </div>
            <div class="d-flex align-end">
              <!-- main div for chat -->
              <div
                class="size-chat-div light-shadow cursor-pointer light-gray-bg position-relative chat-receiver-div white-bg rounded-xl"
                :class="
                  $isRTL()
                    ? ' text-right mr-auto ml-1'
                    : ' text-left ml-auto mr-1'
                "
                @mouseover="displayReply"
                @mouseleave="resetReply"
              >
                <div>
                  <div
                    class="size-replay-chat mx-auto rounded-lg replar-div-bg position-relative mx-1"
                    :class="
                      $isRTL() ? ' text-right mr-auto' : 'text-left ml-auto'
                    "
                  >
                    <p class="px-4 pt-1 one-line-text">
                      {{ item?.reply?.desc || "" }}
                    </p>
                    <p
                      v-if="item?.reply?.media"
                      class="px-4 pt-1 one-line-text"
                    >
                      فایل
                    </p>
                  </div>
                </div>
                <div v-if="item?.content" class="py-4">
                  <p class="text-right mx-3">
                    {{ item?.content }}
                  </p>
                </div>

                <div v-else-if="item?.file || item?.image">
                  <div
                    v-if="item?.image"
                    class="d-flex justify-center position-relative"
                  >
                    <img
                      :src="item?.image"
                      class="flex-1 ma-2 mb-8 rounded-xl"
                      height="95%"
                      width="95%"
                    />
                  </div>
                  <!-- <div
                    v-else-if="item?.media?.file_type.includes('video')"
                    class="d-flex"
                  >
                    <video
                      class="flex-1 ma-2 mb-8 rounded-xl"
                      width="80%"
                      height="80%"
                      controls
                    >
                      <source :src="item?.media?.url" type="video/mp4" />
                    </video>
                  </div>
                  <div
                    v-else-if="item?.media?.file_type.includes('audio')"
                    class="pa-4"
                  >
                    <chat-messageSection-lines-equalizer
                      :srcAudio="item?.media?.url"
                    />
                  </div> -->
                </div>
                <div
                  class="d-flex align-center pb-1 ml-2"
                  :class="$isRTL() ? 'justify-start ' : ' justify-start ml-6'"
                >
                  <span class="caption-thin px-5">
                    {{ item?.user?.created_at | moment("dddd  HH:mm") }}
                  </span>
                </div>
              </div>
              <v-avatar class="mr-2" size="36">
                <img :src="require('@/assets/img/default.jpg')" alt="تصویر" />
                <img />
              </v-avatar>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import services from "@/services";
  export default {
    props: {
      item: Object,
      conversation: [Object, Array],
      // loadingSkelet: Boolean,
    },

    data() {
      return {
        mydisplay: "none",
        mydisplayReceiver: "none",
        isReplayVisibileReceiver: false,
        isReplayVisibile: false,
      };
    },
    // mounted() {
    //   this.getSeenMessage();
    // },
    methods: {
      displayReply() {
        this.mydisplay = "block";
      },
      resetReply() {
        this.mydisplay = "none";
      },
      displayReplyReceiver() {
        this.mydisplayReceiver = "block";
      },
      resetReplyReceiver() {
        this.mydisplayReceiver = "none";
      },
      // getSeenMessage() {
      //   this.loadingSeenMessage = true;
      //   services.user.message()
      // },
    },
  };
</script>
<style scoped>
  .replar-div-bg {
    background-color: var(--light-gray);
  }
  .size-chat-div {
    min-height: 30px;
    max-width: 300px;
    /* width: 80%; */
    /* margin-right: auto; */
    /* width: fit-content; */
    z-index: 5;
  }
  .size-replay-chat {
    width: 90%;
    height: 30px;
    top: 10px;
  }

  /* .dark-gray-bg {
    background-color: var(--text-200);
  } */

  .replay-icon-position-fa {
    position: absolute;
    bottom: 0;
    left: -30px;
    z-index: 0;
    width: 60px;
    height: 30px;
  }

  .replay-icon-position-en {
    position: absolute;
    bottom: 0;
    right: 2px;
    z-index: 0;
    width: 60px;
    height: 30px;
  }

  .replay-icon-receiver-position {
    position: absolute;
    bottom: 0;
    right: -30px;
    z-index: 0;
    width: 60px;
    height: 30px;
  }

  .link-color-size-text {
    color: #b8b08c;
    font-size: 11px;
  }

  .chat-receiver-div::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-right: 20px solid #e8e8e8;
    border-bottom: 5px solid transparent;
    position: absolute;
    left: -11px;
    bottom: 15px;
    z-index: 0;
  }

  .chat-div::before {
    content: "";
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-left: 20px solid rgba(144, 141, 133, 1);
    border-bottom: 5px solid transparent;
    position: absolute;
    right: -11px;
    bottom: 15px;
    z-index: 0;
  }

  .message-bg {
    background-color: rgba(144, 141, 133, 1);
  }
  .replay-right-bg {
    background-color: var(--goldy-brown);
  }
  @media (max-width: 550px) {
    .size-chat-div {
      width: 200px;
    }
  }
</style>
