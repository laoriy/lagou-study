const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const app = express();

// 解析请求体
app.use(express.json());
// 日志输出
app.use(morgan("dev"));
// 跨域资源请求
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api", router);

app.listen(PORT, () => {
  console.log("server is running at http://localhost:" + PORT);
});
