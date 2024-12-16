import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Navbar";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navbar />,
    },
  ],
  {
    basename: "/navbar",
  }
);

export default function Root(props) {
  return <RouterProvider router={router}></RouterProvider>;
}
