// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react';
const defaultLocale = 'id'
const locales = {
    id: 'id-ID',
    en: 'en-US'
}

// https://astro.build/config
export default defineConfig({
    site: 'http://localhost:4321',
    trailingSlash: 'always',
    build: {
        format: 'directory'
    },
    integrations: [i18n({
        locales,
        defaultLocale
		}), sitemap({
        i18n: {
            locales,
            defaultLocale
        },
        filter: filterSitemapByDefaultLocale({ defaultLocale })
		}), react()],
    vite: {
        plugins: [tailwindcss()]
    }
})