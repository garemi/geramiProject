<template>
  <client-only>
    <v-app>
      <v-main class="default-main">
        <confirm-dialog>
          <div class="max-width">
            <Nuxt />
          </div>
        </confirm-dialog>
      </v-main>
    </v-app>
  </client-only>
</template>

<script>
  import Constants from "@/constants/GlobalConstants";
  import VianaAxios from "@/constants/VianaAxios";
  import { removeLastSlash } from "@/constants/routeChecker";
  import { UserPanelChildrens } from "@/constants/Pages";

  export default {
    components: {},

    middleware: "authenticated",
    mounted() {
      this.handleLocaleChanges();
      this.$vuetify.rtl = true;
    },
    data() {
      return {
        items: UserPanelChildrens,
        clipped: false,
        drawer: false,
        fixed: false,

        miniVariant: false,
        right: true,
        rightDrawer: false,
      };
    },
    computed: {
      isRTL() {
        return this.$i18n.locale == "fa";
      },
      meta() {
        console.log(this.$route);
        return this.$route.meta[0] ?? {};
      },
    },
    watch: {
      "$i18n.locale"() {
        this.handleLocaleChanges();
      },
    },
    methods: {
      isActive(route) {
        return route === removeLastSlash(this.$route.fullPath);
      },
      change(param) {
        this.$router.push(param);
      },
      handleLocaleChanges() {
        this.changeAxiosBaseURL();
      },
      changeAxiosBaseURL() {
        if (this.$localeProps)
          VianaAxios.defaults.baseURL =
            Constants["mainURL_" + this.$localeProps.code];
      },
      exit() {
        this.$store.commit("exit");
        this.$router.replace("/");
      },
    },
  };
</script>

<style scoped>
  .color-gray {
    color: #909090;
  }

  .active {
    background: unset !important;
    color: #03d999;
  }

  .default-main {
    background-color: var(--background);
  }
</style>
