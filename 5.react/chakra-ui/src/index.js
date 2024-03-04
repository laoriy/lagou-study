import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Card from "./components/Card";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/form",
        element: <App />,
      },
      {
        path: "/card",
        element: <Card />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
