import React, { render } from "./react";
const root = document.getElementById("root");
console.log(React);

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hi Fiber</p>
  </div>
);

render(jsx, root);
