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
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@vueuse/nuxt'],
  build: {
    transpile: ['primevue'],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      githubOauthClientId: process.env.GITHUB_OAUTH_CLIENT_ID,
      githubOauthClientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      githubOauthRedirect: process.env.GITHUB_OAUTH_REDIRECT_URL,
    },
  },
})
