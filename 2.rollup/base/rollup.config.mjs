import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
export default {
    input: ["src/index.js",'src/logger.js'],
    // output: {
    //     file: "dist/bundle.js",
    //     format: 'iife'
    // },
    output: {
        dir: "dist",
        format: 'amd'
    },
    plugins: [json(), nodeResolve(), commonjs()]
}