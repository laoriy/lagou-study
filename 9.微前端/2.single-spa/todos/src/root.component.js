import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./About";
import Main from "./Main";
import Home from "./Home";
import Parcel from "single-spa-react/parcel";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <div>
          <Parcel
            config={System.import("@laoriy/navbar")}
            wrapWith="div"
          />
          <Outlet />
        </div>
      ),
      children: [
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
    },
  ],
  {
    basename: "/todos",
  }
);

export default function Root(props) {
  return <RouterProvider router={router}></RouterProvider>;
}
