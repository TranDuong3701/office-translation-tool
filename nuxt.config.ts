// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],
  css: [
    '~/assets/scss/index.scss',
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/utils/index.scss";',
        },
      },
    },
  },
  typescript: {
    strict: true,
    shim: false,
  },
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  build: {
    transpile: ['primevue'],
  },
  ssr: false,
})
