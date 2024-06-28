<template>
  <div class="attribute">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.smAndDown"
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          <v-row no-gutters class="px-0">
            <v-col cols="2" class="pa-0"></v-col>
            <v-col cols="8" class="pa-0">
              <h3 class="text-center my-2">{{ nameTitle }}</h3>
            </v-col>
            <v-col cols="2" class="pa-0 d-flex">
              <v-spacer />
              <v-icon @click="closeDialog()" class="my-2 cursor-pointer">
                mdi-close
              </v-icon>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <div v-if="is_writeable == '1'" class="d-flex flex-column">
            <v-text-field
              v-model="model"
              outlined
              dense
              :label="placeHolder"
              :suffix="suffix"
            >
            </v-text-field>
            <v-btn
              color="var(--green)"
              @click="setModelFromTextField"
              elevation="0"
              class="px-16 white--text text-left"
            >
              ثبت
            </v-btn>
          </div>

          <div v-else>
            <v-text-field
              v-if="isDefault === 1"
              v-model="searchText"
              label="جستجو"
              outlined
              dense
            >
            </v-text-field>
            <v-row>
              <v-col cols="12" v-for="(item, i) in filteredItems" :key="i">
                <v-btn
                  :class="{ 'white--text': item.isSelected }"
                  :color="item.isSelected ? 'var(--text-800)' : ''"
                  block
                  elevation="0"
                  @click="selectItem(item?.id)"
                >
                  {{ item.attribute_value }}
                </v-btn>
              </v-col>
              <v-row v-if="showNoResultsMessage">
                <v-col cols="12">
                  <p class="text-center black--text pa-8">موردی یافت نشد.</p>
                </v-col>
              </v-row>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn @click="show" elevation="0" text>
      <span v-if="model">
        {{ is_writeable == "1" ? model + suffix : model?.attribute_value }}
      </span>
      <span v-else>{{ attribute_value }}</span>
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      value: [Object, String],
      items: Array,
      isDefault: Boolean,
      nameTitle: String,
      is_writeable: [Boolean, Number],
      suffix: {
        type: String,
        require: true,
      },
      placeHolder: {
        type: String,
        require: true,
      },
      attribute_value: {
        type: String,
        default: "انتخاب",
      },
      // accepted: {
      //   type: String,
      //   default: "انتخاب",
      // },
    },
    data() {
      return {
        dialog: false,
        searchText: "",
        showNoResultsMessage: false,
      };
    },
    methods: {
      selectItem(itemId) {
        const selectedItem = this.items?.find((item) => item?.id === itemId);
        if (selectedItem) {
          this.model = selectedItem;
          this.dialog = false;
        }
      },
      show() {
        this.searchText = "";
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
      },
      setModelFromTextField() {
        //this.model = this.searchText;
        this.dialog = false;
      },
    },

    computed: {
      model: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
      filteredItems() {
        const filtered = this.items
          ?.map((item) => ({
            ...item,
            isSelected: item?.id === this.model?.id,
          }))
          .filter((item) => item?.attribute_value?.includes(this.searchText));

        this.showNoResultsMessage = filtered?.length === 0;
        return filtered;
      },
      // showNoResultsMessage() {
      //   return this.filteredItems.length === 0;
      // },
    },
  };
</script>
<style>
  .attribute
    .v-text-field
    > .v-input__control
    > .v-input__slot
    > .v-text-field__slot {
    margin-top: 5px;
  }
</style>
