<template>
  <div class="gray-background">
    <v-container v-if="$store.state.userData" class="pb-0">
      <v-row class="pb-0">
        <v-col v-show="showContacts" class="d-md-block pt-4" cols="12" md="4">
          <!-- skeleton for conversaition -->
          <div v-if="loadingSkelet">
            <common-sub-header title="چت" />
            <v-row class="overflow-auto">
              <v-col
                v-for="(item, i) in 3"
                :key="i"
                class="py-0 cursor-pointer with-transition"
                cols="12"
              >
                <div class="d-flex align-center justify-end my-2">
                  <v-avatar>
                    <v-skeleton-loader type="avatar"></v-skeleton-loader>
                  </v-avatar>

                  <div class="d-flex flex-column mx-4 flex-1 mt-4">
                    <div class="d-flex justify-space-between">
                      <v-skeleton-loader max-height="30" type="text" width="60">
                      </v-skeleton-loader>

                      <v-skeleton-loader max-height="20" type="text" width="40">
                      </v-skeleton-loader>
                    </div>

                    <v-skeleton-loader max-height="20" type="text" width="90">
                    </v-skeleton-loader>
                  </div>
                </div>

                <hr class="mt-4" color="#dddddd" />
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <common-sub-header title="چت" />
            <!-- Contacts -->
            <v-row
              v-if="chatUserArray.data.length == 0"
              align="center"
              class="overflow-auto"
              justify="center"
              style="height: 100vh"
            >
              <v-col>
                <h3 class="text-center black--text">
                  در حال حاضر چتی وجود ندارد.
                </h3>
              </v-col>
            </v-row>
            <v-row v-else class="overflow-auto mt-4" justify="center">
              <!-- سرچ -->
              <!-- <v-col v-show="showContacts" class="py-0" cols="12">
                <div class="margin-icon">
                  <v-text-field
                    v-model="searchText"
                    class="shadow pt-0"
                    dir="rtl"
                    height="3.5rem"
                    placeholder="جستجو کنید."
                    prepend-inner-icon="mdi-magnify"
                    rounded
                  >
                  </v-text-field>
                </div>
              </v-col> -->
              <!-- UserConversations -->
              <v-col
                class="py-0 mb-2 cursor-pointer with-transition white-bg rounded-xl"
                cols="11"
                @click.prevent.stop="$router.push('/panel/tickets')"
              >
                <chat-contact-item
                  :img="require('@/assets/img/admin-tickets.png')"
                  name="پشتیبانی گرمی"
                />
              </v-col>
              <v-col
                v-for="(item, i) in filterContacts"
                :key="i"
                class="py-0 mb-2 cursor-pointer with-transition white-bg rounded-xl"
                cols="11"
                @click.prevent.stop="selectItemMessage(item)"
              >
                <chat-contact-item
                  :img="
                    item?.sender?.id === $store.state.userData?.id
                      ? item?.receiver?.image
                      : item?.sender?.image
                  "
                  :name="
                    item?.sender?.id === $store.state.userData?.id
                      ? item?.receiver?.shop_name ||
                        (item?.receiver?.first_name &&
                          item?.receiver?.last_name)
                        ? item?.receiver?.first_name +
                          ' ' +
                          item?.receiver?.last_name
                        : 'کاربر گرمی'
                      : item?.sender?.shop_name ||
                        (item?.sender?.first_name && item?.sender?.last_name)
                      ? item?.sender?.first_name + ' ' + item?.sender?.last_name
                      : 'کاربر گرمی'
                  "
                  :date="item?.created_at"
                  :conversationId="item?.target_user_id"
                  :isRead="item.last_message?.is_read"
                  :blockedBy="item?.blocked_by"
                  withMenu
                  :lastMessage="item.last_message?.desc"
                  @stopNotification="stopNotification"
                  @deleteChat="deleteChat"
                  @block="block"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>
        <!-- (existenceChat) زمانی که هیچ چتی وجود نداره -->
        <v-col
          v-if="existenceChat"
          class="d-none d-md-block d-md-flex align-md-center justify-md-center text-center height-500"
          cols="12"
          md="8"
        >
          <p class="label-m black--text">
            برای شروع پیام رسانی، گپ را انتخاب کنید.
          </p>
        </v-col>
        <v-col v-else v-show="showChat" class="pt-0 pb-0" cols="12" md="8">
          <div
            class="d-flex justify-space-between height-div align-center mt-4"
          >
            <div class="d-flex align-center">
              <div class="div-size rounded-lg background-gray mx-2">
                <v-icon @click="toggleConversation"> mdi-chevron-right</v-icon>
              </div>
              <v-avatar :size="$vuetify.breakpoint.xsOnly ? '37' : '56'">
                <img
                  class="object-cover"
                  :src="
                    selectedConversation?.sender?.id ===
                    $store.state.userData?.id
                      ? selectedConversation?.receiver?.image
                      : selectedConversation?.sender?.image
                  "
                />
              </v-avatar>
              <span class="black--text mx-2">
                {{
                  selectedConversation?.sender?.id === $store.state.userData?.id
                    ? selectedConversation?.receiver?.shop_name ||
                      (selectedConversation?.receiver?.first_name &&
                      selectedConversation?.receiver?.first_name
                        ? selectedConversation?.receiver?.first_name +
                          " " +
                          selectedConversation?.receiver?.first_name
                        : "کاربر گرمی")
                    : selectedConversation?.sender?.shop_name ||
                      (selectedConversation?.sender?.first_name &&
                      selectedConversation?.sender?.first_name
                        ? selectedConversation?.sender?.first_name +
                          " " +
                          selectedConversation?.sender?.first_name
                        : "کاربر گرمی")
                }}
              </span>
            </div>

            <div class="!flex items-center gap-3">
              <div
                @click="helpSheet = true"
                class="flex flex-col gap-0.5 items-center"
              >
                <v-icon>mdi-help-circle-outline</v-icon>
                <div class="text-[8px]">راهنما</div>
              </div>

              <v-dialog v-model="helpSheet">
                <v-card>
                  <div class="p-4 gap-3 flex flex-col relative">
                    <v-icon
                      @click="helpSheet = false"
                      class="!absolute left-4 top-4 w-5 h-5"
                      >mdi-close</v-icon
                    >
                    <div class="text-bold mb-1">راهنمای معالمه</div>
                    <div class="text-sm" style="color: rgba(66, 64, 56, 1)"
                      >۱. محصولات رو آنلاین خریداری نکنید و پولی بابت بیعانه
                      واریز نکنید.</div
                    >
                    <div class="text-sm" style="color: rgba(66, 64, 56, 1)"
                      >۲. اولین قرار ملاقات داخل طلافروشی باشد.</div
                    >
                    <div class="text-sm" style="color: rgba(66, 64, 56, 1)"
                      >۳. دومین کار این است که محصول چک و عیار آن در طلافروشی
                      مشخص و با فاکتور محصول تطابق داده شود.</div
                    >
                    <div class="text-sm" style="color: rgba(66, 64, 56, 1)"
                      >۴. حتما کپی کارت ملی خریدار و فروشنده به هم داده
                      شود.</div
                    >
                    <div class="text-sm" style="color: rgba(66, 64, 56, 1)"
                      >۵. حتما باید خریدار و فروشنده که هر یک صاحب کارت بانکی
                      خود هستند واریز کنند.</div
                    >
                    <div class="text-sm" style="color: rgba(66, 64, 56, 1)"
                      >۶. در صورت لزوم برای واریز ها از رمز ارز استفاده نکنید
                      مگر آن که رسید دریافت شود.</div
                    >
                  </div>
                </v-card>
              </v-dialog>

              <v-menu bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon fab dark small v-bind="attrs" v-on="on">
                    <v-icon color="black">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="stopNotification()">
                    <v-list-item-title>
                      <v-icon small color="black">
                        mdi-bell-off-outline
                      </v-icon>
                      <small> توقف اعلان </small>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteChat()">
                    <v-list-item-title>
                      <v-icon small color="black">mdi-trash-can-outline</v-icon>
                      <small> حذف چت </small>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="block()">
                    <v-list-item-title>
                      <v-icon small color="red">
                        mdi-alert-octagon-outline
                      </v-icon>
                      <small class="error--text">
                        {{
                          selectedConversation?.blocked_by
                            ? "رفع مسدودی"
                            : "مسدود شود"
                        }}
                      </small>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>

          <div
            id="div-scroll"
            class="overflow-auto height-chat-section d-flex flex-column-reverse"
          >
            <template v-if="chatArray.length">
              <span
                v-for="chat in chatArray"
                :key="'chat' + chat?.id + chat.is_read"
              >
                <chat-messageSection
                  :conversation="conversation"
                  :item="chat"
                  @setReply="setReply"
                />
              </span>
            </template>
            <div v-else class="mx-auto px-auto">
              <p class="label-a my-16 mx-auto">پیامی وجود ندارد.</p>
            </div>

            <!-- <div v-if="loading" class="text-center">
              <v-progress-circular color="primary" indeterminate size="25">
              </v-progress-circular>
            </div> -->
          </div>

          <chat-typeSection
            :conversation_id="
              $route.query.conversation_id
                ? $route.query.conversation_id
                : selectedConversation?.sender?.id === $store.state.userData?.id
                ? selectedConversation?.receiver?.id
                : selectedConversation?.sender?.id
            "
            :reply="reply"
            :isBlocked="selectedConversation?.blocked_by"
            @refreshList="refreshList"
            @removeReply="reply = null"
          />
        </v-col>
      </v-row>
    </v-container>
    <div
      v-else
      class="d-flex flex-column text-center expand-height align-center justify-center mt-10 mx-4"
    >
      <p>
        برای شروع مکالمه جدید و یا دسترسی به مکالمات قبلی، لازم است ابتدا وارد
        حساب کاربری شوید.
      </p>
      <v-btn
        class="mt-3"
        color="var(--primary)"
        elevation="0"
        outlined
        to="/login"
      >
        ورود به حساب
      </v-btn>
    </div>
  </div>
</template>

<script>
  import services from "@/services";

  export default {
    layout: "default",
    mounted() {
      if (this.$store.state.userData) this.getUserConversations();
    },
    beforeDestroy() {
      clearInterval(this.intervalId);
      clearTimeout(this.conversationsTimeoutId);
    },
    data() {
      return {
        searchText: "",
        helpSheet: false,
        showContacts: true,
        showChat: false,
        selectedConversation: null,
        existenceChat: true,
        loading: true,
        loadingConversation: true,
        loadingSeenMessage: false,
        loadingMenu: false,
        status: "",
        page: 1,
        lastPage: 1,
        totalMessage: 1,
        chatArray: [],
        conversation: [],
        reply: null,
        intervalId: null,
        conversationsTimeoutId: null,
        userArray: [],
        btnList: [this.$store.state.userData?.full_name || ""] || [],
        loadingSkelet: false,
      };
    },
    watch: {
      selectedConversation() {
        // this.getList(false, true);
        let counter = 0;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
          // this.getList(false, true);
          counter++;
          if (counter == 3) {
            counter = 0;
            this.getUserConversations();
          }
        }, 10000);
      },
    },

    async asyncData({ $axios }) {
      const chatUserArray = await $axios.$get("/messages/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return { chatUserArray };
    },

    methods: {
      selectItemMessage(conversation) {
        this.selectedConversation = conversation;
        this.$router.push("/chat");
        this.readMessages(
          conversation?.sender?.id === this.$store.state.userData?.id
            ? conversation?.receiver?.id
            : conversation?.sender?.id,
        );

        this.chatArray = [];

        this.toggleChat();

        this.$nextTick(() => {
          this.scrollChatPage();
        });
      },

      toggleName(name) {
        const index = this.btnList.findIndex(
          (nameItem) => nameItem?.id == name?.id,
        );
        if (index > -1) {
          this.btnList.splice(index, 1);
        } else {
          this.btnList.push(name);
        }
      },
      toggleConversation() {
        this.showContacts = !this.showContacts;
        this.showChat = !this.showChat;
        this.chatArray = [];
      },
      toggleChat() {
        this.showChat = true;
        this.showContacts = false;
        this.existenceChat = false;
      },
      scrollChatPage() {
        let element = document.getElementById("div-scroll");
        element.onscroll = () => {
          const bottomOfElement =
            element.scrollHeight -
              (Math.abs(element.scrollTop) + element.clientHeight) <
            10;

          if (bottomOfElement && !this.loading && this.page < this.lastPage) {
            this.page += 1;
            // this.getList();
          }
        };
      },
      setReply(item) {
        this.reply = item;
      },
      async refreshList() {
        const res = await this.$axios.$get(
          `/messages/${
            this.$route.query.conversation_id
              ? this.$route.query.conversation_id
              : this.selectedConversation?.sender?.id ===
                this.$store.state.userData?.id
              ? this.selectedConversation?.receiver?.id
              : this.selectedConversation?.sender?.id
          }`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );
        this.chatArray = res.data;

        let element = document.getElementById("div-scroll");
        element.scrollTo({ top: 0, behavior: "smooth" });
      },
      getList(reset = false, isNew = false) {
        this.loading = true;

        services.message
          .get(null, {
            conditions: {
              conversation_id: this.selectedConversation?.id,
            },
            with: ["user", "conversation", "reply"],

            page: isNew ? 1 : this.page,
          })
          .then((response) => {
            if (isNew) {
              if (
                response.data?.data.length &&
                this.chatArray.length &&
                this.chatArray[0]?.id != response.data?.data[0]?.id
              )
                this.readMessages(this.selectedConversation);

              const lastMessageIdx = this.chatArray.length
                ? response.data?.data?.findIndex(
                    (chat) => chat?.id == (this.chatArray[0]?.id || 0),
                  )
                : -1;

              const newChats = this.chatArray.length
                ? response.data?.data?.slice(0, lastMessageIdx) || []
                : response.data?.data;
              this.chatArray = [...newChats, ...this.chatArray];

              if (
                lastMessageIdx >= 0 &&
                response.data?.data[lastMessageIdx]?.is_read == "1"
              )
                this.chatArray = this.chatArray.map((message) => ({
                  ...message,
                  is_read: "1",
                }));
            } else {
              this.chatArray = reset
                ? response.data.data
                : [...this.chatArray, ...response.data.data];
            }
            this.lastPage = response.data.last_page || 1;

            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
          });
      },

      async getUserConversations() {
        if (this.$route.query.conversation_id && !this.selectedConversation) {
          // if (!this.selectedConversation) return;

          const res = await this.$axios.$get(
            `/messages/${this.$route.query.conversation_id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            },
          );
          this.chatArray = res.data;
          this.showChat = true;
          this.showContacts = false;
          this.existenceChat = false;
        }
      },
      async readMessages(conversation) {
        if (conversation) {
          const res = await this.$axios.$get(`/messages/${conversation}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          this.chatArray = res.data;
        }
      },
      async stopNotification(item = this.selectedConversation) {},
      async deleteChat(item = this.selectedConversation) {
        if (this.loadingMenu) return;

        try {
          this.loadingMenu = true;
          await services.conversation.destroy(item?.id);

          this.getUserConversations();
          this.$toast.success("مکالمه با موفقیت پاک شد.");
          this.showContacts = true;
          this.showChat = false;
          this.loadingMenu = false;
        } catch (error) {
          console.log(error);
          this.loadingMenu = false;
        }
      },
      async block(item = this.selectedConversation) {
        if (this.loadingMenu) return;

        try {
          this.loadingMenu = true;
          const response = await services.conversation.block(item?.id);
          if (this.selectedConversation.blocked_by)
            this.selectedConversation.blocked_by =
              response.data.data?.blocked_by || null;
          if (response.data?.msg) this.$toast.success(response.data?.msg);
          this.loadingMenu = false;
        } catch (error) {
          console.log(error);
          this.loadingMenu = false;
        }
      },
    },

    computed: {
      userFullName() {
        return this.$store.state.userData?.full_name?.trim() || "(بدون نام)";
      },
      filterContacts() {
        if (this.searchText) {
          return this.chatUserArray.data?.filter((item) => {
            const fullNameIncludesSearchText =
              item?.createby?.full_name.includes(this.searchText);
            const titleIncludesSearchText =
              item?.model?.project?.title.includes(this.searchText);
            return fullNameIncludesSearchText || titleIncludesSearchText;
          });
        } else {
          return this.chatUserArray.data;
        }
      },
    },
  };
</script>
<!-- <style>
  .v-application--is-rtl
    .v-textarea.v-text-field--enclosed
    .v-text-field__slot
    textarea {
    padding-left: 0px;
  }
  .scrollbar-style::-webkit-scrollbar {
    width: 2px;
  }
  .scrollbar-style::-webkit-scrollbar-track {
    background: var(--white);
    opacity: 0.7;
  }
  .scrollbar-style::-webkit-scrollbar-thumb {
    background: var(--primary);
  }
</style> -->

<style scoped>
  .div-size {
    width: fit-content;
    height: fit-content;
  }

  .background-gray {
    background-color: #dedcdd;
  }

  .max-height-contact-section {
  }

  .height-chat-section {
    height: 80vh;
  }

  .height-500 {
    height: 500px;
  }

  .div-style {
    border: 7px solid white;
    z-index: 5;
  }

  .size-text-h3 {
    font-size: 15px;
  }

  .size-text {
    font-size: 10px;
  }

  .style-div {
    width: 7px;
    height: 7px;
  }

  .height-div {
    height: 60px;
  }

  .height-search-div {
    max-height: 300px;
  }

  .img-size {
    height: 90px;
    width: 90px;
  }

  .card-size {
    width: 95%;
    height: 600px;
  }

  /* .text-overflow {
    white-space: nowrap;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  } */
  .space-bottom {
    margin-bottom: 0;
  }

  @media (min-width: 434px) and (max-width: 599px) {
    .space-bottom {
      margin-bottom: -10px;
    }
  }

  @media (max-width: 434px) {
    .text-size-span {
      font-size: 9px;
    }

    .height-div {
      height: 40px;
    }

    .img-size {
      height: 60px;
      width: 60px;
    }

    .size-text-h3 {
      font-size: 12px;
      margin-top: 7px;
    }

    .size-text {
      font-size: 7px;
      margin-top: -8px;
    }

    .card-size {
      width: 100%;
    }

    .gray-background {
      background-color: #f7f6f2;
    }
  }
</style>

<style lang="scss">
  .margin-icon {
    .mdi-magnify::before {
      margin-top: 25px;
      transform: rotate(90deg);
    }
  }
</style>
