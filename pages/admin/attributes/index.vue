<template>
  <span>
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
      <template #middleButtonTag="{ row }">
        <v-btn
          v-if="row.is_writeable == 0"
          class="mx-2"
          dark
          small
          color="grey"
          @click="openDetails(row)"
        >
          <v-icon small dark>mdi-apps</v-icon>
          وارد کردن مقادیر
        </v-btn>
      </template>
    </DataTable>
  </span>
</template>

<script>
  import services from "@/services";
  import { removeLastSlash } from "@/constants/CustomFunctions/String";

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    data() {
      return {
        title: "ویژگی",
        service: "attribute",
        destinationRoute: removeLastSlash(this.$route.path),
        modal: false,
        role: this.$store.state.userData.roleName,
        desc: null,
        loading: true,
        dialog: false,
        itemDialog: {},
        items: [],
        page: 1,
        path: null,
        pathParams: {},
        pagesLength: 1,
        headers: [
          {
            text: "عنوان",
            value: "name",
          },
          {
            text: "نوع ورودی",
            value: "is_writeable",
            conditionalValue: (row) =>
              row.is_writeable == "0" ? "انتخابی" : "قابل نوشتن توسط کاربر",
          },

          { text: "عملیات", value: "actions", sortable: false },
        ],
        // schema: [
        //   {
        //     type: "divider",
        //     title: "گزارش روزانه",
        //   },
        //   {
        //     title: "ساعت فعالیت ثبت شده‌ی امروز",
        //     key: "today_work_time",
        //     default: "0",
        //     conditionalValue: (val) => this.getTime(val),
        //   },
        //   {
        //     type: "divider",
        //     title: "گزارش ماهیانه",
        //   },
        //   {
        //     title: "ساعت فعالیت حضوری در ماه",
        //     key: "attendance_time",
        //     default: "0",
        //     conditionalValue: (val) => this.getTime(val),
        //   },
        // ],
      };
    },
    created() {
      this.GetList();
    },
    methods: {
      openDetails(item) {
        this.$router.push({
          path: this.destinationRoute + "/" + item.id + "/info",
          query: { name: item.name },
        });
      },
      onDetailsClick(item) {
        window.open(this.localeRoute("/articles/" + item.slug), "_blank");
      },
      GetList: function (
        page = this.$route.query?.page ? +this.$route.query?.page : 1,
      ) {
        if (!this.loading) this.loading = true;
        services[this.service]
          .get(null, {
            page,
            conditions: {
              // user_id: (this.role !== 'admin')?this.$store.state.userData.id:null,
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
          "ایا مایل به حذف '" + item.name + "' هستید؟",
          item,
        );
      },
      deleteItem(item) {
        if (!this.loading) this.loading = true;
        services[this.service]
          .destroy(item.id)
          .then((response) => {
            this.$toast.success(item.name + " با موفقیت حذف شد");
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
