<template>
  <div>
    <details-dialog
      v-model="detailsDialog"
      :data="itemDialog"
      :schema="detailsSchema"
      title="جزئیات خرید"
    />
    <v-card :disabled="loading" :loading="loading" class="my-3 custom-shadow">
      <v-card-title class="cursor-pointer" @click.stop="show = !show">
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <h5 class="mr-3">جستجو</h5>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-expand-transition>
        <v-card-text v-show="show" class="ma-2">
          <v-form ref="form" @keyup.native.enter="getList()">
            <v-form-base
              id="searchForm"
              :col="{ cols: 12 }"
              :model="model"
              :row="{
                justify: 'start',
                align: 'start',
                noGutters: false,
              }"
              :schema="schema"
            >
              <template #slot-bottom-searchForm>
                <v-row class="pa-3">
                  <v-spacer></v-spacer>
                  <!-- class="mb-3 ml-5" -->
                  <v-btn
                    :loading="loading"
                    class="mt-11 ml-4"
                    color="success"
                    dark
                    @click="getList()"
                  >
                    جستجو
                  </v-btn>
                </v-row>
              </template>
            </v-form-base>
          </v-form>
        </v-card-text>
      </v-expand-transition>
    </v-card>
    <DataTable
      :addPageRoute="destinationRoute + '/' + 'create'"
      :addTitle="'ایجاد ' + title + ' جدید'"
      :headers="headers"
      :items="items"
      :loading="loading"
      :pagesLength="pagesLength"
      :subtitle="'مدیریت ' + title + ' ها'"
      :title="title + ' ها'"
      :isEditEnabled="false"
      :isRemoveEnabled="false"
      @onPageChange="getList"
    >
      <template #middleButtonTag="{ row }">
        <v-btn color="primary" elevation="0" small @click="onDetailsClick(row)">
          جزئیات
        </v-btn>
      </template>
    </DataTable>
  </div>
</template>

<script>
  import services from "@/services";
  import { removeLastSlash } from "@/constants/CustomFunctions/String";
  import { adminIndex } from "@/mixins/admin";
  import { adminFetch } from "@/mixins/admin/fetch";

  export default {
    layout: "admin-panel",
    mixins: [adminIndex, adminFetch],
    middleware: "authenticated",
    data() {
      return {
        title: "پرداخت",
        service: "payment",
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
            value: "model.title",
          },
          // { text: "توسط", value: "user_id" },
          { text: " کاربر ", value: "user.full_name" },

          {
            text: "وضعیت",
            value: "status",
            type: "status",
            component: "VChip",
            attributes: {
              small: true,
            },
          },
          { text: " عملیات ", value: "user.full_name" },
        ],
        searchLoading: false,
        show: false,
        model: {
          user_id: "",
          name: "",
        },
        schema: {
          user_id: {
            label: "بر اساس کاربر",
            type: "form-auto-complete",
            col: { cols: 4 },
            items: [],
            itemText: "full_name",
            itemValue: "id",
            loading: true,
            clearable: true,
            class: "rounded-lg",
          },
          name: {
            type: "form-text-field",
            label: "وضعیت",
            col: { cols: 12, sm: 4 },
          },
        },
        itemDialog: null,
        detailsDialog: false,
        detailsSchema: [
          {
            type: "divider",
            title: "اطلاعات کاربر",
          },
          {
            title: "نام و نام خانوادگی",
            key: "user.full_name",
          },
          {
            title: "تلفن همراه",
            key: "user.cellphone",
          },
          {
            title: "آدرس",
            key: "address.address",
          },
          {
            type: "divider",
            title: "اطلاعات محصول",
          },
          {
            title: "مبلغ کل",
            key: "price",
            type: "price",
            postfix: "تومان",
            default: "0",
          },
          {
            title: "عنوان محصول",
            key: "model.title",
          },
          {
            type: "divider",
            title: "اطلاعات پرداخت",
          },
          {
            title: "وضعیت",
            key: "status",
          },
          {
            title: "تاریخ پرداخت",
            key: "created_at",
            type: "date",
          },
          {
            title: "رفرنس پرداخت",
            key: "ref_id",
          },
          {
            title: "ای دی پرداخت",
            key: "transaction_id",
            colAttributes: {
              cols: 12,
            },
          },
        ],
      };
    },
    created() {
      this.getList();
    },
    methods: {
      onDetailsClick(item) {
        this.itemDialog = item;
        this.detailsDialog = true;
      },
      getList: function (
        page = this.$route.query?.page ? +this.$route.query?.page : 1,
      ) {
        if (!this.loading) this.loading = true;
        services[this.service]
          .get(null, {
            page,
            with: ["user"],
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
            this.getList();
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
