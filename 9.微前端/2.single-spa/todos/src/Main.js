import React from "react";
import { Link } from "react-router-dom";

function Main({ children }) {
  return (
    <div>
      <h2>THIS IS todos</h2>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <div>{children}</div>
    </div>
  );
}

export default Main;
