import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import "./style.css";
import AnotherStore from "./anotherStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AnotherStore>
      <RouterProvider router={router} ></RouterProvider>
    </AnotherStore>
  </React.StrictMode>
);
