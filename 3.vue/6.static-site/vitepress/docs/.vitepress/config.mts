import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Laor Static Site",
    description: "A VitePress Site",
    titleTemplate: ":title - Custom Suffix",
    srcDir: "../src/pages",
    base:'/lagou-study/',
    // cleanUrls: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Examples", link: "/examples/helloworld" },
            { text: "Component", link: "/examples/component" },
            { text: "Vitepress", link: "/examples/vitepress" },
        ],
        search: {
            provider: "local",
        },

        sidebar: {
            "/examples/": [
                {
                    text: "Examples",
                    items: [
                        { text: "Hello World", link: "/examples/helloworld" },
                        { text: "Component", link: "/examples/component" },
                        { text: "Vitepress", link: "/examples/vitepress" },
                    ],
                },
            ],
        },

        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
    },
})
