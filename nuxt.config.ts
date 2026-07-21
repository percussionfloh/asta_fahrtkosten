// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'nuxt-nodemailer'
  ],
  runtimeConfig: {
    MAILHOST: process.env.MAILHOST,
    MAILPORT: process.env.MAILPORT,
    MAILUSER: process.env.MAILUSER,
    MAILPASSWORD: process.env.MAILPASSWORD,
    CONTACTMAIL: process.env.CONTACTMAIL
  }
})