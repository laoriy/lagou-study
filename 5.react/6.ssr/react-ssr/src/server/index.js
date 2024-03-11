import app from "./http";
import render from "./render";

app.get("*", (req, res) => {
  res.send(render(req));
});
