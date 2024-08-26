/**
 * - 了解 Express 的源码目录结构
 * - 基本实现
 */

const express = require("./express");

const app = express();

app.get("/", (req, res) => {
  res.end("get /");
});

app.get("/about", (req, res) => {
  res.end("get /about");
});

app.get("/a{b}?cd/:c", (req, res) => {
  res.end("get /ab?cd");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
