// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    router: {
        options: {
            linkExactActiveClass: "active",
        },
    },
    hooks: {
        "pages:extend": (pages) => {
            // add a route
            pages.push(
                {
                    name: "index",
                    path: "/",
                    file: "~/pages/home/index.vue",
                },
                {
                    name: "home",
                    path: "/home",
                    redirect: "/",
                    file: "~/pages/home/index.vue",
                }
            )
        },
    },
})
