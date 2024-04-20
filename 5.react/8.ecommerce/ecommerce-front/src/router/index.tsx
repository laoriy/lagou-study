import { createBrowserRouter } from "react-router-dom";
import Home from "../components/core/Home";
import Shop from "../components/core/Shop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
]);

export default router;
