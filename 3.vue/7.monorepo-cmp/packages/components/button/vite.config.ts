import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import { UserConfig } from "vite"
// import { createViteConfig } from "@laoriy/lg-utils"

// console.log(createViteConfig());

export default defineConfig({
    plugins: [vue()],
    build: {
        target: "es2015",
        //打包文件目录
        outDir: "dist",
        //压缩
        minify: true,
        //css分离
        //cssCodeSplit: true,
        rollupOptions: {
            //忽略打包vue
            external: ["vue"],
            output: [
                {
                    format: "es",
                    //不用打包成.es.js,这里我们想把它打包成.js
                    entryFileNames: "[name].mjs",
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    exports: "named",
                    //配置打包根目录
                    dir: resolve(__dirname, "./dist/es"),
                },
                {
                    format: "umd",
                    entryFileNames: "[name].js",
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    name: "lgButton",
                    exports: "named",
                    //配置打包根目录
                    dir: resolve(__dirname, "./dist/umd"),
                },
            ],
        },
        lib: {
            entry: "./index.ts",
            name: "lgButton",
            formats: ["es", "umd"],
        },
    },
})
