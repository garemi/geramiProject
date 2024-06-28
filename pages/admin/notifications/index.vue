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
    :isEditEnabled="false"
  >
  </DataTable>
</template>

<script>
  import services from "@/services";
  import { removeLastSlash } from "@/constants/CustomFunctions/String";

  const statusItems = [
    { id: "1", title: "رایگان" },
    { id: "2", title: "ویژه" },
    { id: "4", title: "محرمانه" },
    { id: "3", title: "متمایز" },
    { id: "5", title: "فوری" },
    { id: "7", title: "اسپانسر" },
    { id: "6", title: "تمام وقت" },
  ];

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    data() {
      return {
        title: " اطلاعیه ",
        service: "user",
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
            value: "data.title",
          },
          {
            text: "توضیح",
            value: "data.desc",
          },
          // { text: "توسط", value: "user_id" },
          { text: "کاربر", value: "notifiable.full_name" },
          { text: "عملیات", value: "actions", sortable: false },
        ],
      };
    },
    created() {
      this.GetList();
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
          .notifications(null, {
            page,
            conditions: {
              // user_id: (this.role !== 'admin')?this.$store.state.userData.id:null,
            },
          })
          .then((response) => {
            this.loading = false;

            this.pagesLength = response.data.notifications.last_page;
            this.path = response.data.notifications.path;
            this.items = response.data.notifications.data.map((item) => ({
              ...item,
              data: JSON.parse(item.data),
            }));

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
          .destroyNotification(item.id)
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
