import { createBrowserRouter } from "react-router-dom";
import Home from "../components/core/Home";
import Shop from "../components/core/Shop";
import SignIn from "../components/core/SignIn";
import SignUp from "../components/core/SignUp";
import Dashboard from "../components/admin/Dashboard";
import PrivateRoute from "../components/admin/PrivateRoute";
import AdminRoute from "../components/admin/AdminRoute";
import AdminDashboard from "../components/admin/AdminDashboard";
import AddCategory from "../components/admin/AddCategory";
import AddProduct from "../components/admin/AddProduct";
import Cart from "../components/core/Cart";
import Product from "../components/core/Product";

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
  {
    path: "user/dashboard",
    element: <PrivateRoute component={Dashboard} />,
  },
  {
    path: "admin/dashboard",
    element: <AdminRoute component={AdminDashboard} />,
  },
  {
    path: "/create/category",
    element: <AdminRoute component={AddCategory} />,
  },
  {
    path: "/create/product",
    element: <AdminRoute component={AddProduct} />,
  },
  {
    path: "cart",
    element:<Cart />,
  },
  {
    path: "/product/:productId",
    element: <AdminRoute component={Product} />,
  },
]);

export default router;
