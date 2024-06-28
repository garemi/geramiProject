<template>
  <div>
    <div class="expand-width header-bg-style"></div>
    <div class="d-flex align-center justify-space-between my-3 mx-5">
      <div>
        <v-text-field
          class="rounded-pill py-0 my-0"
          v-model="searchBar"
          dir="rtl"
          style="width: 150px; min-height: none"
          background-color="#fff"
          flat
          solo
          dense
          hide-details="auto"
        >
        </v-text-field>
      </div>
      <div class="d-flex align-center">
        <v-btn icon class="cursor-pointer" color="#000">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon class="cursor-pointer" color="#000">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchBar: "",
      };
    },
  };
</script>
<style scoped lang="scss">
  .header-bg-style {
    position: absolute;
    height: 200px;
    top: 0;
    border-bottom-left-radius: 5rem;
    border-bottom-right-radius: 5rem;
    background-color: var(--brown);
  }
</style>
