// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~/assets/scss/index.scss',
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
  ],
  typescript: {
    strict: true,
    shim: false,
  },
  modules: ['@pinia/nuxt'],
  build: {
    transpile: ['primevue'],
  },
  ssr: false,
})
