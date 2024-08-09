const express = require("express");

const router = express.Router();

// 获取用户资料
router.get("/:username", (req, res, next) => {
  try {
    res.send(req.params.username);
  } catch (error) {
    next(error);
  }
});

// 关注用户
router.post("/:username/follow", (req, res, next) => {
  try {
    res.send("关注成功");
  } catch (error) {
    next(error);
  }
});

// 取消关注用户
router.delete("/:username/follow", (req, res, next) => {
  try {
    res.send("取消关注成功");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
