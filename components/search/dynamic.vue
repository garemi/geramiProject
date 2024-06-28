<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    class="mb-3 custom-shadow"
    color="white"
  >
    <v-card-title
      class="cursor-pointer"
      @click.capture="isSearchBarVisible = !isSearchBarVisible"
    >
      جستجو
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>
          {{ isSearchBarVisible ? "mdi-chevron-up" : "mdi-chevron-down" }}
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-expand-transition>
        <v-form ref="form" v-show="isSearchBarVisible">
          <v-form-base
            :model="searchModel"
            :schema="schema"
            :row="{
              justify: 'start',
              align: 'start',
              noGutters: false,
            }"
            :col="{ cols: 12 }"
          />
          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              class="mb-3 ml-5"
              large
              dark
              color="success"
              elevation="0"
              @click="submitSearch"
              :loading="loading"
            >
              جستجو
            </v-btn>
          </v-row>
        </v-form>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      schema: {
        type: Object,
      },
    },

    data() {
      return {
        isSearchBarVisible: false,
        searchModel: {},
      };
    },

    methods: {
      submitSearch() {
        const filteredModel = Object.keys(this.searchModel).reduce(
          (obj, key) =>
            this.searchModel[key] && this.searchModel[key] != ""
              ? { ...obj, [key]: this.searchModel[key] }
              : obj,
          {},
        );

        this.$emit("onSearch", filteredModel);
      },
    },
  };
</script>
