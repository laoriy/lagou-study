import { createBrowserRouter } from "react-router-dom";
import Home from "../components/core/Home";
import Shop from "../components/core/Shop";
import SignIn from "../components/core/SignIn";
import SignUp from "../components/core/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

export default router;
