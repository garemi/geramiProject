<template>
  <v-col :cols="12" class="pa-2">
    <div class="grey--text text-right">
      {{ label }}
      <span class="error--text" v-if="$attrs.required">*</span>
    </div>
    <v-text-field
      :background-color="
        !noBackground ? ($attrs.disabled ? 'grey' : backgroundColor) : undefined
      "
      hide-details="auto"
      flat
      solo
      class="rounded-pill"
      v-model="tag"
      v-bind="$attrs"
      hint="برای ثبت دکمه Enter را فشار دهید"
      persistent-hint
      :type="password ? (show_password ? 'text' : 'password') : $attrs.type"
      :append-icon="
        password
          ? show_password
            ? 'mdi-eye'
            : 'mdi-eye-off'
          : $attrs.appendIcon
      "
      @click:append="onAppendClick"
      label=""
      @keyup.enter="tagAction()"
    />

    <div class="d-flex flex-wrap">
      <div v-for="(item, i) in inputVal" :key="'tag' + i" class="d-flex ma-2">
        <v-chip @click="removeTag(item)">
          {{ item }}
          <v-icon> mdi-close </v-icon>
        </v-chip>
      </div>
    </div>
  </v-col>
</template>

<script>
  export default {
    data() {
      return {
        show_password: false,
        tag: "",
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
      password: {
        type: Boolean,
        default: false,
      },
      noBackground: {
        type: Boolean,
        default: false,
      },
      backgroundColor: {
        type: String,
        default: "grey lighten-2",
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
    },
    methods: {
      removeTag(item) {
        console.log("item", item);
        let minus = this.inputVal.indexOf(item);
        this.inputVal.splice(minus, 1);
        console.log("tags", this.inputVal);
      },
      tagAction() {
        console.log("tag", this.tag);

        if (this.tag != undefined && this.tag != "") {
          this.inputVal.push(this.tag);
          console.log("tags", this.inputVal);
          this.tag = "";
          console.log("tag", this.tag);
        }
      },
      onAppendClick() {
        this.show_password = !this.show_password;
      },
    },
  };
</script>

<style></style>
