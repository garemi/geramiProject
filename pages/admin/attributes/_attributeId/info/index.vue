<template>
  <span>
    <message-dialog ref="dialogRef" @onConfirm="deleteItem" />
    <admin-attributes-action
      ref="createRef"
      @getList="GetList"
      :itemId="attributeId"
      v-model="dialog"
      :id="id"
      :newItems="newItems"
      v-if="dialog"
    />
    <DataTable
      :title="title + ' ها'"
      :subtitle="'مدیریت ' + title + ' ها'"
      :addTitle="'ایجاد ' + title + ' جدید'"
      :headers="headers"
      :items="items"
      :loading="loading"
      :pagesLength="pagesLength"
      @onPageChange="GetList"
      :hasButtons="false"
    >
      <template #headerTag="{ row }">
        <v-btn class="mx-2" dark color="success" @click="createEdit(null)">
          <v-icon small dark>mdi-plus</v-icon>
          وارد کردن مقادیر
        </v-btn>
      </template>
      <template #contentTag="{ row }">
        <td>{{ row.attribute_value }}</td>
        <!-- <td>
          {{ row?.attribute?.name }}
        </td> -->
        <td>
          <v-btn
            class="mx-2"
            small
            dark
            color="primary"
            @click="createEdit(row)"
          >
            <v-icon small dark>mdi-pen</v-icon>
            ویرایش
          </v-btn>
          <!-- deleteItem(row) -->
          <v-btn
            class="mx-2"
            small
            dark
            color="error"
            @click="onDeleteClick(row)"
          >
            <v-icon small dark>mdi-delete</v-icon>
            حذف
          </v-btn>
        </td>
      </template>
    </DataTable>
  </span>
</template>

<script>
  import services from "@/services";
  import { removeLastSlash } from "@/constants/CustomFunctions/String";
  import adminPanel from "@/layouts/admin-panel.vue";

  export default {
    components: { adminPanel },
    layout: "admin-panel",
    middleware: "authenticated",
    props: {
      name: String,
    },
    data() {
      return {
        title: this.$route.query.name,
        service: "attributeValue",
        destinationRoute: removeLastSlash(this.$route.path),
        modal: false,
        dialog: false,
        id: null,
        newItems: "",
        role: this.$store.state.userData.roleName,
        desc: null,
        loading: true,
        items: [],
        attributeId: this.$route.params.attributeId,

        page: 1,
        path: null,
        pathParams: {},
        pagesLength: 1,
        headers: [
          {
            text: "مقدار قبول شده",
            value: "accepted_value",
          },
          // {
          //   text: "نوع ورودی",
          //   value: "attribute.name",
          // },

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
      createEdit(val) {
        if (val != null) {
          this.id = val.id;
          this.newItems = val.accepted_value;
        } else {
          this.id = null;
          this.newItems = null;
        }
        this.dialog = true;
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
              attribute_id: this.attributeId,
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
        this.$refs.dialogRef.show(
          "ایا مایل به حذف '" + item.accepted_value + "' هستید؟",
          item,
        );
      },
      deleteItem(item) {
        if (!this.loading) this.loading = true;
        services[this.service]
          .destroy(item.id)
          .then((response) => {
            this.$toast.success(item.accepted_value + " با موفقیت حذف شد");
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
