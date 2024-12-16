import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h2>Navbar</h2>
      <div>
        <Link to="/">@single-spa/welcome</Link>{" "}
        <Link to="/lagou">@study/lagou</Link>{" "}
        <Link to="/todos">@study/todos</Link>{" "}
        <Link to="/realworld">@study/realworld</Link>
      </div>
    </div>
  );
}

export default Navbar;
