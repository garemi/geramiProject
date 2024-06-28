<template>
  <div>
    <search-dynamic :schema="schema" :loading="loading" @onSearch="search" />
    <v-tabs v-if="!$route.query.type" centered>
      <v-tab @click="changeType(undefined)">تمامی آگهی ها</v-tab>
      <v-tab @click="changeType('seller')">آگهی های مغازه دار ها</v-tab>
      <v-tab @click="changeType('user')">آگهی کاربران</v-tab>
    </v-tabs>
    <DataTable
      :addPageRoute="destinationRoute + '/' + 'create'"
      :addTitle="'ایجاد ' + title + ' جدید'"
      :headers="headers"
      :items="items"
      :loading="loading"
      :pagesLength="pagesLength"
      :subtitle="'مدیریت ' + title + ' ها'"
      :title="title + ' ها'"
      @onDeleteClick="deleteItem"
      @onEditClick="onEditClick"
      @onPageChange="GetList"
    >
    </DataTable>
  </div>
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
        title: "محصول",
        service: "property",
        destinationRoute: removeLastSlash(this.$route.path),
        modal: false,
        show: false,
        schema: {
          create_by: {
            label: "بر اساس کاربر",
            type: "form-auto-complete",
            col: { cols: 4 },
            items: [],
            itemText: "full_name",
            itemValue: "id",
            loading: true,
            clearable: true,
          },
          title: {
            type: "form-text-field",
            label: "بر اساس نام",
            col: { cols: 12, sm: 4 },
          },
        },
        role: this.$store.state.userData.roleName,
        desc: null,
        loading: true,
        items: [],
        page: 1,
        type: this.$route.query.type || undefined,
        path: null,
        pathParams: {},
        pagesLength: 1,
        searchModel: {},
        headers: [
          {
            text: "تصویر",
            value: "image.url",
            component: "VImg",
            attributes: {
              height: "100px",
              width: "100px",
            },
          },
          {
            text: "عنوان",
            value: "title",
          },
          {
            text: "شماره تلفن",
            value: "createby.cellphone",
          },
          { text: " کاربر ", value: "createby.full_name" },

          {
            text: "وضعیت",
            value: "status.name",
            component: "VChip",
            attributes: {
              small: true,
            },
          },
          { text: "عملیات", value: "actions", sortable: false },
        ],
      };
    },
    created() {
      this.GetList();
      this._getItems("create_by", "user");
    },
    methods: {
      changeType(type) {
        this.type = type;
        this.GetList(1, type);
      },
      onDetailsClick(item) {
        window.open(this.localeRoute("/articles/" + item.slug), "_blank");
      },
      search(model = {}) {
        this.searchModel = model;
        this.GetList();
      },
      GetList: function (
        page = this.$route.query?.page ? +this.$route.query?.page : 1,
        type = this.type,
      ) {
        if (!this.loading) this.loading = true;
        services[this.service]
          .get(null, {
            page,
            type,
            with: ["createby", "image"],
            conditions: this.searchModel,
          })
          .then((response) => {
            this.loading = false;
            this.pagesLength = response.data.last_page;
            this.path = response.data.path;
            this.items = response.data.data;
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
