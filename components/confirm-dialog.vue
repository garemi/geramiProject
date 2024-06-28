<template>
  <span>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title> هشدار </v-card-title>
        <v-card-text class="black-text">
          {{ text }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="reject"> خیر </v-btn>
          <v-btn color="green darken-1" text @click="accept"> بله </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <slot />
  </span>
</template>

<script>
  export default {
    provide() {
      return {
        getConfirmation: this.getConfirmation,
      };
    },
    data: () => ({
      dialog: false,
      text: "",
      item: {},
      onConfirm: () => {},
    }),
    methods: {
      getConfirmation: function (text, item, onConfirm = () => {}) {
        this.text = text;
        this.item = item;
        this.onConfirm = onConfirm;
        this.dialog = true;
      },
      close() {
        this.dialog = false;
        this.text = "";
        this.item = {};
        this.onConfirm = () => {};
      },
      accept: function (text) {
        this.onConfirm && this.onConfirm();
        this.close();
      },
      reject: function (text) {
        this.close();
      },
    },
  };
</script>

<style></style>
