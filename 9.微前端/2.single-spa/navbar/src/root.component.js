import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

export default function Root(props) {
  return (
    <BrowserRouter>
      navbar
      <div>
        <Link to="/">@single-spa/welcome</Link>{" "}
        <Link to="/lagou">@laoriy/lagou</Link>{" "}
        <Link to="/todos">@laoriy/todos</Link>{" "}
        <Link to="/realworld">@laoriy/realworld</Link>
      </div>
    </BrowserRouter>
  );
}
