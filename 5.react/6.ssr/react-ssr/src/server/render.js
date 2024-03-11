import Home from "../share/pages/Home";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Switch, Routes } from "react-router-dom";
import routes from "../share/routes";
import { renderRoutes } from "react-router-config";

console.log(renderRoutes(routes));
export default (req) => {
  const content = renderToString(
    <StaticRouter location={req.path}></StaticRouter>
  );

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React SSR</title>
    </head>
    <body>
        <div id="root">${content}</div>
        <script src="bundle.js" type="module"></script>
    </body>
    </html>
    `;
};
