const express = require("express");

const app = express();

app.get("/todos", (req, res) => {
  res.send("Hello World!");
});
app.get("/todos/:id", (req, res) => {
  res.send("Hello World!" + req.params.id);
});
app.post("/todos", (req, res) => {
  res.send("post World!");
});
app.patch("/todos/:id", (req, res) => {
  res.send("patch World!");
});
app.delete("/todos/:id", (req, res) => {
  res.send("d World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
