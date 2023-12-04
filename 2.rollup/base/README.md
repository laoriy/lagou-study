# rollup

## 命令行

```shell
npx rollup ./src/index.js --format iife --file dist/bundle.js
```

## rollup.config.mjs + plugins

```shell
npx rollup -c
```

```js
import json from "@rollup/plugin-json"

export default {
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "iife",
    },
    plugins: [json()],
}
```

## 加载 npm 模块

```shell
npm install @rollup/plugin-node-resolve --save-dev
```

## 加载 commonjs 模块

```shell
npm install @rollup/plugin-commonjs --save-dev
```

## 代码拆分

-   Dynamic Imports

```js
 output: {
        dir: "dist",
        format: 'amd'
    },
```

## 多入口打包

将 input 改为多个数组

## 总结

-   输出结果更加扁平
-   自动移除未引用代码
-   打包结果依然完全可读

应用程序使用webpack  类库、框架使用rollup
