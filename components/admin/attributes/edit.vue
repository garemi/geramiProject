<template>
  <div class="attribute">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.smAndDown"
      v-model="dialog"
      width="500"
    >
      <v-card>
        <!-- {{ selectedItem }} -->
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
          <v-row>
            <!-- v-if="is_writeable == '1'" -->
            <v-col
              cols="12"
              v-if="is_writeable == 1"
              class="d-flex flex-column"
            >
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
            </v-col>
            <v-col v-else cols="12">
              <v-text-field
                v-if="isDefault === 1"
                v-model="searchText"
                label="جستجو"
                outlined
                dense
              >
              </v-text-field>

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
              <div v-if="showNoResultsMessage">
                <p class="text-center black--text pa-8">موردی یافت نشد.</p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn @click="show" elevation="0" text>
      <span v-if="model">
        {{ is_writeable == "1" ? model + suffix : model?.attribute_value }}
      </span>
      <span v-if="selected.static_value || selected.value || isNewSelected">
        {{ isNewSelected || selected?.value?.attribute_value }}
      </span>
      <span v-else>{{ attribute_value }}</span>
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      value: String,
      items: Array,
      isDefault: Boolean,
      nameTitle: String,
      selected: {
        default: {},
        type: Object,
      },
      is_writeable: Number,
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
    watch: {
      selected() {
        this.model = this.selected.static_value;
        // this.selectedItem = this.selected.id;
        this.selectedItem = this.selected.attribute_value_id;
        this.$emit("attributeId", this.selectedItem);
        return this.selectedItem;
      },
    },
    data() {
      return {
        dialog: false,
        searchText: "",
        selectedItem: "",
        showNoResultsMessage: false,
      };
    },
    methods: {
      selectItem(itemId) {
        this.selectedItem = this.items?.find((item) => item?.id === itemId).id;
        this.$emit("attributeId", itemId);
        if (this.selectedItem) {
          this.model = this.selectedItem;
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
      isNewSelected() {
        // this.selected?.value?.attribute_value;
        if (this.selectedItem) {
          const value = this.items.find((val) => val.id == this.selectedItem);
          console.log("value", value);
          return value?.attribute_value;
        }
        if (this.selected && this.selected.value) {
          return this.selected.value.attribute_value;
        }
      },
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
            // isSelected: item?.id == this.model?.id,
            isSelected: this.selectedItem == item?.id,
          }))
          .filter((item) => item?.attribute_value?.includes(this.searchText));
        // === this.model?.id,
        this.showNoResultsMessage = filtered?.length === 0;
        return filtered;
      },
      showNoResultsMessage: {
        default: false,
      },
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
