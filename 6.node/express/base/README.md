# 中间件

## 中间件的组成

![image](./images/middleware.webp)

中间件函数可以执行以下任何任务：

- 执行任何代码
- 修改 request 或者 response 响应对象
- 结束请求响应周期
- 调用下一个中间件

## 中间件分类

- 应用程序级别中间件
- 路由级别中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

## 应用程序级别中间件

不关心请求路径：

```js
var app = express();

app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});
```

限定请求路径：

```js
app.use("/user/:id", function (req, res, next) {
  console.log("Request Type:", req.method);
  next();
});
```

限定请求方法：

```js
app.get("/user/:id", function (req, res, next) {
  res.send("USER");
});
```

多个处理函数：

```js
app.use(
  "/user/:id",
  function (req, res, next) {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log("Request Type:", req.method);
    next();
  }
);
```

多个路由处理函数：

```js
app.get(
  "/user/:id",
  function (req, res, next) {
    console.log("ID:", req.params.id);
    next();
  },
  function (req, res, next) {
    res.send("User Info");
  }
);

// handler for the /user/:id path, which prints the user ID
app.get("/user/:id", function (req, res, next) {
  res.end(req.params.id);
});
```

跳过路由处理函数：

```js
app.get(
  "/user/:id",
  function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  function (req, res, next) {
    // render a regular page
    res.render("regular");
  }
);

// handler for the /user/:id path, which renders a special page
app.get("/user/:id", function (req, res, next) {
  res.render("special");
});
```

## 路由器级别中间件

路由器级别中间件和应用程序级别中间件非常相似，唯一的区别是路由器级别中间件只能访问由路由器处理的请求。

创建路由实例：

```js
var router = express.Router();
```

示例：

```js
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use(
  "/user/:id",
  function (req, res, next) {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log("Request Type:", req.method);
    next();
  }
);

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get(
  "/user/:id",
  function (req, res, next) {
    // if the user ID is 0, skip to the next router
    if (req.params.id === "0") next("route");
    // otherwise pass control to the next middleware function in this stack
    else next();
  },
  function (req, res, next) {
    // render a regular page
    res.render("regular");
  }
);

// handler for the /user/:id path, which renders a special page
router.get("/user/:id", function (req, res, next) {
  console.log(req.params.id);
  res.render("special");
});

// mount the router on the app
app.use("/", router);
```

另一个示例：

```js
var app = express();
var router = express.Router();

// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {
  if (!req.headers["x-auth"]) return next("router");
  next();
});

router.get("/", function (req, res) {
  res.send("hello, user!");
});

// use the router and 401 anything falling through
app.use("/admin", router, function (req, res) {
  res.sendStatus(401);
});
```

## 错误处理中间件

一般在所有路由之后添加

```js
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

## 内置中间件

- [express.static](http://expressjs.com/en/4x/api.html#express.static) serves static assets such as HTML files, images, and so on.
- [express.json](http://expressjs.com/en/4x/api.html#express.json) parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
- [express.urlencoded](http://expressjs.com/en/4x/api.html#express.urlencoded) parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+

官方支持的中间件列表：

- https://github.com/senchalabs/connect#middleware
