import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("server start at 3000");
});

export default app;
