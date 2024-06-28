<template>
  <v-dialog
    v-model="showDialog"
    content-class="align-self-end  mx-3 custom-rounded"
    persistent
  >
    <v-card>
      <v-card-text class="pa-4">
        <span class="d-flex align-center" style="color: black">
          <span v-if="dialogInfo?.image" style="width: 20px">
            <v-img :src="dialogInfo?.image"></v-img>
          </span>
          <v-icon v-else color="black">{{ dialogInfo?.icon }} </v-icon>
          <p class="mr-2">{{ dialogInfo?.title }} </p>
        </span>

        <p class="my-2">
          {{ dialogInfo?.desc }}
        </p>
        <v-btn
          dark
          class="rounded-xl expand-width py-5"
          elevation=""
          @click="clicked"
        >
          {{ dialogInfo?.button }}
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    data() {
      return {
        infoDialog: false,
      };
    },
    props: {
      value: {
        type: Boolean,
        required: true,
      },
      dialogInfo: {
        type: Object,
        required: true,
      },
    },
    computed: {
      showDialog: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
    },
    methods: {
      clicked() {
        this.$emit("goForward");
        this.showDialog = false;
      },
    },
  };
</script>
