const express = require("express");
const { getDb, saveDb } = require("./db");

const app = express();
const router = express.Router();

// 配置解析表单请求体：application/json
router.use(express.json());

// 解析表单请求体：application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: false }));

router.get(
  "/",
  (req, res, next) => {
    console.log("1");
    next();
    console.log("3");
  },
  (req, res) => {
    res.send("hello world22");
    console.log("2");
    res.end()
  }
);

router.get("/todos", async (req, res) => {
  try {
    const db = await getDb();
    res.status(200).json(db.todos);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.get("/todos/:id", async (req, res) => {
  try {
    const db = await getDb();

    const todo = db.todos.find(
      (todo) => todo.id === Number.parseInt(req.params.id)
    );

    if (!todo) {
      return res.status(404).end();
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.post("/todos", async (req, res) => {
  try {
    // 1. 获取客户端请求体参数
    const todo = req.body;

    console.log(todo);

    // 2. 数据验证
    if (!todo.title) {
      return res.status(422).json({
        error: "The field title is required.",
      });
    }

    // 3. 数据验证通过，把数据存储到 db 中
    const db = await getDb();

    const lastTodo = db.todos[db.todos.length - 1];
    todo.id = lastTodo ? lastTodo.id + 1 : 1;
    db.todos.push(todo);
    await saveDb(db);
    // 4. 发送响应
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.patch("/todos/:id", async (req, res) => {
  try {
    // 1. 获取表单数据
    const todo = req.body;

    // 2. 查找到要修改的任务项
    const db = await getDb();
    const ret = db.todos.find(
      (todo) => todo.id === Number.parseInt(req.params.id)
    );

    if (!ret) {
      return res.status(404).end();
    }

    Object.assign(ret, todo);

    await saveDb(db);

    res.status(200).json(ret);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.delete("/todos/:id", async (req, res) => {
  try {
    const todoId = Number.parseInt(req.params.id);
    const db = await getDb();
    const index = db.todos.findIndex((todo) => todo.id === todoId);
    if (index === -1) {
      return res.status(404).end();
    }
    db.todos.splice(index, 1);
    await saveDb(db);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
app.use(router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
