<template>
  <DataTable
    :title="title + ' ها'"
    :subtitle="'مدیریت ' + title + ' ها'"
    :addTitle="'ایجاد ' + title + ' جدید'"
    :addPageRoute="destinationRoute + '/' + 'create'"
    :headers="headers"
    :items="items"
    :loading="loading"
    :pagesLength="pagesLength"
    @onPageChange="GetList"
    @onDeleteClick="deleteItem"
    @onEditClick="onEditClick"
  >
  </DataTable>
</template>

<script>
  import services from "@/services";
  import { removeLastSlash } from "@/constants/CustomFunctions/String";
  import { statuses } from "@/constants/statuses";

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    data() {
      return {
        title: "دسته بندی ",
        service: "category",
        allowTypes: ["project", "course", "post"], // witch part has category you should add in create and edit too
        destinationRoute: removeLastSlash(this.$route.path),
        modal: false,
        role: this.$store.state.userData.roleName,
        desc: null,
        loading: true,
        items: [],
        page: 1,
        path: null,
        pathParams: {},
        pagesLength: 1,
        headers: [
          {
            text: "عنوان",
            value: "title",
          },
          // { text: "توسط", value: "user_id" },
          { text: " کاربر ", value: "createby.full_name" },
          { text: " ترتیب ", value: "order" },

          {
            text: "وضعیت",
            value: "status",
            component: "VChip",
            attributes: {
              small: true,
              color: (item) =>
                item.status == "فعال"
                  ? "success"
                  : item.status == "در حال بررسی"
                  ? "blue"
                  : "red",
            },
          },

          { text: "عملیات", value: "actions", sortable: false },
        ],
      };
    },
    created() {
      if (this.allowTypes.find((value) => this.$route.params.type == value)) {
        this.GetList();
      } else {
        this.$router.push("/");
      }
    },
    methods: {
      onDetailsClick(item) {
        window.open(this.localeRoute("/articles/" + item.slug), "_blank");
      },
      GetList: function (
        page = this.$route.query?.page ? +this.$route.query?.page : 1,
      ) {
        if (!this.loading) this.loading = true;
        services[this.service]
          .getWithType(this.$route.params.type, null, {
            page,
            with: ["createby"],
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
