<template>
  <span>
    <property-report-dialog v-model="reportDialog" />
    <v-dialog content-class="align-self-end ma-0" v-model="dialogShow">
      <v-card class="custom-border-class">
        <v-card-text class="pt-4">
          <div @click="$store.commit('setShareMetaData', { visible: true })">
            <span
              class="d-flex align-center justify-start font-weight-bold text-900"
            >
              <v-icon color="#000">mdi-share-variant-outline</v-icon>
              <p class="mr-2">اشتراک گذاری</p>
            </span>
            <p>این آگهی را هم اکنون با دوستان به اشتراک بگذارید</p>
          </div>
          <v-divider class="my-2"></v-divider>
          <span
            class="d-flex align-center justify-start font-weight-bold text-900"
            @click="reportDialog = true"
          >
            <v-icon color="#000">mdi-alert-octagon</v-icon>
            <p class="mr-2"> گزارش آکهی</p>
          </span>
          <p>در صورتی که تخلفی در این آگهی دیدید میتوانید آن را گزارش دهید</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </span>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        reportDialog: false,
      };
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
    methods: {
      showShareDialog() {
        this.$store.commit("setShareMetaData", { visible: true });
      },
    },
  };
</script>
<style scoped>
  .custom-border-class {
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;
  }
</style>
