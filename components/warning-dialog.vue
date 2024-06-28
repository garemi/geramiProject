<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title> هشدار </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="noPressed"> خیر </v-btn>
        <v-btn color="green darken-1" text @click="yesPressed"> بله </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      text: "",
      item: {},
    }),
    methods: {
      show: function (text, item) {
        this.text = text;
        this.item = item;
        this.dialog = true;
      },
      yesPressed: function (text) {
        this.$emit("onConfirm", this.item);
        this.dialog = false;
      },
      noPressed: function (text) {
        this.dialog = false;
      },
    },
  };
</script>

<style></style>
