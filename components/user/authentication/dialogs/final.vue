<template>
  <v-dialog
    v-model="dialogShow"
    content-class="align-self-end  mx-3 custom-rounded"
    persistent
  >
    <v-card class="custom-border-class">
      <v-card-text class="pa-5 text-center">
        <v-img :src="image" class="mx-auto" contain width="80%"></v-img>
        <p
          class="font-weight-bold lg-text my-5"
          style="color: var(--dark-green)"
          >{{ title }}</p
        >
        <p class="my-4" style="color: black">
          {{ desc }}
        </p>
        <v-btn
          class="rounded-xl expand-width py-5"
          dark
          elevation="0"
          to="/panel"
          x-large
        >
          بازگشت به پروفایل
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        required: true,
      },
      title: {
        required: true,
        type: String,
      },
      desc: {
        required: true,
        type: String,
      },
      image: {
        required: true,
        type: String,
      },
    },
    computed: {
      dialogShow: {
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
