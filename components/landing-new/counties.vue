<template>
  <div color="var(--gray)" @click="choose(county)">
    <v-form-checkbox
      v-model="checked"
      :label="county.name"
      class="md-text"
    ></v-form-checkbox>
    <v-divider class="mx-auto"></v-divider>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        city: "",
      };
    },
    props: {
      county: {
        type: Object,
        required: true,
      },
      selections: {
        type: Array,
        required: true,
      },
      checked: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      choose(county) {
        this.checked = !this.checked;
        this.$emit("chooseCity", county);
      },
      compareCounties() {
        this.selections.map((x) => {
          if (x == this.county.name) {
            this.checked = true;
          }
        });
      },
    },
    mounted() {
      this.compareCounties();
    },
  };
</script>
<style></style>
