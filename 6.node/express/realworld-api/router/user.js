const express = require("express");
const userCtrl = require("../controller/user");
const { body, validationResult } = require("express-validator");
const { User } = require("../model");
// const userValidator = require("../validator/user");
// const auth = require("../middleware/auth");

const router = express.Router();

// 用户登录
router.post("/users/login", userCtrl.login);

// 用户注册
router.post(
  "/users",
  [
    // 1.配置验证规则
    body("user.username")
      .notEmpty()
      .withMessage("用户名不能为空")
      .bail()
      .custom(async (username) => {
        const user = await User.findOne({ username });
        if (user) {
          return Promise.reject("用户名已存在");
        }
      }),
    body("user.email")
      .notEmpty()
      .withMessage("邮箱不能为空")
      .bail()
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          return Promise.reject("邮箱已存在");
        }
      }),
    body("user.password").notEmpty().withMessage("密码不能为空"),
  ],
  (req, res, next) => {
    // 2.验证失败，统一处理
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.mapped(),
      });
    }
    next();
  },
  userCtrl.register
);

// 获取当前登录用户
router.get("/user", userCtrl.getCurrentUser);

// 更新当前登录用户
router.put("/user", userCtrl.updateCurrentUser);

module.exports = router;
