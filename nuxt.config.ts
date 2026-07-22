// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'nuxt-nodemailer',
    '@nuxt/scripts',
    '@nuxtjs/turnstile'
  ],

  css: ['~/assets/main.css'],

  runtimeConfig: {

    turnstileSecret: process.env.TURNSTILE_SECRET,

    public: {
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY
    },

    MAILHOST: process.env.MAILHOST,
    MAILPORT: process.env.MAILPORT,
    MAILUSER: process.env.MAILUSER,
    MAILPASSWORD: process.env.MAILPASSWORD,
    CONTACTMAIL: process.env.CONTACTMAIL
  },

  i18n: {
    locales: [
      {
        code: 'de',
        file: 'de.yaml'
      },
      {
        code: 'en',
        file: 'en.yaml'
      }
    ],
    defaultLocale: 'de',
    langDir: 'locales/'
  }
})