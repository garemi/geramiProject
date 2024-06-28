<template>
  <v-card
    :disabled="loading || localLoading"
    :loading="loading || localLoading"
    :outlined="outlined"
    class="custom-shadow"
    elevation="0"
  >
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <template>
        <slot name="headerTag"></slot>
      </template>
      <v-btn
        v-if="addPageRoute || customRouteHandler"
        color="success"
        @click="
          addPageRoute ? $router.push(addPageRoute) : $emit('onAddRouteClicked')
        "
      >
        <v-icon>mdi-plus</v-icon>
        {{ addTitle }}
      </v-btn>
      <v-btn
        v-if="returnPageRoute"
        :to="returnPageRoute"
        class="mr-2"
        color="black"
        outlined
      >
        {{ returnTitle }}
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      {{ subtitle }}
    </v-card-subtitle>

    <v-data-table
      v-model="selected"
      :group-by="groupBy"
      :header-props="headerProps"
      :headers="mapHeaders"
      :item-key="itemKey"
      :items="items"
      :items-per-page="itemsPerPage"
      :search="search"
      :show-group-by="isShowGroup"
      :show-select="isShowSelect"
      :single-select="singleSelect"
      hide-default-footer
      loading-text="در حال بارگذاری... منتظر بمانید"
    >
      <template v-slot:top>
        <slot name="topActions"></slot>
      </template>
      <template slot="no-data">
        <div>هیچ اطلاعاتی ثبت نشده است</div>
      </template>
      <template v-if="items?.length > 0" v-slot:body="{ items }">
        <tbody>
          <tr v-for="(row, i) in items" :key="i">
            <td v-if="isShowSelect">
              <v-checkbox
                v-model="selected"
                :value="row"
                class="pa-0 ma-0"
                hide-details
              />
            </td>

            <slot :row="row" name="contentTag">
              <td v-for="(item, i) in headersExceptLastOne" :key="'data-' + i">
                <component
                  :is="item.component ?? 'span'"
                  :color="getColor(row, item)"
                  :src="getValue(row, item)"
                  v-bind="item.attributes"
                  v-on="item.on"
                >
                  {{ item.component == "VImg" ? "" : getValue(row, item) }}
                </component>
              </td>
            </slot>

            <td v-if="hasButtons">
              <slot :row="row" name="editButtonTag">
                <v-btn
                  v-if="isEditEnabled"
                  class="mx-2"
                  color="primary"
                  dark
                  small
                  elevation="0"
                  @click="onEditClick(row)"
                >
                  <v-icon dark small>mdi-pen</v-icon>
                  ویرایش
                </v-btn>
              </slot>

              <slot :row="row" name="middleButtonTag"></slot>

              <slot :row="row" name="removeButtonTag">
                <v-btn
                  v-if="isRemoveEnabled"
                  class="mx-2"
                  color="error"
                  dark
                  small
                  elevation="0"
                  @click="onDeleteClick(row)"
                >
                  <v-icon dark small>mdi-delete</v-icon>
                  {{ deleteText }}
                </v-btn>
              </slot>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <warning-dialog ref="dialogRef" @onConfirm="onDeleteClick" />
    <div class="text-center mt-8 pb-2">
      <Paginate
        v-if="pagesLength && paginationEnabled"
        v-model="page"
        :length="pagesLength"
        @input="handlePageChange"
      />
    </div>
  </v-card>
</template>

<script>
  import moment from "jalali-moment";
  import { getNestedProperty } from "@/constants/CustomFunctions/Array";
  import { removeLastSlash } from "@/constants/CustomFunctions/String";
  import { getStatusByName } from "@/constants/statuses";

  export default {
    data() {
      return {
        page: this.$route.query?.page ? +this.$route.query?.page : 1,
        selected: [],
        localLoading: false,
      };
    },
    props: {
      value: {
        type: Number,
        required: true,
      },
      /**
       * headers Object walkthrough
       *
       * @typedef Header
       *
       * @property {string} text                  => table heading text
       * @property {string} align                 => table heading alignment
       * @property {string} value                 => pick value from main object which is passed through data table (accept dotted values like 'user.full_name')
       * @property {Function} [conditionalValue]  => (optional) pick value from defined condition inside parent component
       * @property {string} [type]                => (optional) defines some custom changes on text (see 'getValueFromType' function)
       * @property {string} [dateFormat]          => (optional) define moment format if it is needed
       * @property {string} [postfix]             => (optional) add a postfix text after the value text
       *
       * @property {string} [component]           => (optional) define render component inside data table
       * @property {Object<any>} [attributes]     => (optional) render component attributes
       * @property {Object<any>} [on]             => (optional) render component events
       *
       */

      /**
       * @type {Array<Header>}
       */
      headers: {
        required: true,
        type: Array,
      },
      headerProps: {
        type: Object,
        default: () => ({
          sortByText: "مرتب سازی بر اساس",
        }),
      },
      items: {
        required: true,
        type: Array,
      },
      itemsPerPage: {
        type: Number,
        default: 15,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      paginationEnabled: {
        type: Boolean,
        default: true,
      },
      pagesLength: {
        type: Number,
        default: 1,
      },
      title: {
        required: true,
        type: String,
      },
      subtitle: {
        type: String,
        default: "",
      },
      addTitle: {
        required: false,
        type: String,
      },
      addPageRoute: {
        required: false,
      },
      returnTitle: {
        required: false,
        type: String,
      },
      returnPageRoute: {
        required: false,
      },
      search: {
        required: false,
      },
      isShowGroup: {
        required: false,
        default: false,
        type: Boolean,
      },
      isEditEnabled: {
        required: false,
        default: true,
        type: Boolean,
      },
      isRemoveEnabled: {
        required: false,
        default: true,
        type: Boolean,
      },
      groupBy: {
        required: false,
      },
      isShowSelect: {
        required: false,
        default: false,
        type: Boolean,
      },
      singleSelect: {
        required: false,
        default: false,
        type: Boolean,
      },
      itemKey: {
        required: false,
      },
      deleteText: {
        required: false,
        default: "حذف",
        type: String,
      },
      outlined: {
        type: Boolean,
        default: false,
      },
      customRouteHandler: {
        type: Boolean,
        default: false,
      },
      hasButtons: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      page: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
      mapHeaders() {
        return this.headers.map((header) => ({
          ...header,
          align: header.align || "end",
        }));
      },
      headersExceptLastOne() {
        return this.hasButtons ? this.mapHeaders.slice(0, -1) : this.mapHeaders;
      },
    },
    methods: {
      getValue(row, item) {
        if (
          item.conditionalValue &&
          typeof item.conditionalValue == "function"
        ) {
          return item.conditionalValue(row);
        } else if (item.value.includes(".")) {
          const property = getNestedProperty(row, item.value);
          return property
            ? this.getValueFromType(property, item)
            : item.default ?? "-";
        } else if (row[item.value])
          return this.getValueFromType(row[item.value], item);
        else return item.default ?? "-";
      },
      getValueFromType(text, item) {
        let finalText = "";

        switch (item?.type) {
          case "price":
            finalText = new Intl.NumberFormat().format(text);
            break;

          case "user_full_name":
            finalText = `${row[item.value]?.first_name ?? "-"} ${
              row[item.value]?.last_name ?? ""
            }`;
            break;

          case "date":
            finalText = moment(new Date(text)).format(
              item.dateFormat || "hh:mm jYYYY/jMM/jDD",
            );
            break;

          default:
            finalText = text;
            break;
        }

        finalText = (finalText + "")?.trim() || "-";

        if (item.postfix) finalText += ` ${item.postfix}`;

        return finalText;
      },
      getColor(row, item) {
        if (item.type == "status" || item.value == "status")
          return getStatusByName(this.getValue(row, item))?.color ?? "primary";

        const color = item.attributes?.color;
        if (typeof color != "function") return color ?? "primary";
        return color(row);
      },
      onEditClick(item) {
        this.$emit("onEditClick", item);
      },
      checkDeleteConfirmation(item) {
        if (item?.name) {
          this.$refs.dialogRef.show(
            "ایا مایل به حذف '" + item.name + "' هستید؟",
            item,
          );
        } else if (item?.title) {
          this.$refs.dialogRef.show(
            "ایا مایل به حذف '" + item.title + "' هستید؟",
            item,
          );
        } else {
          this.$refs.dialogRef.show("ایا مایل به حذف این آیتم هستید؟", item);
        }
      },
      handlePageChange(page) {
        this.page = page;

        this.$router.replace({
          path: removeLastSlash(this.$route.path),
          query: {
            ...this.$route.query,
            page,
          },
        });

        this.$emit("onPageChange", page);

        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 200);
      },
      onDeleteClick(item) {
        this.$emit("onDeleteClick", item);
      },
    },
  };
</script>

<style></style>
