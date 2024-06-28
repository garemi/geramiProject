<template>
  <v-col :cols="12" class="pa-2">
    <div class="grey--text text-right">
      {{ label }}
      <span class="error--text" v-if="$attrs.required">*</span>
    </div>
    <v-autocomplete
      :background-color="$attrs.disabled ? 'grey' : backgroundColor"
      solo
      hide-details="auto"
      flat
      class="rounded-xl"
      v-model="inputVal"
      v-bind="$attrs"
      :chips="multiple"
      :multiple="multiple"
    >
      <template #prepend-item>
        <v-list-item
          v-if="multiple && withSelectAll && $attrs.items?.length"
          class="cursor-pointer"
          @click="selectAll"
        >
          {{ isAllSelected ? "حذف همه" : "انتخاب همه" }}
        </v-list-item>
      </template>
      <template
        v-if="$attrs.chips"
        #selection="{ item, index, selected, attrs }"
      >
        <v-chip
          v-if="index < showChips"
          v-bind="attrs"
          :input-value="selected"
          close
          @click:close="remove(item)"
          color="var(--primary)"
          dark
          small
        >
          {{ item[$attrs.itemText] }}
        </v-chip>
        <small v-else-if="index == showChips">
          (+{{ inputVal.length - showChips }} مورد دیگر)
        </small>
      </template>
      <template #append-item>
        <div v-if="addFunction" class="mt-2 px-2 text-center">
          <v-btn
            v-if="typeof addFunction == 'function'"
            elevation="0"
            block
            :color="'#a0ffd7'"
            @click="addFunction(search)"
          >
            <v-icon small>mdi-plus</v-icon>
            {{ addText }}
          </v-btn>
        </div>
      </template>
      <template #no-data>
        <v-list-item>
          <small> موردی برای نمایش وجود ندارد </small>
        </v-list-item>
      </template>
    </v-autocomplete>
  </v-col>
</template>

<script>
  const showChips = 4;

  export default {
    data() {
      return {
        showChips,
      };
    },
    props: {
      value: {
        required: true,
      },
      label: {
        type: String,
        required: false,
      },
      backgroundColor: {
        type: String,
        default: "grey lighten-2",
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      withSelectAll: {
        type: Boolean,
        default: false,
      },
      addFunction: {
        type: Function | undefined,
        default: undefined,
      },
      addText: {
        type: String,
        default: "اضافه کردن",
      },
    },
    methods: {
      remove(item) {
        this.inputVal = this.inputVal.filter(
          (val) => val !== item[[this.$attrs.itemValue]],
        );
      },
      selectAll() {
        if (this.inputVal?.length == this.$attrs.items?.length)
          this.inputVal = [];
        else
          this.inputVal = this.$attrs.items.map(
            (item) => item[this.$attrs.itemValue],
          );
      },
    },
    computed: {
      inputVal: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        },
      },
      isAllSelected() {
        return this.$attrs.items?.length == this.inputVal.length;
      },
    },
  };
</script>

<style></style>
