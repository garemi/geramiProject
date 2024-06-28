<template>
  <client-only>
    <v-app>
      <common-share />
      <v-main class="default-main disable-bg">
        <Transition name="fade">
          <Nuxt />
        </Transition>
      </v-main>
    </v-app>
  </client-only>
</template>

<script>
  import VianaAxios from "@/constants/VianaAxios";
  import Constants from "@/constants/GlobalConstants";

  export default {
    created() {
      this.handleLocaleChanges();
    },
    computed: {
      isDark() {
        return this.$route.meta.darkHeader ?? false;
      },
    },
    watch: {
      "$i18n.locale"() {
        this.handleLocaleChanges();
      },
    },
    methods: {
      handleLocaleChanges() {
        this.changeAxiosBaseURL();
      },
      changeAxiosBaseURL() {
        if (this.$localeProps)
          VianaAxios.defaults.baseURL =
            Constants["mainURL_" + this.$localeProps.code];
      },
    },
  };
</script>

<style scoped>
  .default-main {
    background-color: var(--background);
  }

  .hidden {
    display: none;
  }

  .rtl {
    direction: rtl;
  }
  .ltr {
    direction: ltr;
  }
</style>
