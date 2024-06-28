<template>
  <v-container>
    <tickets-content-dialog
      v-model="showDialog"
      :selectedData="selectedData"
      isUser
      @getList="getList"
    />

    <tickets-new-dialog v-model="showCreateDialog" @getList="getList" />
    <common-sub-header title="پشتیبانی">
      <v-btn color="gray" fab small icon @click="showCreateDialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </common-sub-header>
    <v-row class="overflow-auto mt-4" justify="center">
      <!-- UserConversations -->
      <template v-if="loading">
        <v-col
          v-for="i in 6"
          :key="i"
          class="py-0 mb-2 cursor-pointer with-transition white-bg rounded-xl"
          cols="11"
        >
          <v-skeleton-loader type="list-item-avatar-three-line" />
        </v-col>
      </template>
      <template v-else-if="items.length">
        <v-col
          v-for="(item, i) in items"
          :key="i"
          class="py-0 mb-2 cursor-pointer with-transition white-bg rounded-xl"
          cols="11"
          @click.prevent.stop="openChat(item)"
        >
          <div
            class="d-flex align-center justify-end my-3 white-bg rounded-pill pa-2"
          >
            <div>
              <v-avatar>
                <img
                  :src="require('@/assets/img/admin-tickets.png')"
                  alt="image"
                />
              </v-avatar>
            </div>
            <div class="d-flex flex-column mx-4 flex-1 mt-1">
              <div class="d-flex justify-space-between align-center">
                <span
                  :class="$isRTL() ? 'text-left' : 'text-left'"
                  class="text-left md-text"
                >
                  {{ item.title }}
                </span>
                <div class="d-flex align-center sm-text">
                  <v-icon class="mx-1" x-small color="black">
                    mdi-clock-time-eight-outline
                  </v-icon>
                  <span>
                    {{ item?.last_message?.updated_at | moment("dddd  HH:mm") }}
                  </span>
                </div>
              </div>
              <div class="d-flex align-center">
                <p
                  :class="item.last_message?.is_read ? '' : 'font-weight-bold'"
                  class="md-text one-line-text"
                >
                  {{ item.desc }}
                </p>
              </div>
            </div>
          </div>
        </v-col>
      </template>
      <no-item v-else expandViewport />
    </v-row>
  </v-container>
</template>

<script>
  import services from "@/services";
  import { adminIndex } from "@/mixins/admin";
  import { showError } from "@/constants/messages";

  export default {
    mixins: [adminIndex],
    layout: "users-panel",
    data() {
      return {
        title: "پشتیبانی",
        service: "ticket",
        selectedData: {},
        showDialog: false,
        showCreateDialog: false,
      };
    },
    methods: {
      openChat(row) {
        this.selectedData = row;
        this.showDialog = true;
      },
      // CAUTION: use the same name as 'getList' here and don't change it!
      async getList(
        page = this.$route.query?.page ? +this.$route.query?.page : 1,
      ) {
        try {
          if (!services[this.service]) throw 628;

          const response = await services[this.service].get(null, {
            page,
            with: ["createBy", "parent"],
            conditions: {
              create_by: this.$store.state?.userData?.id,
              parent_id: null,
            },
          });

          this.pagesLength = response.data.last_page;
          this.items = response.data.data;
        } catch (error) {
          showError(error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
</script>
