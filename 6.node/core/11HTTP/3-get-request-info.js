const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  // console.log('请求进来了')

  // 请求路径
  let { pathname, query } = url.parse(req.url, true);
  console.log(pathname, "----", query);

  // 请求方式
  console.log(req.method);

  // 版本号
  // console.log(req.httpVersion)

  // 请求头
  // console.log(req.headers)

  // 请求体数据获取
  let arr = [];
  req.on("data", (data) => {
    arr.push(data);
  });
  // curl -Uri http://localhost:1234 -Method "post" -Body "{laro:swe}"
  req.on("end", () => {
    console.log(Buffer.concat(arr).toString());
  });
});
server.listen(1234, () => {
  console.log("server is start......");
});
