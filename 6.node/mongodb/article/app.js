const express = require("express");

const app = express();
// 配置解析请求体数据 application/json
// 它会把解析到的请求体数据放到 req.body 中
// 注意：一定要在使用之前就挂载这个中间件
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/articles", (req, res) => {
  console.log(req.body); // 输出请求体
  res.send("Hello World!ddddd");
});

app.get("/articles", (req, res) => {
  res.send("Hello World!ddddd");
});

app.get("/articles/:id", (req, res) => {
  res.send("Hello World!ddddd");
});

app.patch("/articles/:id", (req, res) => {
  res.send("Hello World!ddddd");
});

app.delete("/articles/:id", (req, res) => {
  res.send("Hello World!ddddd");
});

app.listen(3000, () => {
  console.log("server is running");
});
