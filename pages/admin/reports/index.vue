<template>
  <span>
    <search-dynamic :schema="schema" :loading="loading" @onSearch="search" />
    <DataTable
      :headers="headers"
      :items="items"
      :loading="loading"
      :pagesLength="pagesLength"
      :subtitle="'مدیریت ' + title + ' ها'"
      :title="title + ' ها'"
      :hasButtons="false"
      @onPageChange="GetList"
    >
      <!-- :addTitle="'ایجاد ' + title + ' جدید'"
    :addPageRoute="destinationRoute + '/' + 'create'" -->
      <!-- @comment we do not need this -->
    </DataTable>
  </span>
</template>

<script>
  import services from "@/services";
  import { removeLastSlash } from "@/constants/CustomFunctions/String";
  import { adminFetch } from "@/mixins/admin/fetch";

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    mixins: [adminFetch],
    data() {
      return {
        title: " گزارش ",
        service: "report",
        destinationRoute: removeLastSlash(this.$route.path),
        modal: false,
        role: this.$store.state.userData.roleName,
        desc: null,
        loading: true,
        items: [],
        page: 1,
        path: null,
        searchModel: {},
        pathParams: {},
        pagesLength: 1,
        schema: {
          create_by: {
            label: "کاربر",
            type: "form-auto-complete",
            items: [],
            itemText: "full_name",
            itemValue: "id",
            loading: true,
            clearable: true,
            col: { cols: 6 },
          },
          model_id: {
            label: "آگهی",
            type: "form-auto-complete",
            items: [],
            itemText: "title",
            itemValue: "id",
            loading: true,
            clearable: true,
            col: { cols: 6 },
          },
        },
        headers: [
          { text: " کاربر گزارش دهنده ", value: "create_by.full_name" },

          {
            text: "پست گزارش شده",
            value: "model.title",
          },

          // { text: "توسط", value: "user_id" },

          { text: "توضیحات", value: "desc" },
        ],
      };
    },
    created() {
      this.GetList();
      this._getItems("create_by", "user");
      this._getItems("model_id", "property");
    },
    methods: {
      onDetailsClick(item) {
        window.open(this.localeRoute("/articles/" + item.slug), "_blank");
      },
      search(model) {
        this.searchModel = model;
        this.GetList();
      },
      GetList: function (
        page = this.$route.query?.page ? +this.$route.query?.page : 1,
      ) {
        if (!this.loading) this.loading = true;
        services[this.service]
          .get(null, {
            page,
            with: ["model", "createBy"],
            conditions: {
              // user_id: (this.role !== 'admin')?this.$store.state.userData.id:null,
              ...this.searchModel,
            },
          })
          .then((response) => {
            this.loading = false;
            this.pagesLength = response.data.last_page;
            this.path = response.data.path;
            this.items = response.data.data;
            this.pathParams.with = [];
          })
          .catch((error) => {
            this.loading = false;
            console.log("items", error.response);
          });
      },
      onEditClick(item) {
        this.$router.push(
          this.localeLocation({
            path: this.destinationRoute + "/edit/" + item.id,
          }),
        );
      },
      onDeleteClick(item) {
        this.$refs.itemsDialog.show(
          "ایا مایل به حذف '" + item.title + "' هستید؟",
          item,
        );
      },
      deleteItem(item) {
        if (!this.loading) this.loading = true;
        services[this.service]
          .destroy(item.id)
          .then((response) => {
            this.$toast.success(item.title + "با موفقیت حذف شد ");
            this.GetList();
          })
          .catch((error) => {
            this.$toast.error("مشکلی پیش آمد. لطفا دوباره تلاش کنید.");
            this.loading = false;
          });
      },
      updateItems(items) {
        this.items = items;
      },
    },
  };
</script>

<style></style>
