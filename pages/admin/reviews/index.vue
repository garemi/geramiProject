<template>
  <data-table
    :title="title + ' ها'"
    :subtitle="'مدیریت ' + title + ' ها'"
    :addTitle="'ایجاد ' + title + ' جدید'"
    :addPageRoute="destinationRoute + '/' + 'create'"
    :headers="headers"
    :items="items"
    :loading="loading"
    :pagesLength="pagesLength"
    @onPageChange="getList"
    @onDeleteClick="onDeleteClick($event, 'id')"
    @onEditClick="onEditClick($event, 'id')"
  >
  </data-table>
</template>

<script>
  import services from "@/services";
  import { adminIndex } from "@/mixins/admin";
  import { showError } from "@/constants/messages";

  export default {
    mixins: [adminIndex],
    data() {
      return {
        title: "نظر",
        service: "review",
        headers: [
          {
            text: "پروژه",
            value: "project.title",
          },
          {
            text: "وضعیت",
            value: "status",
            component: "VChip",
            attributes: {
              small: true,
            },
          },
          { text: "عملیات", value: "actions", sortable: false },
        ],
      };
    },
    methods: {
      // CAUTION: use the same name as 'getList' here and don't change it!
      async getList(
        page = this.$route.query?.page ? +this.$route.query?.page : 1,
      ) {
        try {
          if (!services[this.service]) throw 628;

          const response = await services[this.service].get(null, {
            page,
            with: [],
            conditions: {},
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
