import { UserConfig, PluginOption } from "vite"
import copy from "rollup-plugin-copy"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
function createViteConfig({
    plugins = [],
}: {
    plugins?: PluginOption[]
}): UserConfig {
    return {
        plugins: [
            ...plugins,
            copy({
                targets: [{ src: ["package.json", "README.md"], dest: "dist" }],
            }) as PluginOption,
            dts({
                cleanVueFileName: true,
                beforeWriteFile: (filePath, content) => {
                    return {
                        filePath:filePath.replace(/dist\/packages.*\/index.d.ts/,'dist/index.d.ts'),
                        content,
                    }
                },
            }),
        ],
        build: {
            target: "es2015",
            //打包文件目录
            outDir: "dist",
            //压缩
            minify: true,
            rollupOptions: {
                //忽略打包vue
                external: ["vue"],
                output: [
                    {
                        format: "es",
                        // 打包成.mjs
                        entryFileNames: "[name].mjs",
                        dir: "dist/es",
                    },
                    {
                        format: "umd",
                        entryFileNames: "[name].js",
                        name: "lGButton",
                        dir: "dist/umd",
                        globals: {
                            vue: "Vue",
                        },
                    },
                ],
            },
            lib: {
                entry: "./index.ts",
                name: "lGButton",
            },
        },
    }
}

export { createViteConfig }
