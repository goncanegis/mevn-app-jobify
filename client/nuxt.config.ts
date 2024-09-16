// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  css: ["~/assets/css/main.css"],

  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-svgo",
    "@nuxt/fonts",
  ],

  colorMode: {
    preference: "dark",
  },

  plugins: [],

  routeRules: {
    "/api": { proxy: process.env.NUXT_PUBLIC_API_BASEURL },
  },

  runtimeConfig: {
    public: {
      apiBaseurl: process.env.NUXT_APP_API_BASEURL,
    },
  },

  ssr: false,
});
