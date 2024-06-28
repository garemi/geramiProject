<template>
  <client-only>
    <v-app :class="isRTL ? 'rtl' : 'ltr'">
      <common-share />
      <v-main class="default-main text-center">
        <confirm-dialog>
          <div class="max-width">
            <Transition name="fade">
              <Nuxt />
            </Transition>
          </div>
        </confirm-dialog>
      </v-main>
    </v-app>
  </client-only>
</template>

<script>
  import { setDocumentHeight } from "@/constants/CustomFunctions/Document";
  import services from "@/services";
  import VianaAxios from "@/constants/VianaAxios";
  import Constants from "@/constants/GlobalConstants";
  import cleanCache from "@/plugins/cache-checker.client";

  export default {
    mounted() {
      this.handleLocaleChanges();
      window.addEventListener("resize", setDocumentHeight);
      setDocumentHeight();

      // this.getSettings();
    },
    beforeDestroy() {
      window.removeEventListener("resize", setDocumentHeight);
    },
    data() {
      return {
        loading: false,
      };
    },
    computed: {
      isDark() {
        return this.$route.meta.darkHeader ?? false;
      },
      isRTL() {
        return this.$i18n.locale == "fa";
      },
    },
    watch: {
      "$i18n.locale"() {
        this.handleLocaleChanges();
        this.getSettings();
      },
      $route() {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 200);
        cleanCache();
      },
    },
    methods: {
      getSettings: async function () {
        this.loading = true;
        try {
          const { data } = await services.setting.get(null, {
            noPaginate: true,
          });
          this.$store.commit("setSettings", data);
          this.loading = false;
        } catch (error) {
          this.$toast.error("مشکلی در دریافت اطلاعات پیش آمده است.");
        }
      },
      handleLocaleChanges() {
        this.setVuetifyDir();
        this.changeAxiosBaseURL();
      },
      setVuetifyDir() {
        this.$vuetify.rtl = this.$isRTL ? this.$isRTL() : false;

        document.documentElement.style.setProperty(
          "--direction",
          this.$localeProps.dir,
        );
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
