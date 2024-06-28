<template>
  <v-row class="mx-4 justify-space-between align-center" no-gutters>
    <v-col :cols="withIcon ? '9' : '12'">
      <v-text-field
        v-model="searchText"
        background-color="transparent"
        class="md-text custom-searchbar"
        dense
        flat
        hide-details="auto"
        placeholder="جستجو کنید"
        prepend-icon="mdi-magnify"
        solo
      >
      </v-text-field>
    </v-col>
    <v-col v-if="withIcon" class="text-left" cols="3">
      <v-avatar
        color="#908D85"
        rounded
        size="32"
        @click="$router.push('/landing/filter')"
      >
        <v-icon dark small @click="$router.push('/landing/filter')">
          mdi-tune-variant
        </v-icon>
      </v-avatar>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    data() {
      return {
        counties: [],
      };
    },
    props: {
      withIcon: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        default: "",
      },
    },
    methods: {},
    computed: {
      searchText: {
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
<style>
  .custom-searchbar .v-input__prepend-outer {
    margin: 0;
  }

  .custom-searchbar .v-text-field__slot {
    margin: 0;
    padding: 0;
  }
</style>
