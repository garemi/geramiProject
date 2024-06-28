<template>
  <v-dialog v-model="show" max-width="70%">
    <v-card>
      <v-card-title>
        <span>{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-img :src="URL" class="dialog-img" contain>
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-1"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },
    URL: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },
};
</script>

<style scoped>
.dialog-img {
  height: 80vh;
}
</style>
