// import vsharp from 'vite-plugin-vsharp';

export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: '',
    stripeWebhookSecret: '',
    public: {
      stripeKey: '',
    },
  },

  nitro: {
    preset: 'node-server',
    prerender: {
      routes: ['/landing'],
    },    
    publicAssets: [
      {
        dir: "public",
        baseURL: "/"
      }
    ]
  },

  vite: {
    plugins: [],
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/*'], // We implement our own auth behaviour in the auth middleware
    },
  },

  compatibilityDate: '2025-03-01',
});