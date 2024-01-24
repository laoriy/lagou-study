#!/usr/bin/env node

const Koa = require("koa");
const send = require("koa-send");
const path = require("path");
const compiler = require("@vue/compiler-sfc");
const app = new Koa();

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

// 3.加载第三方模块
app.use(async (ctx, next) => {
  if (ctx.path.startsWith("/@modules/")) {
    const moduleName = ctx.path.substr(10);
    const modulePath = path.join(
      process.cwd(),
      "node_modules",
      moduleName,
      "package.json"
    );
    const pkg = require(modulePath);
    ctx.path = path.join("/node_modules", moduleName, pkg.module);
  }
  await next();
});

// 1. 静态文件服务器
app.use(async (ctx, next) => {
  await send(ctx, ctx.path, { root: process.cwd(), index: "index.html" });
  await next();
});

// 4. 处理单文件组件
app.use(async (ctx, next) => {
  if (ctx.path.endsWith(".vue")) {
    const { descriptor } = compiler.parse(await streamToString(ctx.body));
    ctx.body = descriptor.template.content;
  }
  await next();
});

// 2. 修改第三方模块的路径
app.use(async (ctx, next) => {
  if (ctx.type === "application/javascript") {
    const contents = await streamToString(ctx.body);
    // import Vue from 'vue' ===> import Vue from '/@modules/vue'
    ctx.body = contents.replace(/from\s+["'](?!\.\/)/g, "$1/@modules/");
  }
  await next();
});

app.listen(3000);

console.log("Server running at http://localhost:3000");
