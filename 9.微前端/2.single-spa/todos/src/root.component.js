import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About";
import Main from "./Main";
import Home from "./Home";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ],
  {
    basename: "/todos",
  }
);

export default function Root(props) {
  return <RouterProvider router={router}></RouterProvider>;
}
