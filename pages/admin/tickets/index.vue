<template>
  <span>
    <tickets-content-dialog
      v-model="showDialog"
      :selectedData="selectedData"
      @getList="getList"
    />
    <data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :pagesLength="pagesLength"
      :subtitle="'مدیریت ' + title + ' ها'"
      :title="title + ' ها'"
      :isRemoveEnabled="false"
      :isEditEnabled="false"
      @onPageChange="getList"
    >
      <template #middleButtonTag="{ row }">
        <v-btn icon fab small color="primary" @click="openChat(row)">
          <v-icon> mdi-message-text </v-icon>
        </v-btn>
      </template>
    </data-table>
  </span>
</template>

<script>
  import services from "@/services";
  import { adminIndex } from "@/mixins/admin";
  import { showError } from "@/constants/messages";

  export default {
    mixins: [adminIndex],
    data() {
      return {
        title: "پشتیبانی",
        service: "ticket",
        selectedData: {},
        showDialog: false,
        headers: [
          {
            text: "عنوان",
            value: "title",
          },
          {
            text: "عنوان",
            value: "title",
          },
          {
            text: "وضعیت",
            conditionalValue: (row) =>
              row.status == 0 ? "در انتظار پاسخ" : "پاسخ داده شده",
            component: "VChip",
            attributes: {
              small: true,
              color: (row) => (row.status == 0 ? "error" : "primary"),
            },
          },
          { text: "عملیات", value: "actions", sortable: false },
        ],
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
            with: ["createBy"],
            conditions: {
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
