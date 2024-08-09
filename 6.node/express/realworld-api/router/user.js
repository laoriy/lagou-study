const express = require("express");

const router = express.Router();

// Authentication
router.post("/users/login", (req, res, next) => {
  try {
    res.send("login");
  } catch (error) {
    next(error);
  }
});

// Registration
router.post("/users", (req, res, next) => {
  try {
    res.send("login");
  } catch (error) {
    next(error);
  }
});
// Get current user
router.get("/user", (req, res, next) => {
  try {
    res.send("login");
  } catch (error) {
    next(error);
  }
});

// Update user info
router.put("/user", (req, res, next) => {
  try {
    res.send("login");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
