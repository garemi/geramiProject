<template>
  <div>
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
    <data-table
      :addPageRoute="destinationRoute + '/' + 'create'"
      :addTitle="'ایجاد ' + title + ' جدید'"
      :headers="headers"
      :items="items"
      :loading="loading"
      :pagesLength="pagesLength"
      :subtitle="'مدیریت ' + title + ' ها'"
      :title="title + ' ها'"
      @onDeleteClick="onDeleteClick($event, 'id')"
      @onEditClick="onEditClick($event, 'id')"
      @onPageChange="getList"
    >
    </data-table>
  </div>
</template>

<script>
  import services from "@/services";
  import { adminIndex } from "@/mixins/admin";
  import { showError } from "@/constants/messages";
  import { adminFetch } from "@/mixins/admin/fetch";

  export default {
    mixins: [adminIndex, adminFetch],
    data() {
      return {
        title: "پیشنهاد",
        service: "proposal",
        headers: [
          {
            text: "نام",
            value: "property.title",
          },
          {
            text: "تصویر",
            value: "property.image.url",
            component: "VImg",
            attributes: {
              height: "100px",
              width: "100px",
            },
          },
          {
            text: "کاربر پیشنهاد داده",
            value: "createby.full_name",
          },
          {
            text: "قیمت پیشنهاد شده",
            value: "price",
            type: "price",
            postfix: "تومان",
          },
          { text: "عملیات", value: "actions", sortable: false },
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
          property_id: {
            type: "form-auto-complete",
            label: "بر اساس نام",
            col: { cols: 12, sm: 4 },
            items: [],
            itemText: "title",
            itemValue: "id",
            loading: true,
            clearable: true,
            class: "rounded-lg",
          },
        },
      };
    },
    created() {},
    methods: {
      async getList(
        page = this.$route.query?.page ? +this.$route.query?.page : 1,
      ) {
        try {
          this.loading = true;
          if (!services[this.service]) throw 628;

          const response = await services[this.service].get(null, {
            page,
            with: ["property.image", "createby"],
            conditions: {
              create_by: this.model.user_id || undefined,
              property_id: this.model.property_id || undefined,
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