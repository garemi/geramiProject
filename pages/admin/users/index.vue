<template>
  <span>
    <dialog-image v-model="showImageDialog" :URL="imageURL" />
    <v-tabs v-if="!$route.query.type" centered>
      <v-tab @click="changeType(undefined)">همه کاربران</v-tab>
      <v-tab @click="changeType('user')">کاربران عادی</v-tab>
      <v-tab @click="changeType('seller')">کاربران مغازه دار</v-tab>
    </v-tabs>
    <v-card
      :disabled="searchLoading"
      :loading="searchLoading"
      class="my-3 custom-shadow"
    >
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
          <v-form ref="form" @keyup.native.enter="searchFunction">
            <v-form-base
              id="searchForm"
              :col="{ cols: 12 }"
              :model="searchModel"
              :row="{
                justify: 'start',
                align: 'start',
                noGutters: false,
              }"
              :schema="searchSchema"
            >
              <template #slot-bottom-searchForm>
                <v-row class="pa-3">
                  <v-spacer></v-spacer>
                  <!-- class="mb-3 ml-5" -->
                  <v-btn
                    :loading="searchLoading"
                    class="mt-11 ml-4"
                    color="success"
                    dark
                    @click="searchFunction"
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
    <admin-user-avatar v-model="dialog" :item="itemDialog" />
    <admin-user-avatar
      v-model="dialogCover"
      :cover="true"
      :item="itemDialogCover"
    />
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
      <template #middleButtonTag="{ row }">
        <v-btn
          class="mx-2"
          color="var(--green)"
          small
          elevation="0"
          :disabled="!row.javaz && !row.authentication_doc"
          @click="openImageDialog(row)"
        >
          <v-icon dark small>mdi-file-document-multiple-outline</v-icon>
          {{
            row.javaz
              ? "مدارک"
              : row.authentication_doc
              ? "کارت ملی"
              : "بدون مدرک"
          }}
        </v-btn>
        <v-btn
          v-if="row.javaz"
          class="mx-2"
          color="var(--primary)"
          dark
          small
          elevation="0"
          @click="changeStatus(row, 2)"
        >
          <v-icon dark small>mdi-check</v-icon>
          تایید
        </v-btn>
        <v-btn
          v-if="row.javaz"
          class="mx-2"
          color="var(--secondary)"
          dark
          small
          elevation="0"
          @click="changeStatus(row, 1)"
        >
          <v-icon dark small>mdi-check</v-icon>
          رد
        </v-btn>
      </template>
    </DataTable>
  </span>
</template>

<script>
  import services from "@/services";
  import { removeLastSlash } from "@/constants/CustomFunctions/String";
  import { showError } from "@/constants/messages";

  export default {
    layout: "admin-panel",
    middleware: "authenticated",
    data() {
      return {
        dialog: false,
        dialogCover: false,
        title: "کاربر",
        itemDialog: {},
        itemDialogCover: {},
        service: "user",
        destinationRoute: removeLastSlash(this.$route.path),
        modal: false,
        role: this.$store.state.userData.roleName,
        desc: null,
        loading: true,
        items: [],
        page: 1,
        showImageDialog: false,
        imageURL: "",
        type: this.$route.query.type || undefined,
        path: null,
        pathParams: {},
        pagesLength: 1,
        headers: [
          {
            text: "نام",
            value: "full_name",
          },
          {
            text: "شماره",
            value: "cellphone",
          },
          {
            text: "وضعیت احراز مغازه",
            value: "shop_status",
            component: "VChip",
            attributes: {
              small: true,
              dark: true,
              color: (row) =>
                row.shop_javaz
                  ? row.shop_status == "0"
                    ? "primary"
                    : row.shop_status == "1"
                    ? "error"
                    : "success"
                  : "black",
            },
            conditionalValue: (row) =>
              row.shop_javaz
                ? row.shop_status == "0"
                  ? "در حال بررسی"
                  : row.shop_status == "1"
                  ? "رد شده"
                  : "احراز شده"
                : "بدون نیاز به احراز",
          },
          { text: " مدل ", value: "model_type" },
        ],
        searchLoading: false,
        show: false,
        searchModel: {
          cellphone: "",
          name: "",
        },
        searchSchema: {
          cellphone: {
            type: "form-text-field",
            label: "شماره تماس",
            col: { cols: 12, sm: 4 },
          },
          name: {
            type: "form-text-field",
            label: "نام",
            col: { cols: 12, sm: 4 },
          },
        },
      };
    },
    created() {
      this.GetList();
    },
    methods: {
      openImageDialog(row) {
        this.imageURL = row.javaz?.url ?? row.authentication_doc?.url;
        this.showImageDialog = true;
      },
      openDetails(row) {
        this.itemDialog = row;
        this.dialog = true;
        console.log("add", this.addModal);
      },
      openCoverCheck(row) {
        this.itemDialogCover = row;
        this.dialogCover = true;
      },
      onDetailsClick(item) {
        window.open(this.localeRoute("/articles/" + item.slug), "_blank");
      },
      changeStatus(row, shop_status) {
        this.loading = true;
        services.user
          .update(
            {
              shop_status,
            },
            row.id,
          )
          .then((response) => {
            this.GetList();
          })
          .catch((error) => {
            console.log(error);
            showError(error);
            this.loading = false;
          });
      },
      GetList: function (
        page = this.$route.query?.page ? +this.$route.query?.page : 1,
        type = this.type,
      ) {
        if (!this.loading) this.loading = true;
        services[this.service]
          .get(null, {
            page,
            with: ["javaz", "authentication_doc"],
            type,
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
      changeType(type) {
        this.type = type;
        this.GetList(1, type);
      },
    },
  };
</script>

<style></style>
