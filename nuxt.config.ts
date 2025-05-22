// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
    devtools: { enabled: false },
    css: ['~/assets/css/tailwind.css'],
    modules: ['@nuxt/image', '@nuxtjs/mdc', 'shadcn-nuxt'],
    compatibilityDate: '2024-12-23',
    imports: {
        dirs: ['composables', 'components'],
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: 'Q',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui',
    },
    vite: {
        plugins: [tailwindcss()],
    },
})
