import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h2>Navbar</h2>
      <div>
        <Link to="/">@single-spa/welcome</Link>{" "}
        <Link to="/lagou">@laoriy/lagou</Link>{" "}
        <Link to="/todos">@laoriy/todos</Link>{" "}
        <Link to="/realworld">@laoriy/realworld</Link>
      </div>
    </div>
  );
}

export default Navbar;
