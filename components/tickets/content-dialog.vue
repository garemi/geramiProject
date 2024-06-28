<template>
  <v-dialog
    v-model="model"
    max-width="600"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card
      :loading="loading"
      :disabled="loading"
      color="var(--background)"
      class="d-flex flex-column"
    >
      <v-card-title class="">
        <v-btn
          color="var(--medium-gray)"
          small
          elevation="0"
          style="width: 30px"
          class="rounded-lg ml-2"
          @click="model = false"
        >
          <v-icon color="var(--gray)">mdi-chevron-right</v-icon>
        </v-btn>
        <v-avatar size="34" class="mr-2">
          <img
            :src="
              selectedData.create_by?.id == $store.state.userData.id
                ? require('@/assets/img/default.jpg')
                : selectedData?.create_by?.avatar?.url ||
                  require('@/assets/img/default.jpg')
            "
          />
        </v-avatar>
        <span class="black--text mx-2 text-12">
          {{
            selectedData.create_by?.id == $store.state.userData.id
              ? "پشتیبان"
              : selectedData.create_by?.full_name
          }}
        </span>
        <v-spacer />

        <v-btn
          v-if="selectedData.status != 1 && !isUser"
          class="mx-1"
          dark
          small
          color="error"
          elevation="0"
          @click="closeTicket"
        >
          <v-icon small dark>mdi-close</v-icon>
          بستن تیکت
        </v-btn>
      </v-card-title>

      <v-card-text class="flex-1 pb-0">
        <small>توضیحات تیکت</small>
        <h4>{{ selectedData.desc || "" }}</h4>
        <v-divider class="my-2" />
        <div v-if="answers.length" class="answers-container">
          <div class="answers-parent">
            <div
              v-for="(ans, i) in answers"
              :key="'ans' + i"
              class="d-flex position-relative"
            >
              <v-spacer v-if="ans.create_by?.id != $store.state.userData.id" />
              <v-avatar
                v-if="ans.create_by?.id == $store.state.userData.id"
                size="37"
                class="mr-2 mt-auto"
              >
                <img
                  :src="
                    ans?.create_by?.avatar?.url ||
                    require('@/assets/img/default.jpg')
                  "
                />
              </v-avatar>
              <div
                class="rounded pa-4 mt-2 answer rounded-xl position-relative"
                :class="
                  ans.create_by?.id == $store.state.userData.id
                    ? 'sender-container'
                    : 'receiver-container'
                "
              >
                {{ ans.desc || "" }}
                <div class="text-10" style="color: #d2cbbb">{{
                  ans.created_at | moment("dddd HH:mm")
                }}</div>
              </div>
              <v-avatar
                v-if="ans.create_by?.id != $store.state.userData.id"
                size="37"
                class="mr-2 mt-auto"
              >
                <img
                  :src="
                    ans?.create_by?.avatar?.url ||
                    require('@/assets/img/default.jpg')
                  "
                />
              </v-avatar>
              <v-spacer v-if="ans.create_by?.id == $store.state.userData.id" />
            </div>
          </div>
        </div>
        <h4 class="mt-4" v-else>هنوز پاسخی دریافت نشده است.</h4>
      </v-card-text>

      <v-card-actions>
        <div class="rounded-lg white d-flex align-center flex-1 pa-1">
          <v-textarea
            background-color="white"
            hide-details="auto"
            solo
            flat
            auto-grow
            label="متن جدید"
            dense
            rows="1"
            class="rounded-lg textarea-custom"
            v-model="desc"
            @keyup.prevent.enter="sendTicket"
          />
          <v-btn
            class="mx-1 rounded"
            color="#ECEAE4"
            fab
            x-small
            elevation="0"
            :loading="loading"
            @click="sendTicket"
          >
            <v-icon style="transform: rotate(-130deg)"> mdi-send </v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import services from "@/services";
  import { getErrorText } from "@/constants/VianaAxios";
  import { autoModel } from "@/mixins/auto-model";
  export default {
    mixins: [autoModel],
    props: {
      selectedData: {
        required: true,
        type: Object,
      },
      isUser: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        loading: false,
        answers: [],
        desc: "",
      };
    },
    watch: {
      selectedData() {
        this.answers = [];
        this.getAnswers();
      },
      model: {
        immediate: true,
        handler(val) {
          if (!val) this.$emit("getList");
        },
      },
    },
    methods: {
      showModal() {
        this.model = true;
      },
      getAnswers() {
        if (!this.loading) this.loading = true;

        services.ticket
          .get(null, {
            noPaginate: true,
            with: ["createBy", "parent"],
            conditions: {
              parent_id: this.selectedData.id,
            },
          })
          .then((response) => {
            this.loading = false;
            this.answers = response.data;
            this.$nextTick(() => {
              const elements =
                document.getElementsByClassName("answers-container");
              if (elements.length)
                elements[0].scrollTop = elements[0].scrollHeight;
            });
          })
          .catch((error) => {
            this.loading = false;
          });
      },
      async setUnreadTicket() {
        return services.ticket
          .update(
            {
              status: this.isUser ? 0 : 1,
            },
            this.selectedData.id,
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {});
      },
      async closeTicket() {
        this.loading = true;
        await this.setUnreadTicket();
        this.model = false;
        this.loading = false;
        this.$toast.success("تیکت با موفقیت بسته شد.");
      },
      sendTicket() {
        if (this.desc <= 0) {
          this.$toast.error("پاسخ را به درستی وارد نمایید");
          return;
        }

        if (!this.loading) this.loading = true;
        let formData = new FormData();

        formData.append("parent_id", this.selectedData.id);
        formData.append("title", this.selectedData.title);
        formData.append("desc", this.desc);

        services.ticket
          .create(formData)
          .then((response) => {
            this.desc = "";
            this.loading = false;
            this.setUnreadTicket();
            this.getAnswers();
            console.log(response);
          })
          .catch((error) => {
            this.loading = false;
            this.$toast.error(getErrorText(error));
            console.log(error, error.response);
          });
      },
    },
  };
</script>

<style scoped lang="scss">
  .answer {
    max-width: 70%;
  }

  .answers-parent {
    display: -webkit-flex;
    flex-direction: column-reverse;
    position: relative;
  }

  .answers-container {
    overflow-y: auto;
    max-height: 70vh;
  }

  .receiver-container {
    background: white;
    margin-left: 8px !important;

    &::after {
      content: "";
      width: 0;
      height: 0;
      border-top: 15px solid transparent;
      border-right: 16px solid white;
      border-bottom: 5px solid transparent;
      position: absolute;
      left: -11px;
      bottom: 15px;
      z-index: 0;
    }
  }

  .sender-container {
    background: var(--dark-secondary);
    color: white !important;
    margin-right: 8px !important;

    &::after {
      content: "";
      width: 0;
      height: 0;
      border-top: 15px solid transparent;
      border-left: 16px solid var(--dark-secondary);
      border-bottom: 5px solid transparent;
      position: absolute;
      right: -11px;
      bottom: 15px;
      z-index: 0;
    }
  }
</style>
