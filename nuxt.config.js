import colors from "vuetify/es5/util/colors";
import { en, fa } from "./constants/locale";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  // target: "server",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "گرَمی",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "گرَمی",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/index.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "./plugins/index.client.js",
    "./plugins/aos.client.js",
    "./plugins/cache-checker.client.js",
    "./plugins/localeProps.client.js",
    "./plugins/toastification.client.js",
    "./plugins/store.client.js",
    "./plugins/persistedState.client.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/pwa",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/i18n",
    "nuxt-seo",
    "@nuxtjs/tailwindcss",
    "cookie-universal-nuxt",
  ],

  i18n: {
    locales: [
      {
        code: "fa",
        dir: "rtl",
      },
      {
        code: "en",
        dir: "ltr",
      },
    ],
    defaultLocale: "fa",
    detectBrowserLanguage: false,
    vueI18n: {
      fallbackLocale: "fa",
      messages: {
        fa,
        en,
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "https://api.garemi.app/api/v1",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    workbox: {
      /* workbox options */
      cleanupOutdatedCaches: true,
    },
    meta: {
      title: "gerami",
      author: "gerami",
    },
    manifest: {
      name: "gerami",
      short_name: "gerami",
      lang: "fa",
      orientation: "portrait",
      background_color: "#FFFFFF",
      icons: [
        {
          src: "/logo.png",
          sizes: "196x196",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  },
  twa: {
    host: "gerami.vianasystem.com", // Without any protocol
  },
  seo: {
    // Module Options
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    rtl: true,
    customVariables: ["~/assets/css/vuetify-variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#63318a",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: 0,
    viewer: false,
    config: {
      mode: "jit",
      theme: {
        screens: {
          sm: "600px",
          md: "960px",
          lg: "1264px",
          xl: "1904px",
        },
      },
    },
  },

  env: {
    VERSION: process.env.VERSION || require("./package.json").version,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["filepond", "vue-filepond"],
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true,
        },
        output: {
          comments: false,
        },
      },
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
  },
};
