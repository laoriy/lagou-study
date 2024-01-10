import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { createViteConfig } from '@laoriy/lg-build'

export default defineConfig(createViteConfig({ plugins: [vue()] }))
