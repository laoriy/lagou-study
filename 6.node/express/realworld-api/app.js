const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middleware/error-handler");
const app = express();
require("./model");
const cookieParser = require("cookie-parser");

// 解析请求体
app.use(express.json());
// 日志输出
app.use(morgan("dev"));
// 跨域资源请求
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// 挂载路由
app.use("/api", router);

// 挂载统一处理服务端错误中间件
app.use(errorHandler());

app.listen(PORT, () => {
  console.log("server is running at http://localhost:" + PORT);
});
