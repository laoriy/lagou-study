const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.PORT);

app.listen(PORT, () => {
  console.log("server is running at http://localhost:" + PORT);
});
