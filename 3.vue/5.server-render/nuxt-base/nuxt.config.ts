// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },

    hooks: {
        "pages:extend"(pages) {
            // add a route
            pages.push({
                name: "home",
                path: "/home",
                file: "~/pages/index.vue",
            })

            // remove routes
        },
    },
})
