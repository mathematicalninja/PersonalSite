// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: ['@nuxt/ui', '@nuxt/image', '@nuxtjs/mdc'],
    compatibilityDate: '2024-12-23',
    imports: {
        dirs: ['composables', 'components'],
    },
})