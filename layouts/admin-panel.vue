<template>
  <client-only>
    <v-app>
      <admin-panel-header v-if="$vuetify.breakpoint.smAndDown" />
      <v-main class="default-main panel">
        <confirm-dialog>
          <v-container fluid class="d-flex">
            <v-row>
              <v-col md="3" lg="2" sm="4" class="ma-0 pl-0 hidden-sm-and-down">
                <admin-panel-drawer-desktop />
              </v-col>
              <v-col cols="12" md="9" lg="10">
                <Nuxt />
              </v-col>
            </v-row>
          </v-container>
        </confirm-dialog>
      </v-main>
    </v-app>
  </client-only>
</template>

<script>
  import Constants from "@/constants/GlobalConstants";
  import VianaAxios from "@/constants/VianaAxios";
  import cleanCache from "@/plugins/cache-checker.client";
  export default {
    components: {},
    middleware: "authenticated",
    mounted() {
      this.handleLocaleChanges();
      this.$vuetify.rtl = true;
      console.log("this.$route", this.$route);
    },
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            icon: "mdi-apps",
            title: "Welcome",
            to: "/",
          },
          {
            icon: "mdi-chart-bubble",
            title: "Inspire",
            to: "/inspire",
          },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: "Vuetify.js",
      };
    },
    computed: {
      isRTL() {
        return this.$i18n.locale == "fa";
      },
      isDark() {
        return this.$route.meta.darkHeader ?? false;
      },
    },
    watch: {
      "$i18n.locale"() {
        this.handleLocaleChanges();
      },
      $route() {
        cleanCache();
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
    background: #f9f9f9;
  }
</style>
