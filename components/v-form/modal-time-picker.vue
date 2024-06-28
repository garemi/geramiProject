<template>
  <v-container fluid class="pa-2">
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="time"
      persistent
      width="290px"
      v-bind="$attrs"
    >
      <template v-slot:activator="{ on, attrs }">
        <div v-if="label">
          {{ label }}
          <span class="error--text" v-if="$attrs.required">*</span>
        </div>
        <v-text-field
          :background-color="$attrs.disabled ? 'grey' : 'grey lighten-2'"
          solo
          hide-details="auto"
          flat
          class="rounded-pill"
          v-model="time"
          :dense="dense"
          :rules="rules"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker v-if="modal" v-model="time" full-width format="24hr">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal = false"> بازگشت </v-btn>
        <v-btn color="primary" @click="onOkClick"> ثبت </v-btn>
      </v-time-picker>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        modal: false,
        // time: '00:00',
      };
    },
    props: {
      value: {
        // v-model instance
        // type: String,
        required: true,
      },
      label: {
        required: true,
        type: String,
      },
      locale: {
        required: false,
        type: String,
        default: "fa-IR",
      },
      rules: {
        type: Array,
        default: () => [],
      },
      dense: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onOkClick() {
        this.$refs.dialog.save(this.time);
      },
    },
    computed: {
      time: {
        get() {
          return this.value;
        },
        set(time) {
          this.$emit("input", time);
        },
      },
    },
  };
</script>

<style></style>
